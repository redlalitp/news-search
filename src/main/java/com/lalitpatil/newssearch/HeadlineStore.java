package com.lalitpatil.newssearch;

import com.lalitpatil.newssearch.model.NewsHeadlines;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class HeadlineStore {
    public static Set<NewsHeadlines> allHeadlines;
    public static Set<NewsHeadlines> relevantHeadlines;
}
