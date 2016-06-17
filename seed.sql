CREATE TABLE puppies (id serial, name varchar(255));
INSERT INTO puppies (name) VALUES ('george'), ('max'), ('bob');

CREATE TABLE kittens (id serial, name varchar(255), property varchar(255));
INSERT INTO kittens (name, property) VALUES ('bill', 'indoor'), ('Tom', 'indoor'), ('Henry', 'outdoor');
