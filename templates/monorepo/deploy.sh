heroku container:login &&
heroku container:push web -a monthly-program &&
heroku container:release web -a monthly-program