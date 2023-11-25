# TabletopGather

✨ **This workspace is managed with [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Prerequisites

- [Node](https://nodejs.org/en/) ($\geq$ 16.13.0 or $\geq$ 18.18.0)
- [Docker](https://www.docker.com/) ($\geq$ 24.0.6)
- [Docker Compose](https://docs.docker.com/compose/) ($\geq$ v2.23.0-desktop.1)
- No Java toolchain!

The easiest way to get going with docker is to install [Docker Desktop](https://www.docker.com/products/docker-desktop) for your operating system.
This will install both Docker and Docker Compose on your machine.

You could install Nx globally, but it's not required. If you want to, run `npm install -g nx`. If you don't, you
have to prefix all Nx commands with `npx` (e.g. `npx nx serve frontend`).

## Starting the application

_(All commands are to be run from the root of the repository. Nx specific commands can be run from anywhere in the repository.)_

1. If you haven't already: Create an `application-development.yml` following the instructions in the backend [README, section "Prerequisites"](./apps/backend/README.md#prerequisites).

2. If you haven't already: pull the latest postgres image with `docker pull postgres:latest` at the time of writing, this is version 16.0

3. Install dependencies with `npm ci`.

4. Start the frontend with `nx serve frontend`. Open your browser and navigate to http://localhost:4200/

> This will launch an angular dev server with hot reloading enabled. Don't worry about building the app, Nx will take care of dependent tasks and build order.

5. Start the backend with `nx docker-serve backend`. The backend will be available at http://localhost:8080/

> This will - via `docker-compose` - launch a preconfigured postgres container and the backend application container.
> It might take a minute or two if you're doing this the first time, especially if you don't have the postgres image locally yet.
> When the backend container starts, it builds the application and then runs it - no need to have a Java toolchain installed on your machine!

See the backend [README](./apps/backend/README.md) for more information on how it's setup.

## Generating coverage reports

Coverage reports can be generated with `nx run-many test:coverage`.

- Frontend reports are located in `/coverage`
- Backend reports are located in `/apps/backend/target/site/jacoco`
