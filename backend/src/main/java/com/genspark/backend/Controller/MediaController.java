package com.genspark.backend.Controller;

import com.genspark.backend.AvailabilityApi.StreamingAvailableAPI;
import com.genspark.backend.Entity.Media;
import com.genspark.backend.Service.AppUserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {
    private final AppUserService appUserService;

    /**
     *
     * @param searchDetails
     * @return
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
}

/**
 *
 */
@Data
@AllArgsConstructor
class SearchDetails {
    private String country;
    private String service;
    private String type;
    private String keyword;
}
