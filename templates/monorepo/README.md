# MOTESSCHEMA-PROJECT

... information/introduction ...

Run mongodb,

````
docker run --name mongo-db-meeting-schedule -p 27017:27017 -v "$(pwd)"/data/db:/data/db -it -d mongo:latest
````

Docker:
```
docker build -t monthly-programs .
docker run -it -p 8080:8080 -e PORT=8080 -e MONGO_ATLAS_URL={"url"} monthly-programs
```

## Deployment
```
heroku login
heroku container:login
heroku container:push web -a monthly-program
heroku container:release web -a monthly-program
```

## Maintainers
This project was built and maintained by Håkan Sundström.
https://github.com/Sundarenius
