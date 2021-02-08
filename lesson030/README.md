This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run application you need json server running:

`json-server-auth -p 3500 --id id employees.json -r routes.json`

1. For step-by-step debugging of the following updates you should launch the server by command
   `json-server-auth employees.json –p 3500`
1. Write component Login getting from a parent two properties: reference to AuthService (authService) and callback function for lifting an authenticated username up (usernameUpdateFn)
   - Login component should present two input fields for inputting username/email and password. Password should be inputted using asterisks presentation instead of the plain text
   - If the login process against a Back-End server succeeds the component should lift up an authenticated username, otherwise the component should alert message about wrong credentials. The login process should be done through AuthService object
1. Write component Logout getting from a parent two properties: reference to AuthService (authService) and callback function for lifting an authenticated username up (usernameUpdateFn)
   - The component should allow the user to perform the logout action. The logout action should be done through AuthService
   - Once the logout action is performed the component should lift up the empty string as the username
1. Update EmployeesAuthService
   - In each Axios request you should add Authorization header with the structure “Bearer xxxxxx” where xxxxx – JSON WEB Token being received after successful login process
1. Update EmployeesNav component for adding item related to Logout with label containing the authenticated username. Logout item should appear only if the authenticated name is not the empty string. For adding new Login item consider the proper updating of the configuration file. The username is received as the property from a parent component
1. Update App component
   - Create AuthService object, username as a state and function for updating username
   - Update rendering EmployeesNav component for passing the username property
   - Update routes:
     1. Add two routes for Login and Logout components rendering
     1. Each route should apply the proper conditional rendering with some alternative redirection. It should be done so that all components except Login might be rendered only if there is the authenticated username. As opposite, Login component may be rendered only if there is no an authenticated username
1. Create or update file routes.json in the ServerData project. The routes.json should contain `{…”employees”: 660}` for triggering authentication of all requests `http://localhost:3500/employees/...`
1. Restart json-server. Stop running server and start it by the following command
   json-server-auth employees.json –p 3500 -r routes.json

1. Restart React application and make sure that everything works properly
