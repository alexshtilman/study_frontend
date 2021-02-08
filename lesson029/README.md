This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

See example at : [http://alexshtilman.github.io/lesson29/](http://alexshtilman.github.io/lesson29/)

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run application you need json server running:

`json-server-auth -p 3500 --id id employees.json`

1. Update Employees application for incorporating the polling functionality and async/await promises
   1. Try to write global function for subscribing and polling data from Back-End Server. Hint: create subscriber.js file inside directory util. Write being exported function export default function subscribeEffect(service, dataFn); service – class for communicating with Back-End service, dataFn – function for retrieving the data. If you couldn’t write it, use regular copy/paste for incorporating the subscribing and polling functionality into Employees, TitleStatistics, SalaryStatistics, EmployeesSearch components
   1. Update method addEmployee for returning Promise instead of Observable (consider method toPromise())
   1. Update method deleteEmployee for returning Promise instead of Observable (consider method toPromise())
   1. Update Employees components for applying addEmployee/deleteEmployee returning Promise
   1. Update EmployeesGeneration component for applying addEmployee/deleteEmployee returning Promise with async/await keywords
      1. Write async function that in a cycle adds generated employees to Back-End server (consider await employeesService.add(…) inside try with catch)
      1. Apply .then after finishing the employees generation for alerting numbers of successful and unsuccessful add operations

There is a bug in json-server-auth working in the watch mode. To add a big number of employees you should launch json-server-auth with no parameter –w. Actually, the watching is not mandatory as for testing the polling functionality you may start two React clients.
