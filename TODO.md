# To Do

## Nx

- [ ] Set api url via environment variables

## Backend Setup

- [ ] Add `application-local.yml` with `spring.profiles.active: local` to `src/main/resources` with the necessary dev overrides
- [ ] Remove hard-coded values such as db credentials from `application.yml` & `docker-compose.yml` and replace with environment variables

## Backend Deployment

- [ ] Add `@CrossOrigin(origins = "<host-url>")` to `@RestController` classes
- [ ] Add `.allowedOrigins("<host-url>")` to `registry.addMapping("/**")` in CorsConfig.java
