CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(180),
    email VARCHAR(180),
    img TEXT,
    auth_id TEXT
);
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description VARCHAR(180),
    img TEXT,
    price INT
);
CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    cart VARCHAR(250),
    userid INT,
    FOREIGN KEY (userid) REFERENCES users(id)
);
INSERT INTO USERS (user_name, email, img, auth_id) 
VALUES ('david fischer', 'davidfisc@hotmail.com', 'https://i.guim.co.uk/img/media/c121bdf511d565a18faaad1c9cbf3cb02c3b8d58/0_0_2400_2400/master/2400.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=80c65ca2e32b211d0965884c6bf7ecf1', '123456789');
INSERT INTO USERS (user_name, email, img, auth_id) 
VALUES ('liz fischer', 'test@test.com', 'https://3.bp.blogspot.com/-jIOlaKwINSQ/Wni55MSOaZI/AAAAAAAAn_A/iu7xN9Z4I2cYK2HNwwnmGwfu4koFpDVkQCEwYBhgL/s1600/image001.jpg', '987654321');
INSERT INTO PRODUCTS (name, description, img, price)
VALUES ('apple', 'very sweet', '', 4);
INSERT INTO PRODUCTS (name, description, img, price)
VALUES ('pie', 'very sweet', '', 5);
INSERT INTO PRODUCTS (name, description, img, price)
VALUES ('brownie', 'very sweet', '', 6);
INSERT INTO PRODUCTS (name, description, img, price)
VALUES ('yams', 'very sweet', '', 7);