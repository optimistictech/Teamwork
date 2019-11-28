CREATE TABLE userTable (
    id serial PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(1000) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    jobRole VARCHAR(30) NOT NULL,
    address VARCHAR(100),
    staffnumber VARCHAR(20) NOT NULL,
    employmentdate DATE,
    administrator BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE TABLE tagTable (
    id serial PRIMARY KEY,
    tagname VARCHAR(30) NOT NULL
);
CREATE TABLE commentTable (
    id serial PRIMARY KEY,
    coment text NOT NULL,
    feedid INT NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inappropFlag BOOLEAN DEFAULT FALSE NOT NULL,
    authorid INT NOT NULL
);
CREATE TABLE feedTable (
    id serial PRIMARY KEY,
    title text,
    feed text NOT NULL,
    feedtype VARCHAR(10) NOT NULL,
    createdon TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    authorid INT NOT NULL,
    tagid INT,
    inappropFlag BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO
    usertable (
        firstname,
        lastname,
        email,
        gender,
        staffnumber,
        address,
        employmentdate,
        jobrole,
        administrator,
        password
    )
VALUES
    (
        'super',
        'user',
        'superuser@teamwork.com',
        'male',
        'TW00001',
        'TeamWork Office',
        CURRENT_TIMESTAMP,
        'super admin',
        true,
        '$2b$10$QfiRlhNKVqosriah12DDveCQ6tCgZTKlMMwcHF9dNZP1lGFtuAYmu'
    );

    
    INSERT INTO tagtable (tagname) VALUES('Work');
    INSERT INTO tagtable (tagname) VALUES('Family');
    INSERT INTO tagtable (tagname) VALUES('Casual');