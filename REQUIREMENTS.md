# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
##### api endpoint
Create New user - [POST] /users/create  firstName, lastName, password, data must be passed body. 

Index - [GET] /users -  token required. Only admin can view all available users

Show - [GET] users/:id -  token required.

Authenticate - [GET] /authenticate - username, password  passed in body. Returns auth token on successful authentication
Create - [POST] /products/create - Access token required. Creates a new product for user. 

Index - [GET] /products view all the available products

Show - [GET] /products/:name - Access token required. Returns the order details for given product name

view the order attached with the user id passed in paramters - [GET] - /order/:id

###### database schema
 orders_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
  orders(id SERIAL PRIMARY KEY,user_id BIGINT REFERENCES users(id),status VARCHAR(8) );
  users ( id SERIAL PRIMARY KEY,username varchar(40),firstName VARCHAR(30),lastName VARCHAR(30),password VARCHAR(100));
  products(id SERIAL PRIMARY KEY,name VARCHAR(40),price INTEGER);

