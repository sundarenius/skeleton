# SERVER

Docker mongoDB:
```
docker run --name mongodb-test-app -p 27017:27017 -v "$(pwd)"/data/db:/data/db --rm -it -d mongo:4.4.14
```

## Maintainers
This project was built and maintained by Håkan Sundström.
https://github.com/Sundarenius
