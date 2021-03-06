package com.lalitpatil.newssearch.service;

import com.lalitpatil.newssearch.HeadlineStore;
import com.lalitpatil.newssearch.model.NewsHeadlines;
import com.lalitpatil.newssearch.model.SearchResultResponse;
import com.lalitpatil.newssearch.repository.NewsHeadlinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import  com.google.common.collect.Sets;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class SearchService {
    @Autowired
    NewsHeadlinesRepository newsHeadlinesRepository;

    @Autowired
    SearchResultResponse searchResultResponse;

    public Set<NewsHeadlines> getAllHeadlines()
    {
        Set<NewsHeadlines> headlines = new HashSet<>();
        newsHeadlinesRepository.findAll().forEach(line -> headlines.add(line));
        return headlines;
    }

    public SearchResultResponse getAllRelevantHeadlines(String query, int pageNumber, int recordsPerPage) {
        Set<NewsHeadlines> headlines = new LinkedHashSet<>();
        Set<NewsHeadlines> returnHeadlines;
        Set<NewsHeadlines> pageRecords = new LinkedHashSet<>();
        if(pageNumber == 0) {
            Set<NewsHeadlines> allHeadlines = Sets.newHashSet(newsHeadlinesRepository.findAll());

            // get all exact matching headlines first
            if (allHeadlines != null && !allHeadlines.isEmpty()) {
                allHeadlines.parallelStream().forEach(line -> {
                    if (line.getHeadlineText().contains(query)) {
                        headlines.add(line);
                    }
                });

                //if query has multiple words collect results matching each word and combination of words
                String[] queryWords = query.split(" ");

                // collect headlines which contain all terms first
                allHeadlines.parallelStream().forEach(line -> {
                    if (Arrays.stream(queryWords).allMatch(word -> line.getHeadlineText().contains(word))) {
                        headlines.add(line);
                    }
                });

                // collect headlines which contain any of the word
                allHeadlines.parallelStream().forEach(line -> {
                    if (Arrays.stream(queryWords).anyMatch(word -> line.getHeadlineText().contains(word))) {
                        headlines.add(line);
                    }
                });
                HeadlineStore.relevantHeadlines = headlines;
            }
        }

            returnHeadlines = HeadlineStore.relevantHeadlines;
            int totalRecords = returnHeadlines.size();
            int totalPages = totalRecords / recordsPerPage;

            int i = 0, j = 0;

            for (NewsHeadlines headline : returnHeadlines) {
                if (i < pageNumber * recordsPerPage) {
                    i++;
                    continue;
                } else if (j < recordsPerPage) {
                    j++;
                    pageRecords.add(headline);
                }
            }

            searchResultResponse.setPageNumber(pageNumber);
            searchResultResponse.setNewsHeadlines(pageRecords);
            searchResultResponse.setTotalPages(totalPages);
            searchResultResponse.setRecordsPerPage(recordsPerPage);
            searchResultResponse.setTotalRecords(totalRecords);
        return searchResultResponse;
    }

    public Set<NewsHeadlines> getAllRelevantHeadlinesSuggestions(String query) {
        Iterable<NewsHeadlines> allHeadlines = newsHeadlinesRepository.findAll();
        Set<NewsHeadlines> headlines = new HashSet<>();

        // get all exact matching headlines first
        for(NewsHeadlines line : allHeadlines) {
            if(line.getHeadlineText().startsWith(query)) {
                headlines.add(line);
                if (headlines.size() >= 10) {
                    break;
                }
            }
        }
        return headlines;
    }
}
