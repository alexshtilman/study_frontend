class Table {
  constructor(keys, trHeadSelector, tbodySelector, enquireKey, removeFunction) {
    this.keys = keys;
    this.$tbodyElement = $(tbodySelector);
    this.enquireKey = enquireKey;
    this.removeFunction = removeFunction;

    const $trHeadElement = $(trHeadSelector);
    keys.forEach(function(key) {
      const $thElement = $("<th>", { text: key });
      $trHeadElement.append($thElement);
    });
    removeFunction
      ? $trHeadElement.append($("<th>", { text: "remove" }))
      : null;
  }
  addRow(obj) {
    const $trElement = $("<tr>");
    this.$tbodyElement.append($trElement);
    this.keys.forEach(function(key) {
      const $tdElement = $("<td>", { text: obj[key] });
      $trElement.append($tdElement);
    });
    if (this.removeFunction) {
      const $tdElement = $("<td>");
      const $buttonElem = $("<button>", {
        text: "remove",
        class: "btn btn-sm btn-danger"
      });
      $buttonElem.attr("data-toggle", "modal");
      $buttonElem.attr("data-target", "#modalDiv");

      $buttonElem.on(
        "click",
        function(e) {
          $("#deleteButton").on(
            "click",
            async function(e) {
              e.preventDefault();
              await this.removeFunction(obj[this.enquireKey]).then(function() {
                $trElement.remove();
                return new Promise(function(resolve) {
                  setTimeout(function() {
                    resolve("");
                  }, 1000);
                });
              });
            }.bind(this)
          );
        }.bind(this)
      );
      $tdElement.append($buttonElem);
      $trElement.append($tdElement);
    }
  }
  clear() {
    this.$tbodyElement.empty();
  }
}
