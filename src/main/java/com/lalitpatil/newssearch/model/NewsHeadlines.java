package com.lalitpatil.newssearch.model;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "newsheadlines")
@ToString
public class NewsHeadlines {
    String publishDate;
    @Id
    String headlineText;
}
