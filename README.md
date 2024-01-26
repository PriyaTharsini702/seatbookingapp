# A simple movie seat booking App using React and node js



Only an authenticated user's alone can access the application (MovieTime).

For Authentication i've used Jwt token based authentication by storing all the registered users in mongodb atlas cloud database and to validate the authenticated user as well.


Once the User successfully loggned into the application a token will be set in the local storage with expiration of 1day, once the user logout the token will be removed and it will redirect to the login page.



# To run this application:-

Download the ZIP code

It consist of two folder client and server

open an individual terminal for each client and server and give the command to install node modules "npm i"

after the command 'npm i' --> npm run start. data base will gets connected and frontend also starts to run
