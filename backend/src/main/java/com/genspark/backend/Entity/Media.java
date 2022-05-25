package com.genspark.backend.Entity;


import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;

import static javax.persistence.GenerationType.AUTO;

/**
 * DB Entity for storing media (shows or movies) for a user's must-watch list
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
    private Long id;
    private String imdbID;
    private String tmdbID;
    private Long imdbRating;
    private Long imdbVoteCount;
    private Long tmdbRating;
    private String originalTitle;
    private ArrayList<String> countries;
    private Long year;
    private Long runtime;
    private ArrayList<String> cast;
    private ArrayList<String> significants;
    private String title;
    private String overview;
    private String tagline;
    private String video;
    private Long age;
    private String originalLanguage;
    private String posterUrlOriginal;
    private String firstAirYear;
    private String lastAirYear;
    private ArrayList<String> episodeRuntimes;
    private Long seasons;
    private Long episodes;
    private String status;

    //constructor that does not include Long id so that MySQL auto generates a new unique id
    public Media(String imdbID, String tmdbID, Long imdbRating, Long imdbVoteCount, Long tmdbRating, String originalTitle,
                 ArrayList<String> countries, Long year, Long runtime, ArrayList<String> cast, ArrayList<String> significants, String title, String overview, String tagline,
                 String video, Long age, String originalLanguage, String posterUrlOriginal, String firstAirYear,
                 String lastAirYear, ArrayList<String> episodeRuntimes, Long seasons, Long episodes, String status) {
        this.imdbID = imdbID;
        this.tmdbID = tmdbID;
        this.imdbRating = imdbRating;
        this.imdbVoteCount = imdbVoteCount;
        this.tmdbRating = tmdbRating;
        this.originalTitle = originalTitle;
        this.countries = countries;
        this.year = year;
        this.runtime = runtime;
        this.cast = cast;
        this.significants = significants;
        this.title = title;
        this.overview = overview;
        this.tagline = tagline;
        this.video = video;
        this.age = age;
        this.originalLanguage = originalLanguage;
        this.posterUrlOriginal = posterUrlOriginal;
        this.firstAirYear = firstAirYear;
        this.lastAirYear = lastAirYear;
        this.episodeRuntimes = episodeRuntimes;
        this.seasons = seasons;
        this.episodes = episodes;
        this.status = status;
    }
}