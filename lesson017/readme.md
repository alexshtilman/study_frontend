Update HW #15

1. Application appears with the following panel of buttons that is shown constantly.
   - Pressing button “Add New Employee” triggers the existing view of the form (see HW #15) for adding new Employee object
   - Pressing button “Employees Generation triggers the following view for entering the generation data
     - Number of employees – any positive number greater than 0 and less than 100. If the entered number is wrong the alert message “Wrong number of employees” should appear
     - Number of ID digits – any positive number greater than 1 and less than 5. It defines number of digits of an Employee ID. For example, for 3 digits generated value of ID will be from 100 to 999. If the entered number is wrong the alert message “Wrong number of digits for ID” should appear
     - Minimal Salary – any positive number defining minimal possible value of the salary
     - Maximal Salary – any positive number defining maximal possible value of the salary. If minimal salary value exceeds the maximal value the alert message “Maximal value is less than minimal value” should appear
     - Button “Submit” for submitting the form
     - Button “Reset” for resetting the form
     - Pressing button “Show Employees” triggers the view of the table from the previous HW plus the column for removing
2. Update file employees.js
   - Add function removeEmployee(id) removing an employee having the specified id
3. Replace the file table.js with the one we have written at the class. You may do copy/paste but try to do it with complete understanding of each code line
4. Update file main.js for performing the following functionality
   - Adding new employee (done in the previous HW)
   - Adding random generated employees based on the entered generation data.
     - Create new file random.js with the following functions
       1. getRandomNumber(min, max) – returns a random number in the range [min, max] similar to what we have done for the previous projects
       2. getRandomElement(array) – returns random element from the array (consider applying getRandomNumber(0, array.length – 1))
       3. Showing the table of the employees (all employees regardless of a way of creation should be shown). Each the table row should contain the button “Remove” allowing removing an employee object and the appropriate row
