
## Install 
```sh
mkdir nextjs-tube && cd nextjs-tube
# configure .env
docker-compose up -d
```

## Build

```sh
# add Dockerfile
docker build -t jimchen2/s3-public-index:latest .

# add .env
docker run -d --env-file .env -p 1241:3000 jimchen2/s3-public-index:latest
```


