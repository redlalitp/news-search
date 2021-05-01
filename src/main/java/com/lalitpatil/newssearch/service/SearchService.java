package com.lalitpatil.newssearch.service;

import com.lalitpatil.newssearch.model.NewsHeadlines;
import com.lalitpatil.newssearch.repository.NewsHeadlinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class SearchService {
    @Autowired
    NewsHeadlinesRepository newsHeadlinesRepository;

    public Set<NewsHeadlines> getAllHeadlines()
    {
        Set<NewsHeadlines> headlines = new HashSet<>();
        newsHeadlinesRepository.findAll().forEach(line -> headlines.add(line));
        return headlines;
    }

    public Set<NewsHeadlines> getAllRelevantHeadlines(String query) {
        Iterable<NewsHeadlines> allHeadlines = newsHeadlinesRepository.findAll();
        Set<NewsHeadlines> headlines = new HashSet<>();
        // get all exact matching headlines first
        allHeadlines.forEach(line -> {
            if(line.getHeadlineText().contains(query)) {
                headlines.add(line);
            }
        });

        //if query has multiple words collect results matching each word and combination of words
        String[] queryWords = query.split(" ");

        allHeadlines.forEach(line -> {
            if(Arrays.stream(queryWords).anyMatch(word -> line.getHeadlineText().contains(word))) {
                headlines.add(line);
            }
        });


        return headlines;
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
