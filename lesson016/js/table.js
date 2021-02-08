class Table {
    constructor(keys, trHeadElement, tbodyElement){
        this.keys = keys;
        this.trHeadElement = trHeadElement;
        this.tbodyElement = tbodyElement;
        keys.forEach(function(key) {
            var thElement = document.createElement('th');
            thElement.textContent = key;
            trHeadElement.appendChild(thElement);
        })
    }
    addRow(obj) {
        var trElement = document.createElement('tr');
        this.tbodyElement.appendChild(trElement);
        this.keys.forEach(function(key){
            var tdElement = document.createElement('td');
            tdElement.textContent = obj[key];
            trElement.appendChild(tdElement);
        }.bind(this))//binding with this reference that isn't mandatory in the case
    }
    clear() {
        while(this.tbodyElement.hasChildNodes()) {
            this.tbodyElement.lastChild.remove();
        }

    }
}
