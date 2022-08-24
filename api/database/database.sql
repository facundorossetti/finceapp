CREATE DATABASE finceapi;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(40),
  password CHAR(60),
  email TEXT
);

INSERT INTO users (name, email, password) VALUES ('ryan', 'ryan@example.com', '1234');
