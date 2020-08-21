class Topping {
    constructor(name, preference) {
        this.name = name;
        this.preference = preference;
    }
}

class Order {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.toppings = [];
    }

    addTopping(topping) {
        this.toppings.push(new Topping(topping));
    }

    deleteTopping(topping) {
        let index = this.toppings.indexOf(topping);
        this.toppings.splice(index, 1);
    }
}

let orders = [];
let orderId = 0;

onClick('create-new-order', () => {
    orders.push(new Order(orderId++, getValue('new-order-name')))
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let orderDiv = document.getElementById('app');
    clearElement(orderDiv);
    for (order of orders) {
        let table = createOrderTable(order);
        let title = document.createElement('h2');
        title.innerHTML = `${order.name}'s Pizza`;
        title.appendChild(createDeleteOrderButton(order));
        orderDiv.appendChild(title);
        orderDiv.appendChild(table);
        for (topping of order.toppings) {
            createToppingRow(order, table, topping);
        }
    }
}

function createToppingRow(order, table, topping) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = topping.name;
    row.insertCell(1).innerHTML = topping.preference;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(order, topping));
}

function createDeleteRowButton(order, topping) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger form-control';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = order.toppings.indexOf(topping);
        order.toppings.splice(index, 1);
        drawDOM();
    }
    return btn;
}

function createDeleteOrderButton(order) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Team';
    btn.onclick = () => {
        let index = orders.indexOf(order);
        orders.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewToppingButton(order) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light form-control';
    btn.innerHTML = 'Add Topping';
    btn.onclick = () => {
        order.toppings.push(new Topping(getValue(`name-input-${order.id}`), getValue(`preference-input-${order.id}`)));
        drawDOM();
    }
    return btn;
}

function createOrderTable(order){
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped table-bordered');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let preferenceColumn = document.createElement('th');
    nameColumn.innerHTML = 'Topping';
    preferenceColumn.innerHTML = 'Preference';
    row.appendChild(nameColumn);
    row.appendChild(preferenceColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let preferenceTh = document.createElement('th');
    let createTh = document.createElement('th');

//TODO: figure out how to change these from input to select forms
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${order.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    //nameInput could have a variety of toppings to pick from ex. pepperoni, onion, mushroom, ect.

    let preferenceInput = document.createElement('input')
    preferenceInput.setAttribute('id', `preference-input-${order.id}`);
    preferenceInput.setAttribute('type', 'text');
    preferenceInput.setAttribute('class', 'form-control');
    //preferenceInput should be if they want it on the left half, the right half, or the whole pizza.

    let newToppingButton = createNewToppingButton(order);
    nameTh.appendChild(nameInput);
    preferenceTh.appendChild(preferenceInput);
    createTh.appendChild(newToppingButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(preferenceTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
