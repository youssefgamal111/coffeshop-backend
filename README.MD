# 'npm install' to install the required packages.

# database setup
CREATE USER postgres WITH PASSWORD password123
CREATE DATABASE coffeshop;
CREATE DATABASE coffeshop_test  ;
# Ports
express port : localhost:3000
database 5432

# Jasmine tests
'npm run jasmine' to run jasmine tests(which refer to endpoint  you must test database first to add rows to column and then endpoints ,you must change the    "spec_dir": "build/controllers/tests" to  test endpoints   ). 
'npm run test' to run test case to test database(you must change the "spec_dir": "build/controllers/tests" to  test database )
# Start express
'npm run start' to start express
# DB Migrate
'db-migrate up' to perform migration.