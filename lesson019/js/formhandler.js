class FormHandler {
  constructor(selector) {
    this.$formElement = $(selector);
    if (!this.$formElement.length)
      throw new Error(`Selector ${selector} not found`);
  }
  addHandler(validateFunction) {
    this.$formElement.on(
      "submit",
      function(e) {
        e.preventDefault();
        const objDataArray = this.$formElement.serializeArray();
        const objData = objDataArray.reduce(function(accumulator, currentObj) {
          accumulator[currentObj.name] = currentObj.value;
          return accumulator;
        }, {});
        validateFunction(objData).then(function(message) {
          message ? null : e.target.reset();
        });
      }.bind(this)
    );
  }
}
