package com.genspark.backend.Service;

import com.genspark.backend.Dao.AppRoleDao;
import com.genspark.backend.Dao.AppUserDao;
import com.genspark.backend.Entity.AppRole;
import com.genspark.backend.Entity.AppUser;
import com.genspark.backend.Entity.Media;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Performs business logic for AppUser user account operations
 */
@Service
@Transactional
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService, UserDetailsService {
    private final AppUserDao appUserDao;
    private final AppRoleDao appRoleDao;
    private final PasswordEncoder passwordEncoder;

    /**
     * Custom UserDetailsService config method for loading a user from DB by username (emails used in app) and adding proper authorities
     *
     * @param email user's email
     * @return Spring Security object containing user's details
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser user = appUserDao.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });

        return new User(user.getEmail(), user.getPassword(), authorities);
    }

    /**
     * saves new user to database
     *
     * @param appUser user account
     * @return new AppUser user
     */
    @Override
    public AppUser saveUser(AppUser appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        return appUserDao.save(appUser);
    }

    /**
     * saves new role to DB
     *
     * @param role user's auth role
     * @return new AppRole auth role
     */
    @Override
    public AppRole saveRole(AppRole role) {
        return appRoleDao.save(role);
    }

    /**
     * gets all roles present in DB
     *
     * @return list of AppRole auth roles
     */
    @Override
    public List<AppRole> getRoles() {
        return appRoleDao.findAll();
    }

    /**
     * adds auth role to user
     *
     * @param email    user's email
     * @param roleName role to add to user
     */
    @Override
    public void addRoleToUser(String email, String roleName) {
        AppUser user = appUserDao.findByEmail(email);
        AppRole role = appRoleDao.findByName(roleName);
        user.getRoles().add(role);
    }

    /**
     * edits a user's portfolio after buy or sell
     *
     * @param email       user's email
     * @param password    user's password
     * @param mediaToEdit movie to add or remove from list
     * @return AppUser with altered movies list
     */
    @Override
    public AppUser editMovieList(String email, String password, Media mediaToEdit) {
        //NEEDS COMPLETION
        AppUser appUser = new AppUser();
        return saveUser(appUser);
    }

    /**
     * creates a new user with ROLE_USER role
     *
     * @param email    user's email
     * @param password user's password
     * @return new AppUser user with default ROLE_USER role
     */
    @Override
    public AppUser createUser(String email, String password) {
        Collection<AppRole> roles = new ArrayList<>();
        AppRole userRole;
        if ((userRole = appRoleDao.findByName("ROLE_USER")) == null) {
            appRoleDao.save((userRole = new AppRole(0L, "ROLE_USER")));
        }
        roles.add(userRole);
        AppUser appUser = new AppUser(0L, email, password, new ArrayList<>(), roles);

        return saveUser(appUser);
    }

    /**
     * gets User from DB by email
     *
     * @param email user's email
     * @return AppUser user
     */
    @Override
    public AppUser getUser(String email) {
        return appUserDao.findByEmail(email);
    }

    /**
     * gets all users from DB
     *
     * @return list of AppUser users
     */
    @Override
    public List<AppUser> getUsers() {
        return appUserDao.findAll();
    }
}