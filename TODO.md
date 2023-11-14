# To Do

## Nx

- [ ] Set api url via environment variables

## Backend Setup

- [ ] Add `application-local.yml` with `spring.profiles.active: local` to `src/main/resources` with the necessary dev overrides
- [ ] Remove hard-coded values such as db credentials from `application.yml` & `docker-compose.yml` and replace with environment variables

## Backend Development

- [ ] Add a ways to migrate the database $\to$ Spring?
- [ ] Rename `DTO` to `Dto`. No one uses DTO @Bootify.io!
- [ ] Rename `service` dir to `services`
- [ ] Add backend validation on `@RequestBody` objects

## Backend Deployment

- [ ] Add `@CrossOrigin(origins = "<host-url>")` to `@RestController` classes
