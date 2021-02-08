1. Update Homework #11
- Panel buttons, inputs and information that constantly should be at top of a screen
2. Three buttons from the previous Homework. The new ones as follows
- Filter By Age – open filtering view described below in 1.6
- Sort By – regular label
- Input element of <select> with 4 possible values: Unsorted, ID, Name, Birth Year
3. Update “Show Persons” view – including sorting logic with additional variable var sortMode = ‘Unsorted’
-   If sortMode value equals <select> element value the table of persons should be presented with no additional sort
- If sortMode value doesn’t equals <select> element value the sortMode value is assigned to <select> element value and if value is not “Unsorted” the proper sorting should be performed. For example, sortMode value is “Unsorted” and <select> element value is “Name”. In this example, sortMode will be set to “Name” (sortMode = selectElement.value) and the array of persons will be sorted according to alphabet order of the person names 
4. Update “Add Person” 
- View is not updated. It means that presenting persons data in the <ol> elements may or may not be sorted according to the sortMode. However, the adding new person into the array of persons should be updated. You should find index where the person will be inserted according to the sortMode and insert the person at that index. Note: the <select> element value is NOT considered in this functionality. 
5. Update “Generate Persons”
- View is not updated. A generated person should be inserted at an proper index according to the sortMode value (see 1.4.1)
6. Filter By Age button should trigger the following view 
-  “enter Birth Year from” – input element for entering Birth Year from value
- “enter Birth Year to” – input element for entering Birth Year to value. 
-   Button “Filter” triggers functionality of filtering and presenting person’s data according to the entered Birth Year values. In the case if “to” value less than “from” value the alert “Birth Year from should be less or equal Birth Year to” should appear
- Table of the person’s data should present all persons with the birthYear values according to the entered range. Persons should be presented in the order according to the <select> element value. The value of the sortMode is NOT considered
