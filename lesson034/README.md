This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run application you need json server running:

By default:

`"defaultUsers": [ { "email": "user@user.com", "password": "password" }, { "email": "admin@user.com", "password": "admin1" } ],`

1. Incorporate react-redux into the Employees application
   1. Create new directory store with three JS files
      1. actions.js with two exported functions:
         - actionUserData – takes userData object and returns an object describing action of setting userData
         - actionEmployees – takes employees array and return an object describing action of setting employees
      1. reducers.js with two reducers for the actions described in 1.1.1 and exported combined reducer as a result of the combineReducers function call
         - combineReducers is the function imported from the redux it takes object containing two fields referencing to the appropriate reducers and returns one combined reducer
      1. common.js with the constants that are used in the actions.js and reducers.js files
   1. Update index.js file
      1. Create global store by using the createStore redux function, taking the combined reducer from the reducers.js file
      1. Apply the react-redux component Provider that takes parameter store created in 1.2.1. App component should be nested inside the Provider component to get global store seen from all other components of the application
   1. Update App.js
      1. Remove updateUserDataFn
      1. Remove all unneeded code
      1. Get userData as a result of useSelector for userData reducer
      1. Get dispatch as a result of useDispatch
      1. In useEffect to run subscribing on getting userData from authService and employees from employeesService
         - To run dispatching on the appropriate actions inside the appropriate subscribe functionality (dispatch(actionUserData(userData) and dispatch(actionEmployees(employees)
      1. It should pass employeesService object only into Employees and EmployeesGeneration components
      1. It shouldn’t pass userData into EmployeesNav component
      1. It shouldn’t pass isAdmin into Employees component
      1. It shouldn’t pass userDataUpdateFn into Login and Logout components
   1. Update Employees and EmployeesTable
      1. Replace custom hook call for subscribing with the appropriate useSelector
      1. Get userData as a result of appropriate useSelector and update the code using isAdmin checking
   1. Update EmployeesSearch, TitleStatistics ans SalaryStatistics
      1. Replace custom hook call for subscribing with the appropriate useSelector
