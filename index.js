/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
TODO:
- add an edit button so that the order's name can be changed (write a function and place it in drawDOM)
- (optional) Tweek Table Layout

completed:
- css styling
- changing text-input to selection-forms
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

//The Topping class contructs objects for a pizza's toppings.
class Topping {
    constructor(name, preference) {
        this.name = name;
        this.preference = preference;
    }
}


//The Order class contructs the order for the customer's pizza. (only one pizza for order so far)
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


//this is the array that contains the order's data:
let orders = [];
let orderId = 0;

//onClick takes an element from the orders array and then draws it to the DOM;
onClick('create-new-order', () => {
    orders.push(new Order(orderId++, getValue('new-order-name')))
    drawDOM();  
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

//getValue takes gets the value of an element passed in from the orders array:
function getValue(id) {
    return document.getElementById(id).value;
}


//drawDOM finds the Div in index.html and appends the table(see createOrderTable 129) for a customer's order:
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

//createToppingRow adds the toppings that the User choses to the order's table:
function createToppingRow(order, table, topping) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = topping.name;
    row.insertCell(1).innerHTML = topping.preference;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(order, topping));
}


//createDeleteRowButton makes the button to delete toppings formt he customer's pizza:
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

//createDeleteOrderButton makes the delete button for the entire order:
function createDeleteOrderButton(order) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.innerHTML = 'Delete Order';
    btn.onclick = () => {
        let index = orders.indexOf(order);
        orders.splice(index, 1);
        drawDOM();
    };
    return btn;
}

//createEditOrderButton could possibly go here?


//createNewToppingButton makes a button in the table that submits the User's input:
function createNewToppingButton(order) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-light form-control';
    btn.innerHTML = 'Add Topping';
    btn.onclick = () => {
        order.toppings.push(new Topping(getValue(`name-input-${order.id}`), getValue(`preference-input-${order.id}`))); //This line gets the value from the createOrderTable (currently lines 144-162)
        drawDOM();
    }
    return btn;
}


//createOrderTable makes the HTML for the customer order:
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

    //nameInput makes a selection box for the avaiable toppings:
    let nameInput = document.createElement('select');
    nameInput.setAttribute('id', `name-input-${order.id}`);
    nameInput.setAttribute('class', 'form-control');

    let optionPepperoni = document.createElement('option');
    optionPepperoni.innerHTML = "Pepperoni";
    nameInput.appendChild(optionPepperoni);

    let optionSausage = document.createElement('option');
    optionSausage.innerHTML = "Sausage";
    nameInput.appendChild(optionSausage);

    let optionOnion = document.createElement('option');
    optionOnion.innerHTML = "Onion";
    nameInput.appendChild(optionOnion);

    let optionOlives = document.createElement('option');
    optionOlives.innerHTML = "Olives";
    nameInput.appendChild(optionOlives);

    let optionBellPepper = document.createElement('option');
    optionBellPepper.innerHTML = "Bell Pepper";
    nameInput.appendChild(optionBellPepper);

    let optionJalapeno = document.createElement('option');
    optionJalapeno.innerHTML = "Jalapeño";
    nameInput.appendChild(optionJalapeno);

    let optionMushroom = document.createElement('option');
    optionMushroom.innerHTML = "Mushroom";
    nameInput.appendChild(optionMushroom);


    //preferenceInput makes a selection box for the topping preference:
    let preferenceInput = document.createElement('select')
    preferenceInput.setAttribute('id', `preference-input-${order.id}`);
    preferenceInput.setAttribute('class', 'form-control');

    let prefWholeZa = document.createElement('option');
    prefWholeZa.innerHTML = "Whole Pizza";
    preferenceInput.appendChild(prefWholeZa);

    let prefLeftHalf = document.createElement('option');
    prefLeftHalf.innerHTML = "Left Half";
    preferenceInput.appendChild(prefLeftHalf);

    let prefRightHalf = document.createElement('option');
    prefRightHalf.innerHTML = "Right Half";
    preferenceInput.appendChild(prefRightHalf);

    let newToppingButton = createNewToppingButton(order);
    nameTh.appendChild(nameInput);
    preferenceTh.appendChild(preferenceInput);
    createTh.appendChild(newToppingButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(preferenceTh);
    formRow.appendChild(createTh);
    return table;
}

//clearElement is a function used in the drawDOM function to clear out the html file's Div when a change is made to the DOM:
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
