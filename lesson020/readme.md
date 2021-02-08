json-server ./persons.json --watch --id id

Try to understand each code line and after that those who have not done this HW try to write code of async/await from the scratch with full understanding of the doing. Your current HW is to repeat whatever I've shown you at the class: AJAX interface for POST and DELETE requests, json-server launching and its working with JSON Database; what happening if you try to add an order with email that already exists; what happening if you try to perform request to server but server doesn't run; what URL is, http://localhost:3000/orders - what is it. These are the questions you should understand the answers for. And if something from above doesn't come to your head, please ask Vitaly, me, others. Keep an active position for getting started with front-end and back-end communication and data processing

1. In the project AjaxAppl to add file employees.json similar to orders.json just instead of the field “orders” there should be the field “employees”
2. Start json-server for working with employees.json. The parameter –id is not required because the Employee objects have the field “id” identifying an employee. Make sure that the json-server working with orders.json has been stopped
3. Update HW #18 (Employees)
   - Rewrite file employees.js similar to the classwork #20 (orders.js)
   - All existing methods should use AJAX functionality of the library jQuery.
   - Add method getAllEmployees for getting all Employee objects
   - Update file main taking into consideration that
   - method addEmployee returns 1 if everything is OK, -1 if an URL is unavailable and -2 if the Employee object with the same id value already exists
   - Method removeEmployee returns 1 if everything is OK, -1 if an URL is unavailable
   - There should be periodic (1000 milliseconds) polling of the Employee objects from the server
   - The polling should be only in the case of “Show Employees” view is active
   - Update file table.js taking into consideration that remove a row should be performed only if the URL is available and actual removing from the server has been performed
