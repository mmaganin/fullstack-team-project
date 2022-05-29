# Movie or TV Series Streaming Availability fullstack-team-project
React, Spring Boot, MySQL full stack team project that allows users to input a streaming service, country, type (movie or TV series) and keyword to search for movies or TV shows that are available for streaming.
# Project Setup
Streaming Availability API documentation: https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/

To get the app up and running, you have to fix the application.properties file on the backend. 

You first have to install MySQL installer (https://dev.mysql.com/downloads/installer/), and make sure to remember the username and password it makes you create.

Then in MySQL workbench that gets installed, create a new schema called "movieteamproject_schema" on the localhost:3306 instance.

Type in your MySQL password into application.properties, then your DB stuff is done setting up.

Next, you have to visit the Streaming Availability API link which is pinned in discord, log in with your google account, grab the API key it gives you, and paste it into the StreamingAvailableAPI.java file. 

Keep in mind it only gives you 100 free API calls/day so be careful not to exceed that.