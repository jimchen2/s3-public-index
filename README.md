
## Install 
```sh
mkdir s3-public-index && cd s3-public-index
# configure .env
docker run -d --env-file .env -p 1241:3000 jimchen2/s3-public-index:latest
```

## Build

```sh
# add Dockerfile
docker build -t jimchen2/s3-public-index:latest .

# add .env
docker run -d --env-file .env -p 1241:3000 jimchen2/s3-public-index:latest
```


