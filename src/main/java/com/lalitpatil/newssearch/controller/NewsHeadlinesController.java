package com.lalitpatil.newssearch.controller;

import com.lalitpatil.newssearch.model.NewsHeadlines;
import com.lalitpatil.newssearch.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class NewsHeadlinesController {
    @Autowired
    private SearchService searchService;

    @GetMapping("/all")
    public Iterable<NewsHeadlines> getAllHeadlines() {
        return this.searchService.getAllHeadlines();
    }

    @GetMapping("/search")
    public Iterable<NewsHeadlines> searchHeadlines(@RequestParam String query) {
        return this.searchService.getAllRelevantHeadlines(query);
    }

    @GetMapping("/suggestion")
    public Iterable<NewsHeadlines> headlinesSuggestion(@RequestParam String query) {
        return this.searchService.getAllRelevantHeadlinesSuggestions(query);
    }
}
