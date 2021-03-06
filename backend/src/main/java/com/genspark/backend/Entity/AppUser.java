package com.genspark.backend.Entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

import static javax.persistence.GenerationType.AUTO;

/**
 * DB Entity for storing user information AppUser
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class AppUser {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String email;
    private String password;
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    private Collection<Media> media_in_list = new ArrayList<>();
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<AppRole> roles = new ArrayList<>();

    public AppUser(String email, String password, Collection<Media> media_in_list, Collection<AppRole> roles) {
        this.email = email;
        this.password = password;
        this.media_in_list = media_in_list;
        this.roles = roles;
    }
}