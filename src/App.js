
/***
 * local storage will store - users: [{userId, userName, password, email}], currentLoggedInUserId: userId, todoTasks: [{userId, tasks}]
 * On page load -> check for local storage and get the currentLoggedInUserId
 *      if it in not found then render the login page with signup page link on a button
 *          if user clicks on submit -> check for local storage for userName and password
 *              -> if user name and password match for a userId -> set Current Userid to found userid
 *              -> redirect user to todos page
 *              -> if user name and password does not exist in local storage
 *                  -> render an alert message saying account does not exist please signup
 *          when signup component is rendered
 *              -> when user enters email and password -> check for email if it exists in the local storage
 *              -> if it exists -> show error message -> already exists please login
 *              -> if it does not exist -> update the local storage -> set current userId to the new entry user id and redirect to todo page  
 *      if it is found then render the todo list page with tasks fetched from local storage
 * 
 * App component will not render anything
 * it will check for whether user is logged in or not
 * if logged in -> redirect to todos page
 * if not logged in -> redirect to signup page
 */
const App = () => {
  return <></>
}

export default App;
