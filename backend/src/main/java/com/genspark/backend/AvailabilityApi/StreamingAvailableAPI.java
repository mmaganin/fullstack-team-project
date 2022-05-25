package com.genspark.backend.AvailabilityApi;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.genspark.backend.Entity.Media;

/**
 * API documentation located at https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/
 */
public class StreamingAvailableAPI {
    //api key required for API calls
    private static String apiKey = "";
    //API base URI that requires at least country, service, and type parameters
    public static String baseURI = "https://streaming-availability.p.rapidapi.com/search/basic?";

    /**
     * Generates proper URI, sends a GET request to Streaming API, converts String response to List of Media DB entities
     * @param country         country code: us, ca, gb, de, fr, it, au, mx, br, es, in, id, ru, jp, th, kr
     * @param service         streaming service: netflix, prime, disney, apple, mubi, curiosity, zee5
     * @param type            type of media: movie, series
     * @param output_language language to get API response in, default is 'en' for English only in this app
     * @param genre           defaults to nothing in this app and is not used, details in API documentation
     * @param keyword         any keyword related to desired media to search for
     * @return list of Media objects: data related to movie or show
     * @throws IOException
     * @throws InterruptedException
     */
    public static List<Media> getMediaAvailability(String country, String service, String type, String output_language, String genre, String keyword) throws IOException, InterruptedException {
        URI uri = URI.create(createUriStrWithParams(country, service, type, output_language, genre, keyword));

        HttpRequest request = HttpRequest.newBuilder().uri(uri)
                .header("X-RapidAPI-Host", "streaming-availability.p.rapidapi.com")
                .header("X-RapidAPI-Key", apiKey)
                .method("GET", HttpRequest.BodyPublishers.noBody()).build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        return mapStrResponseToMediaEntities(response.body());
    }

    /**
     * generates string containing completed URI (using inputted parameters) to send with request to API
     * @param country         country code: us, ca, gb, de, fr, it, au, mx, br, es, in, id, ru, jp, th, kr
     * @param service         streaming service: netflix, prime, disney, apple, mubi, curiosity, zee5
     * @param type            type of media: movie, series
     * @param output_language language to get API response in, default is 'en' for English only in this app
     * @param genre           defaults to nothing in this app and is not used, details in API documentation
     * @param keyword         any keyword related to desired media to search for
     * @return string containing completed URI to send with request to API
     */
    public static String createUriStrWithParams(String country, String service, String type, String output_language, String genre, String keyword) {
        if (country.equals("") || service.equals("") || type.equals(""))
            throw new IllegalArgumentException("API call requires country, service, and type parameters");
        if (output_language.equals(""))
            output_language = "en";
        String output = baseURI + Stream.of("country=" + country, "service=" + service, "type=" + type,
                        "output_language=" + output_language, "genre=" + genre, "keyword=" + keyword)
                .reduce((acc, e) -> e.indexOf("=") == e.length() - 1
                        ? acc : acc + "&" + e).orElse("");

        return output;
    }

    /**
     * maps String output of API response to a list of Media objects DB entity
     * @param jsonResponse response from streaming API as String
     * @return list of Media objects entities: data related to movie or show
     */
    public static List<Media> mapStrResponseToMediaEntities(String jsonResponse) {
        ObjectMapper om = new ObjectMapper();
        Results results;
        try {
            results = om.readValue(jsonResponse, Results.class);

        } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
            return null;
        }

        return Stream.of(results)
                .map(result -> result.results)
                .flatMap(List::stream)
                .map(StreamingAvailableAPI::apiPojoToMediaEntity).collect(Collectors.toList());
    }

    /**
     * converts POJO from API response to Media DB entity
     * @param apiResponsePojo Pojo generated from Results object from API response
     * @return Media object entity: data related to movie or show
     */
    public static Media apiPojoToMediaEntity(ApiResponsePojo apiResponsePojo) {
        return new Media(
                apiResponsePojo.imdbID,
                apiResponsePojo.tmdbID,
                apiResponsePojo.imdbRating,
                apiResponsePojo.imdbVoteCount,
                apiResponsePojo.tmdbRating,
                apiResponsePojo.originalTitle,
                apiResponsePojo.countries,
                apiResponsePojo.year,
                apiResponsePojo.runtime,
                apiResponsePojo.cast,
                apiResponsePojo.significants,
                apiResponsePojo.title,
                apiResponsePojo.overview,
                apiResponsePojo.tagline,
                apiResponsePojo.video,
                apiResponsePojo.age,
                apiResponsePojo.originalLanguage,
                apiResponsePojo.posterURLs.original,
                apiResponsePojo.firstAirYear,
                apiResponsePojo.lastAirYear,
                apiResponsePojo.episodeRuntimes,
                apiResponsePojo.seasons,
                apiResponsePojo.episodes,
                apiResponsePojo.status
        );
    }
}
