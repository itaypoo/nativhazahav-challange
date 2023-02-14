# Use a MySQL base image
FROM mysql:8

# Set the root password and create the database
ENV MYSQL_ROOT_PASSWORD=mysecretpassword
ENV MYSQL_DATABASE=mydb

HEALTHCHECK CMD curl --fail http://localhost:3306 || exit 1

# Copy the SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/
