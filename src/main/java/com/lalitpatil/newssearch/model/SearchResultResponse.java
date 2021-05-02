package com.lalitpatil.newssearch.model;

import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Component
public class SearchResultResponse {
    int pageNumber;
    int totalRecords;
    int totalPages;
    int recordsPerPage;
    Set<NewsHeadlines> newsHeadlines;
}
