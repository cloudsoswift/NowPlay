FROM gradle:7.6-jdk11 as build-stage
WORKDIR /app
COPY . .
RUN gradle clean build

FROM openjdk:11
COPY --from=build-stage /app/build/libs/specialized-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

