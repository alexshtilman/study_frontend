This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run application you need json server running:

`json-server-auth -p 3500 --id id employees.json -r routes.json`

By default:

`"defaultUsers": [ { "email": "user@user.com", "password": "password" }, { "email": "admin@user.com", "password": "admin" } ],`

1. Update App.js
   1. Define state userData (an object containing `{username:<string>, isAdmin:<Boolean>}` and method setUserData for updating userData object through the hook useState
   1. Instead of the function getUsername that returns username as a string there should be the method getUserData that returns Observable with userData object (see 1.1)
      1. Define method getting control only at the mounting step in the useEffect for subscribing on the Observable from getUserData. Once an object with user data is received from subscribing you should call setUserData for updating the userData state
   1. Instead of the usernameUpdateFn function there should be the userDataUpdateFn function getting userData object.
      1. The function should call setUserData function passing the userData object
   1. Rendering EmployeesNav component should pass userData instead of username
   1. Update Routes
      1. Routing to Employees should be allowed only if there is userData.username
         - Rendering the Employees component should pass additional property isAdmin containing either true or false
      1. Routing to EmployeesGeneration should be allowed only if there is userData.isAdmin with value true
      1. Routing to other components except the Login component should be allowed only if there is userData.username
      1. Routing to Login component should be allowed only if there is no userData.username
      1. Rendering to Login and Logout components should pass the userDataUpdateFn instead of usernameUpdateFn
1. Update EmployeesNav component
   1. Gets userData object from a parent instead of username string
   1. Navigation item EmployeesGeneration may appear only if userData.isAdmin true
1. Update Employees component
   1. Gets isAdmin Boolean property from a parent
   1. Adding new employee may be allowed only if isAdmin is true
   1. Option of deleting employee may be allowed only if isAdmin is true
1. Update AuthHttpService
   1. Instead of the getUsername function there should be the getUserData function that returns an Observable containing either empty object ( Consider using method “of” from RxJS for returning the empty object of `({})` ) or userData object. Consider using Axios.get for getting all administrator emails from a server and conversion of Observable containing response from server to userData object
   1. Update the login method. Consider mergeMap operator inside the pipe with the method performing the following. The operator mergeMap allows doing conversion with nested map operators. Why we need it? In our case we should perform 2 requests to the server: one for getting JWT and other for getting the administrator emails. This is a case for using mergeMap operator
      - Gets JWT from the response
      - Sets JWT inside localStorage item “employees_accessToken”
      - Returns result from getUserData
1. Update Login component
   1. Gets property userDataUpdateFn instead of usernameUpdateFn
      - Subscribing on login method of the AuthService class should contain only userDataUpdateFn call with passing userData object from the subscribe (subscribe will contain userDataObject instead of JWT)
1. Update Logout component
   1. Gets property userDataUpdateFn instead of usernameUpdateFn
   1. Calls userDataUpdateFn with the empty object instead of the empty string
1. In the project ServerData
   1. Into employees.json add “administrators” field containing the array of the administrator mails. In our case only one administrator admin@tel-ran.co.il. But in any case it should be inside the array
   1. Start json-server-auth employees.json –p 3500 –r routes.jason
