#NAIS - test project

Project for testing NAV's nais-platform. https://nais.io

For å bygge lokalt:

Frontend build:

docker build . -t react-test:{version} --build-arg PROXY=${HTTPS_PROXY}

Backend build:

docker build . -t nais-test:{version} --build-arg APP_REDIS_HOST=redis --build-arg APP_REDIS_PORT=6379

