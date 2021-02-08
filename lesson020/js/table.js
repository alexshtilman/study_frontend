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
      $buttonElem.attr("type", "button");
      $buttonElem.attr("data-toggle", "modal");
      $buttonElem.attr("data-target", "#modalDiv");

      $buttonElem.on(
        "click",
        function(e) {
          e.preventDefault();
          $("#deleteButton").on(
            "click",
            async function(e) {
              e.preventDefault();
              try {
                const data = await this.removeFunction(obj[this.enquireKey]);
                if (data.reCode == 1) {
                  $trElement.remove();
                  $("#modalDiv").modal("hide");
                  displayAlertMessage(
                    $("#alertDiv"),
                    `person  removed successfully!`,
                    "alert-danger"
                  );
                } else {
                  displayAlertMessage(
                    $("#alertDiv"),
                    "connection lost...",
                    "alert-danger"
                  );
                }
              } catch (error) {
                displayAlertMessage($("#alertDiv"), error, "alert-danger");
              }
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
