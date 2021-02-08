Add to Employees application (HW #14) the following files:

1. formhandler.js – contains class FormHandler as the exact copy of the formhandler.js of the classwork #15. But don’t do blind copy/paste. Try to do it from the scratch achiving understanding of each code line. If there are any questions related to the code you are welcome to ask
2. employees.js – contains class Employees with the following methods

   - addEmployee(employee) adds employee in the object of the structure {
     <id value - number>: {id: < id value - number>, emailAddress: <string>, name: <string>, salary:<number>, gender:<string>, title:<string>} ….

     } Returns true if added and false if an employee with the same id already exists

   - computeSalaryBudget() returns total salary value (consider using the methods Object.values(employees) and reduce for getting sum of all salary values)

3. table.js – copy/paste from previous projects containing class Table for a table presentation
4. jquery-3.4.1.min.js – copy/paste from the classwork project CoffeeOrders
5. main.js – for controlling of whole application
6. Update index.html and styles.css for getting the following look & feel. It’s implied that after pressing “Submit Button” the following should appear

   - In the case of successful adding new employee object the table should contain row with the employee data and total salary budget should be updated accordingly
   - In the case the employee with an entered ID already exists the alert message “Employee with id : <id value> already exists”
