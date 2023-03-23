CREATE DATABASE "laBoleria";

CREATE TABLE cakes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  image VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(11) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  clientid INTEGER REFERENCES clients(id),
  cakeid INTEGER REFERENCES cakes(id),
  quantity INTEGER,
  createdat TEXT NOT NULL DEFAULT to_char(NOW(), 'YYYY-MM-DD HH24:MI'),
  totalprice NUMERIC(6, 2)
);