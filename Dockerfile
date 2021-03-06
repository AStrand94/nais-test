FROM navikt/java:8
MAINTAINER Andreas Strand andreas.strand@nav.no

ARG JAR_FILE
COPY target/${JAR_FILE} app.jar

ARG SPRING_PROFILES_ACTIVE
RUN echo ${SPRING_PROFILES_ACTIVE}
ENV JAVA_OPTS="${JAVA_OPTS} -Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}"
