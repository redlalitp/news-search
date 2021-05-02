package com.lalitpatil.newssearch;

import com.lalitpatil.newssearch.model.NewsHeadlines;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class HeadlineStore {
    public static Set<NewsHeadlines> relevantHeadlines;
}
