This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run application you need json server running:

`json-server-auth -p 3500 --id id employees.json -r routes.json`

By default:

`"defaultUsers": [ { "email": "user@user.com", "password": "password" }, { "email": "admin@user.com", "password": "admin1" } ],`

1. Update subscribeEffect function in the directory util
   - Rename (by refactoring) to useSubscribeEffect. In this refactoring according to the React terminology it will become to be a custom Hook
   - Update code for setting interval only if a server doesn’t keep on a subscription connection. Let me know if the code written in the class is not clear for you. Particularly the third parameter of the method subscribe
   - Add console.log(“polling”) inside the function poller being called at each timer interval
1. Launch json-server-auth employees.json –p 3500 –r routes.json and make sure that everything works properly and the messages “polling” appear on the debugger console
1. Create new project on Firebase – project employees (access firebase console and follow the same actions we have done at the class)
1. Create new Firebase WEB application – employees-web
   - Copy the configuration that you will have to add in the Employees React application
1. In the terminal of the project EmployeesReact install rxfire and firebase by the command npm I rxfire firebase
1. In the directory config create new JS file firebase.js and paste the configuration copied in the 4.1. Assign the result of the Firebase configuration to the appFirebase variable. Don’t forget to do the required import for the firebase package. Export the appFirebase for using it from other project files
1. Create EmployeesFirebaseService.js file and write exported class with the same name. Don’t forget to do import of the appFirebase from #6
   - Write constructor for the initialization field this.collection from the parameter collection
   - Write three methods of the class
     1. getEmployees() for getting Observable containing all employees data. You should use the function collectionData from the package rxfire (Don’t forget to import it)
     1. addEmployee(employee) returning Promise object saying about either successful (for then method) or unsuccessful (for catch method) adding operation
     1. deleteEmployee(id) returning Promise object saying about either successful (for then method) or unsuccessful (for catch method) deleting operation
1. Using Firebase console, create Firestore (Database) with rules for testing saying that during 30 days everyone may read/write from/to Firestore collection with no any authentication
1. Update file App.js
   - Create object of the class EmployeesFirebaseService instead of the class EmployeesHttpService
1. Make sure that whole functionality works properly from two different clients and the poller doesn’t work (the json-server-auth should be running as for time being it provides the authentication/authorization)
