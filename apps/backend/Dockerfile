# syntax=docker/dockerfile:1

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy mvn dir and pom.xml to image
# Download dependencies
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve 

# Copy source code to image
# Build & Run app
COPY src ./src
CMD ["./mvnw", "spring-boot:run"]