package com.lalitpatil.newssearch.repository;

import com.lalitpatil.newssearch.model.NewsHeadlines;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsHeadlinesRepository extends CrudRepository<NewsHeadlines, Long> {}
