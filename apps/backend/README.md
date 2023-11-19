# Backend

> This app was created with Bootify.io

To view the Bootify.io Setup, visit [this link](https://bootify.io/app/1AFNHOA9NPO5)

## Development

During development it is recommended to use the profile `local`. In IntelliJ `--spring.config.additional-location=classpath:application.local.yml --spring.profiles.active=local` can be
added in the Run Configuration after enabling this property in "Modify options". Create your own
`application-local.yml` file to override settings for development.

Lombok must be supported by your IDE. For IntelliJ install the Lombok plugin and enable annotation processing -
[learn more](https://bootify.io/next-steps/spring-boot-with-lombok.html).

After starting the application it is accessible under `localhost:8080`.

### Adding a user manually

![image](https://github.com/shoedler/tabletop-gather/assets/38029550/02ea9ab1-7607-4bdb-b0b5-e94fee9a2d56)

### Retrieving a JWT manually

![image](https://github.com/shoedler/tabletop-gather/assets/38029550/adf81b94-33e5-4ae6-a98e-9393cd781c34)

## Docker

⚠️ This section is for reference only. See the main workspace [README](../../README.md) for instructions on how to start the application.

### Building and running the backend locally

The backend is pulled up via docker-compose in conjunction with the postgres db. The docker-compose file is located in the root directory of the project.

1. Build the backend image. See [Backend Image](#backend-image) on how to build it.
2. Pull the postgres image. See [Postgres Image](#postgres-image) on how to do this.
3. Start the backend by running `docker-compose up` in the root directory of the project (/apps/backend).

### General Docker Commands

| Description         | Command         |
| ------------------- | --------------- |
| List all containers | `docker ps -a`  |
| List all images     | `docker images` |

### Backend Image

Build Image:

```shell
docker build --tag tg-java-backend .
```

Tag Image:

```shell
docker tag tg-java-backend:latest tg-java-backend:1.0.0
```

Run Container:

```shell
docker run --publish 8080:8080 tg-java-backend:1.0.0
```

### Postgres Image

Pull Image:

```shell
docker pull postgres:latest
```

at the time of writing, this is version 16.0

### Further utility commands

Remove Tag:

```shell
docker rmi tg-java-backend:1.0.0
```

### References

- [Docker: Build Java image](https://docs.docker.com/language/java/build-images/)
- [Docker: Run Java image as a container](https://docs.docker.com/language/java/run-containers/)
- [Docker: Use containers for Java development](https://docs.docker.com/language/java/develop/)

## Build locally

It's inteded to run the application (including building it) in a docker container. However, it can also be built
locally. This does require a Java toolchain on your system. Follow the instructions below to build the application locally.

The application can be built using the following command:

```
mvnw clean package
```

Start your application with the following command - here with the profile `production`:

```
java -Dspring.profiles.active=production -jar ./target/backend-0.0.1-SNAPSHOT.jar
```

If required, a Docker image can be created with the Spring Boot plugin. Add `SPRING_PROFILES_ACTIVE=production` as
environment variable when running the container.

```
mvnw spring-boot:build-image -Dspring-boot.build-image.imageName=tabletop.gather/backend
```

## Further readings

- [Maven docs](https://maven.apache.org/guides/index.html)
- [Spring Boot reference](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
- [Spring Data JPA reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
