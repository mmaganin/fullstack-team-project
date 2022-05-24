package com.genspark.backend.Security;

import com.genspark.backend.Dao.AppRoleDao;
import com.genspark.backend.Dao.AppUserDao;
import com.genspark.backend.Entity.AppRole;
import com.genspark.backend.Entity.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static com.genspark.backend.Security.SecurityUtil.adminPassword;

/**
 * Configure DB with default roles and an admin user with admin role
 */
@Configuration
@RequiredArgsConstructor
public class DbConfig {
    private final PasswordEncoder passwordEncoder;

    /**
     * Executes cmd line args to populate DB with required defaults upon starting app
     * @param appRoleDao Dao to add roles to DB
     * @param appUserDao Dao to add users to DB
     * @return cmd line args that populate DB
     */
    @Bean
    CommandLineRunner commandLineRunner(AppRoleDao appRoleDao, AppUserDao appUserDao){
        return args -> {
            AppRole adminRole = new AppRole("ROLE_ADMIN");
            AppRole userRole = new AppRole("ROLE_USER");
            AppUser adminUser = new AppUser("admin", passwordEncoder.encode(adminPassword), new ArrayList<>(), List.of(adminRole));

            if(appRoleDao.findByName("ROLE_ADMIN") == null){
                appRoleDao.save(adminRole);
            }
            if(appRoleDao.findByName("ROLE_USER") == null){
                appRoleDao.save(userRole);
            }
            if(appUserDao.findByEmail("admin") == null){
                appUserDao.save(adminUser);
            }
        };
    }
}
