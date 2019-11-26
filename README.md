# Teamwork
Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.

After running npm init, create a ".env" file. Make sure dotenv is installed. In the dot env file create the following environment variables:

SECRET_KEY = ( provide any key )

NB: Should have a cloudinary account
CLOUDINARY_NAME = ( provide name )
CLOUDINARY_KEY = ( provide key )
CLOUDINARY_SECRET = ( secret key)

PGHOST='localhost'
PGUSER=postgres
PGDATABASE= ( database )
PGPASSWORD= ( password )
PGPORT=5432

ADMINPASSWORD=teamworkAdmin

Before running mocha, to test. Please makes sure you run "npm start" once, this allows the app create the tables needed. After that, terminate the process. Then you can run npm test
