1. Update project PersonsObjects from the previous homework 
- Button ‘Add Person’ should be enabled just if there applied all following requirements. 
- Id should be unique number among existing persons in the range [100-999] 
- Birth Year should be number in the range [1920-2020]
- If any requirement isn’t applied you should call method alert containing the proper message. If id is not unique you should call the method alert(‘id isn’t unique’) .If birth year is wrong you should call the method alert(‘Birth Year value should be in the range [1920-2020]). If id is unique but has wrong value you should call the method alert(‘id value should be in the range [100-999]’) idElement and birthYearElement should have listeners on the event ‘change’. Each listener should run the following:
- idElement listener function should check id value and if it is wrong the listener function should call the proper alert; if it is right the listener function should check whether the birthYearElement.value isn’t empty string, and if so the listener function calls addButtonElement.disabled = false
- birthYearElement listener function should check birthYear value and if it is wrong the listener function should call the proper alert; if it is right the listener function should check whether the idElement.value isn’t empty string, and if so the listener function calls addButtonElement.disabled = false
- Label “List of all persons” – regular <label> element
- List of all persons should contain the <li> elements. Each <li> element should contain
-  Person data (JSON.stringify)
-  Button ‘Remove Person’
-  Pressing the button should trigger removing person (Data and View should be consistent )
-  Label “List of the oldest persons” – regular <label> element
-  List of the oldest persons should contain the <li> elements containing just person data (JSON.stringify). Note that the button ‘get persons with max age’ is taken out. The data in the list should be updated online each time a new person is added or an existing person is removed


