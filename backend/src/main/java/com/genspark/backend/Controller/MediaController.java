package com.genspark.backend.Controller;

import com.genspark.backend.AvailabilityApi.StreamingAvailableAPI;
import com.genspark.backend.Entity.Media;
import com.genspark.backend.Service.AppUserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.genspark.backend.Security.SecurityUtil.execAuthHeaderActions;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

/**
 * REST controller mapping for searching for shows or movies
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MediaController {
    private final AppUserService appUserService;

    /**
     * Conducts search from user's inputted search parameters
     *
     * @param searchDetails object containing details of a user's search
     * @return 200 OK response entity with List<Media> search results body if successful, unprocessableEntity body otherwise
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping("/search")
    public ResponseEntity<List<Media>> searchMedia(@RequestBody SearchDetails searchDetails) throws IOException, InterruptedException {
        if (searchDetails.getCountry().equals("") || searchDetails.getService().equals("") || searchDetails.getType().equals(""))
            return ResponseEntity.unprocessableEntity().body(new ArrayList<Media>());

        return ResponseEntity.ok()
                .body(StreamingAvailableAPI.getMediaAvailability(searchDetails.getCountry(), searchDetails.getService(),
                        searchDetails.getType(), "en", "", searchDetails.getKeyword()));
    }

    /**
     * Gets a new JWT access token from a refresh token
     *
     * @param request  incoming REST HTTP request
     * @param response outgoing REST HTTP response
     * @throws IOException
     */
    @GetMapping("/tokens/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            execAuthHeaderActions(authorizationHeader, appUserService, request, response);
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

/**
 * object containing details of a user's search from frontend
 */
@Data
@AllArgsConstructor
class SearchDetails {
    //country code, possible values: us, ca, gb, de, fr, it, au, mx, br, es, in, id, ru, jp, th, kr
    private String country;
    //streaming service, possible values: netflix, prime, disney, apple, mubi, curiosity, zee5
    private String service;
    //type of media, possible values: movie, series
    private String type;
    private String keyword;
}
