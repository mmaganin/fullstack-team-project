package com.genspark.backend.AvailabilityApi;

import com.fasterxml.jackson.annotation.JsonProperty; // version 2.11.1
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;

/**
 *
 */
@ToString
public class ApiResponsePojo {
    public String imdbID;
    public String tmdbID;
    public int imdbRating;
    public int imdbVoteCount;
    public int tmdbRating;
    public String backdropPath;
    public BackdropURLs backdropURLs;
    public String originalTitle;
    public ArrayList<Integer> genres;
    public ArrayList<String> countries;
    public int year;
    public int runtime;
    public ArrayList<String> cast;
    public ArrayList<String> significants;
    public String title;
    public String overview;
    public String tagline;
    public String video;
    public String posterPath;
    public PosterURLs posterURLs;
    public int age;
    public StreamingInfo streamingInfo;
    public String originalLanguage;
}

//Classes that allow for fasterxml library to generate pojo from JSON String

class BackdropURLs {
    @JsonProperty("1280")
    public String _1280;
    @JsonProperty("300")
    public String _300;
    @JsonProperty("780")
    public String _780;
    public String original;
}

class Netflix {
    public Us us;
}

class Peacock {
    public Us us;
}

class Prime {
    public Us us;
}

class Disney {
    public Us us;
}

class Hulu {
    public Us us;
}

class Hbo {
    public Us us;
}

class Paramount {
    public Us us;
}

class Starz {
    public Us us;
}

class Showtime {
    public Us us;
}

class Apple {
    public Us us;
}

class Mubi {
    public Us us;
}

class PosterURLs {
    @JsonProperty("154")
    public String _154;
    @JsonProperty("185")
    public String _185;
    @JsonProperty("342")
    public String _342;
    @JsonProperty("500")
    public String _500;
    @JsonProperty("780")
    public String _780;
    @JsonProperty("92")
    public String _92;
    public String original;
}

class StreamingInfo {
    public Netflix netflix;
    public Peacock peacock;
    public Hbo hbo;
    public Prime prime;
    public Disney disney;
    public Hulu hulu;
    public Paramount paramount;
    public Starz starz;
    public Showtime showtime;
    public Apple apple;
    public Mubi mubi;
}

class Us {
    public String link;
    public int added;
    public int leaving;
}

