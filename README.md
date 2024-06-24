
## Install 
```sh
# configure .env
docker run -d --env-file .env -p 1241:3000 jimchen2/s3-public-index:latest
```

## Build

```sh
# add Dockerfile
docker build -t jimchen2/s3-public-index:latest .
```

## Issue: File might be hidden if name is the same as folder
