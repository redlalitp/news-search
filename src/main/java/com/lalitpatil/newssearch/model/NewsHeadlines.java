package com.lalitpatil.newssearch.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Table(name = "newsheadlines")
public class NewsHeadlines {
    String publishDate;
    @Id
    String headlineText;

    public NewsHeadlines() {
    }
}