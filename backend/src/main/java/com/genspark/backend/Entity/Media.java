package com.genspark.backend.Entity;


import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;

import static javax.persistence.GenerationType.AUTO;

/**
 * DB Entity for storing media for must-watch list
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Media {
    @Id
    @GeneratedValue(strategy = AUTO)
    private int id;
    private String imdbID;
    private String tmdbID;
    private int imdbRating;
    private int imdbVoteCount;
    private int tmdbRating;
    private String originalTitle;
    private int year;
    private int runtime;
    //@ManyToMany(fetch = FetchType.EAGER)
    private ArrayList<String> cast;
    private String title;
    private String overview;
    private String tagline;
    private String video;
    private int age;
    private String originalLanguage;
    private String posterUrlOriginal;

    public Media(String imdbID, String tmdbID, int imdbRating, int imdbVoteCount, int tmdbRating, String originalTitle,
                 int year, int runtime, ArrayList<String> cast,
                 String title, String overview, String tagline, String video, int age, String originalLanguage, String posterUrlOriginal) {
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.imdbRating = imdbRating;
        this.imdbVoteCount = imdbVoteCount;
        this.tmdbRating = tmdbRating;
        this.originalTitle = originalTitle;
        this.year = year;
        this.runtime = runtime;
        this.cast = cast;
        this.title = title;
        this.overview = overview;
        this.tagline = tagline;
        this.video = video;
        this.age = age;
        this.originalLanguage = originalLanguage;
        this.posterUrlOriginal = posterUrlOriginal;
    }
}