1. Write SPA (Single Page Application) allowing the following functionality. Note: for hiding the element you may apply the additional class “.hidden” as we did in the project Dogram
- Buttons panel with navigation to three different views (Show Persons, Add New Person, Generate Persons). 
- Application starts with the panel of three buttons as shown below
- Button ‘Show Persons’ hides views “Adding person”, “Generate Persons”, and presents table containing data about the persons. The structure of a person object is the same as in the previous homework (id, name, birthYear). You should apply the table.js file from the classwork #11
1.3. Button ‘Add Person’ hides views “Show Persons”, “Generate Persons”, and presents the same view and functional validation  as in the previous homework #10

- Button ‘Generate Persons’ hides views “Adding person”, “Show Persons”, and presents view for entering amount of the random persons.
Pressing either ‘Tab’ key or ‘Enter’ key checks if the entered string contains number in the range [1-10]. If so the entered number of the random persons is generated and person objects are pushed in the array of the persons. In the case of a generated ID value is not unique the person object should be ignored and not pushed into the array. If the entered number is wrong, the alert containing “amount of persons is wrong” should appear and the user will have to type a number again


