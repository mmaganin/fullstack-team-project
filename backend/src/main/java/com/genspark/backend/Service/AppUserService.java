package com.genspark.backend.Service;

import com.genspark.backend.Entity.AppRole;
import com.genspark.backend.Entity.AppUser;
import com.genspark.backend.Entity.Media;

import java.util.List;

/**
 * implemented in classes that do business logic for AppUser user accounts
 */
public interface AppUserService {
    AppUser saveUser(AppUser appUser);

    AppUser getUser(String email);

    List<AppUser> getUsers();

    AppRole saveRole(AppRole role);

    List<AppRole> getRoles();

    void addRoleToUser(String email, String roleName);

    AppUser editMovieList(String email, String password, Media mediaToEdit);

    AppUser createUser(String email, String password);
}
