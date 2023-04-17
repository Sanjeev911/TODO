## React TODO List management application that allows users to organize their work and track their task list

 ### The app fulfills following requirements
 * Has a user registration and login interface for user management.
 * Password Validation.
    * At least one digit
    * At least one lowercase and one upper case character
    * At least one special character
    * At least 8 characters in the password
    * Confirm password and password input value should match
 * Unique Email id for user Validation.
 * Interactive ui for managing Task.
 * Has Components like Toggle switch, Radio buttons.
 * Allows users to create, update, and delete their tasks.
 * A user cannot view or update other users' to-do list.
 #### For storing creds, task data we have used local storage

## Steps to run the app
* ### navigat to root directory containing package.json file
* ### npm install
  * This will install all the dependencies lised in the package-lock.json file
* ### npm start
  * This wll run a dev server on loclhost on port 3000 ( default )
  
  ### Open the browser on http://localhost:3000/ to access the page
  
## Routes
* ### /
  * This redirects to the home page where user can see his/her todo list items if logged in.
* ### /login
  * This redirects to the login page where user can login using his/her credentials
* ### /signup
  * This redirects to the signup page where user can sign up using his/her credentials
  
 
