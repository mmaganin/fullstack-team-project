package com.genspark.backend.Security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.genspark.backend.Entity.AppRole;
import com.genspark.backend.Entity.AppUser;
import com.genspark.backend.Service.AppUserService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class SecurityUtil {
    //password for admin user with ROLE_ADMIN role
    protected static final String adminPassword = "secretAdminPassword";
    //algorithm used to sign and decrypt JWT access tokens
    protected static Algorithm jwtAlgorithm = Algorithm.HMAC256("thisIsASecretKeyThatIsUsedInAlgorithmToGenerateJWTTokensAndNormallyShouldBeMoreSecure".getBytes());

    /**
     * Generates JWT access or refresh token
     *
     * @param email         user's email
     * @param authorities   input null if generate refresh token
     * @param requestURL    URL associated with the request wanting the token
     * @param algorithm     used to sign/decrypt tokens
     * @param isAccessToken if false, generates refresh token
     * @return JWT refresh or access token as String
     */
    public static String generateJWTToken(String email, List<String> authorities, String requestURL, Algorithm algorithm, boolean isAccessToken) {
        if (isAccessToken) {
            return JWT.create().withSubject(email).withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000)) //amount of time before access token expires
                    .withIssuer(requestURL).withClaim("roles", authorities).sign(algorithm);
        } else {
            return JWT.create().withSubject(email).withExpiresAt(new Date(System.currentTimeMillis() + 480 * 60 * 1000)) //amount of time before refresh token expires
                    .withIssuer(requestURL).sign(algorithm);
        }
    }

    /**
     * takes JWT access and refresh tokens and generates a map whose key value pairs are used in JSON responses
     *
     * @param access_token  JWT access token
     * @param refresh_token JWT refresh token
     * @return Map with tokens as values
     */
    public static Map<String, String> createTokensBody(String access_token, String refresh_token) {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        return tokens;
    }

    /**
     * Decodes JWT tokens with algorithm
     *
     * @param token JWT access or refresh token
     * @return JWT token decoded with algorithm
     */
    public static DecodedJWT getDecodedJWT(String token) {
        Algorithm algorithm = jwtAlgorithm;
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

    /**
     * generates error response for failed HTTP requests
     *
     * @param response outgoing REST HTTP response
     * @param e        exception error associated with failed HTTP request
     * @return Map with error message content
     */
    public static Map<String, String> setErrorResponse(HttpServletResponse response, Exception e) {
        response.setHeader("error", e.getMessage());
        response.setStatus(FORBIDDEN.value());
        Map<String, String> error = new HashMap<>();
        error.put("error_message", e.getMessage());
        response.setContentType(APPLICATION_JSON_VALUE);
        return error;
    }

    /**
     * generates HTTP response that includes a newly generated access token, used when refresh token used to get new access token
     *
     * @param appUserService service object for user operations
     * @param email          user's email
     * @param refresh_token  JWT refresh token
     * @param request        incoming REST HTTP request
     * @param response       outgoing REST HTTP response
     * @throws IOException if you cannot write to http HttpServletResponse
     */
    public static void getAccessAndWriteTokens(AppUserService appUserService, String email, String refresh_token, HttpServletRequest request, HttpServletResponse response) throws IOException {
        Algorithm algorithm = jwtAlgorithm;
        AppUser user = appUserService.getUser(email);
        String access_token = generateJWTToken(user.getEmail(), user.getRoles().stream().map(AppRole::getName).collect(Collectors.toList()), request.getRequestURL().toString(), algorithm, true);
        Map<String, String> tokens = createTokensBody(access_token, refresh_token);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

    /**
     * Gets roles from a decoded JWT token and sets the roles in the security config
     *
     * @param decodedJWT  JWT token decoded with algorithm
     * @param email       user's email
     * @param request     incoming REST HTTP request
     * @param response    outgoing REST HTTP response
     * @param filterChain security config auth filter object
     * @throws ServletException
     * @throws IOException
     */
    public static void setAuthFromRoles(DecodedJWT decodedJWT, String email, HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        stream(roles).forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role));
        });
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        filterChain.doFilter(request, response);
    }

    /**
     * handles requests that want a new access token from a refresh token
     *
     * @param authorizationHeader auth portion of header of the HTTP request
     * @param appUserService      service object for user operations
     * @param request             incoming REST HTTP request
     * @param response            outgoing REST HTTP response
     * @throws IOException if you cannot write to http HttpServletResponse
     */
    public static void execAuthHeaderActions(String authorizationHeader, AppUserService appUserService, HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            String refresh_token = authorizationHeader.substring("Bearer ".length());
            DecodedJWT decodedJWT = getDecodedJWT(refresh_token);
            String email = decodedJWT.getSubject();
            getAccessAndWriteTokens(appUserService, email, refresh_token, request, response);
        } catch (Exception e) {
            Map<String, String> error = setErrorResponse(response, e);
            new ObjectMapper().writeValue(response.getOutputStream(), error);
        }
    }

    /**
     * handles a user's role permission from an HTTP request's auth header
     *
     * @param authorizationHeader auth portion of header of the HTTP request
     * @param request             incoming REST HTTP request
     * @param response            outgoing REST HTTP response
     * @param filterChain         security config auth filter object
     * @throws IOException if you cannot write to http HttpServletResponse
     */
    public static void execAuthHeaderActions(String authorizationHeader, HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException {
        try {
            String refresh_token = authorizationHeader.substring("Bearer ".length());
            DecodedJWT decodedJWT = getDecodedJWT(refresh_token);
            String email = decodedJWT.getSubject();
            setAuthFromRoles(decodedJWT, email, request, response, filterChain);
        } catch (Exception e) {
            Map<String, String> error = setErrorResponse(response, e);
            new ObjectMapper().writeValue(response.getOutputStream(), error);
        }
    }
}
