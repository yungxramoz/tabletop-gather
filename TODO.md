# To Do

## Nx

- [ ] Set api url via environment variables

## Backend Setup

- [ ] Add `application-local.yml` with `spring.profiles.active: local` to `src/main/resources` with the necessary dev overrides
- [ ] Remove hard-coded values such as db credentials from `application.yml` & `docker-compose.yml` and replace with environment variables

## Backend Development

- [ ] Add backend validation on `@RequestBody` objects

## Backend Deployment

- [ ] Add deployment url to JwtFilter
- [ ] Move `security.jwt.*` to `application-local.yml` - it's currently committed to the repo 😬
