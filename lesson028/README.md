This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

See example at : [http://alexshtilman.github.io/lesson28/](http://alexshtilman.github.io/lesson28/)

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To run application you need json server running:

`json-server-auth -p 3500 -w --id id employees.json`

1. Replace all classes with functions in preview home work.
1. In the view all stars should be in one line because your UX doesn't provide feeling of first and last
1. Employee should have additional field rate with possibility to set in in the EmployeeForm in the format of the asterisks
1. In the table the rate should be shown in form of the asterisks but with no possibility to update
1. Column Id may be taken out from the table
1. Column Edit (the proper icon) should be added in the table
1. Column gender may be taken out from the table
1. New component EmployeeUpdate - It should show all employee fields but only the following ones may be updated: salary, title, rate (in the format of the asterisks)
   Remarks: Read Only property doesn't imply alert (as you did) but it does "gray-out" that is disabling of clicking.
   Pressing on an asterisks revert rate including the pressed asterisk. That is if all asterisks are empty the pressing on the 5-th one does all are full and vice versa if all asterisks are full the pressing on the first does all are empty
   In the searching table the rate may present but with no possibility to update
1. Add in the table possibility of sorting and pagenation.
   Sorting (ascending descending order)may be done by any column except gender and rate.
   Pagenation should have possibility of entering a number of the records on one page
