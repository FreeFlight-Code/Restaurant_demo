-- CREATE TABLE cart (
--     id SERIAL,
--     product_id int, 
--     user_id int, 
--     quantity int, 
--     PRIMARY KEY (id),
--     FOREIGN KEY (product_id) REFERENCES products (id),
--     FOREIGN KEY (user_id) REFERENCES users (id)
-- );

CREATE TABLE cart (
    cart varchar, 
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users (id)
);