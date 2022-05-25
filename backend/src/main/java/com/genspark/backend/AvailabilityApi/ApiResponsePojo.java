package com.genspark.backend.AvailabilityApi;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.ToString;

import java.util.ArrayList;

/**
 * fasterxml library generates a list of this pojo in Results object after getting data from Streaming Availibility API
 */
@ToString
public class ApiResponsePojo {
    public String imdbID;
    public String tmdbID;
    public Long imdbRating;
    public Long imdbVoteCount;
    public Long tmdbRating;
    public String backdropPath;
    public BackdropURLs backdropURLs;
    public String originalTitle;
    public ArrayList<Long> genres;
    public ArrayList<String> countries;
    public Long year;
    public Long runtime;
    public ArrayList<String> cast;
    public ArrayList<String> significants;
    public String title;
    public String overview;
    public String tagline;
    public String video;
    public String posterPath;
    public PosterURLs posterURLs;
    public Long age;
    public StreamingInfo streamingInfo;
    public String originalLanguage;
    public String firstAirYear;
    public String lastAirYear;
    public ArrayList<String> episodeRuntimes;
    public Long seasons;
    public Long episodes;
    public String status;
}

//Classes that allow for fasterxml library to use a JSON string to generate a Results pojo containing ApiResponsePojo pojos

class BackdropURLs {
    @JsonProperty("1280")
    public String _1280;
    @JsonProperty("300")
    public String _300;
    @JsonProperty("780")
    public String _780;
    public String original;
}

class CountryCodes {
    public OnPlatform us;
    public OnPlatform ca;
    public OnPlatform gb;
    public OnPlatform de;
    public OnPlatform fr;
    public OnPlatform it;
    public OnPlatform au;
    public OnPlatform mx;
    public OnPlatform br;
    public OnPlatform es;
    public OnPlatform in;
    public OnPlatform id;
    public OnPlatform ru;
    public OnPlatform jp;
    public OnPlatform th;
    public OnPlatform kr;
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
    public CountryCodes netflix;
    public CountryCodes prime;
    public CountryCodes disney;
    public CountryCodes apple;
    public CountryCodes mubi;
    public CountryCodes curiosity;
    public CountryCodes zee5;
    public CountryCodes hotstar;
}

class OnPlatform {
    public String link;
    public Long added;
    public Long leaving;
}

