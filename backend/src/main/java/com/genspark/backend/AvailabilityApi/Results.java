package com.genspark.backend.AvailabilityApi;

import java.util.ArrayList;

/**
 *  POJO generated from Streaming Availability API response after user enters a search
 */
public class Results{
    //List of individual medias (movie or show) containing their data
    public ArrayList<ApiResponsePojo> results;
    //pages of media objects (not used)
    public int total_pages;
}