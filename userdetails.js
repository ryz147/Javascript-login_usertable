

let userDetails;
//Retrive from localStorage 'savedATodo' string array and converting to object using JSON.parse()
const savedUserDetails = JSON.parse(localStorage.getItem('savedUsers'));
// in the if condition we need to check if there is a array in the savedTododFruits variable, if there is an array then use it, give the value to savedTododFruits

if (Array.isArray(savedUserDetails)) {
    userDetails = savedUserDetails;
} else {

    userDetails = [
        {
            id: 'id1',
            name: 'Riyaz',
            email: 'ryz@gmail.com',
            userName: 'ryz147',
            password: 'Admin@123',
            deleteBtn: 'button',
            editBtn: 'edit',

        },
        {
            id: 'id2',
            name: 'Mohammed',
            email: 'r1@gmail.com',
            userName: 'rz147',
            password: 'Admin@123',
            deleteBtn: 'button',
            editBtn: 'edit',

        }];
}

//on page load 
// renderTableHeaders();


//toggling between login page and user data table page
function getUserTable() {

    const table = document.getElementById('table-container');
    const signUp = document.getElementById('signUpPage');

    if (table.style.display !== 'block') {
        signUp.style.display = 'none';
        table.style.display = 'block';
        renderTableHeaders();
    } else {
        signUp.style.display = 'inline-table';
        table.style.display = 'none';
    }
};
//adding user in to userDetails array
function addUser(id, fName, email, userName, password, deleteBtn, editBtn) {
    userDetails.push({
        id: id,
        name: fName,
        email: email,
        userName: userName,
        password: password,
        deleteBtn: deleteBtn,
        editBtn: editBtn,
    })
    saveUsers();
    renderTableHeaders();
};

//creating the user
function createUser() {
    id = new Date().getTime().toString();
    fName = document.getElementById('name').value;
    email = document.getElementById('email').value;
    userName = document.getElementById('uName').value;
    password = document.getElementById('pwd').value;
    deleteBtn = 'button'
    editBtn = 'edit'

    addUser(id, fName, email, userName, password, deleteBtn, editBtn);

    //clear input fields after adding the user
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('uName').value = '';
    document.getElementById('pwd').value = '';
};


//delete user cell
function deleteUser(event) {
    dltUser = event.target.id;
    userDetails = userDetails.filter(function (userDetails) {

        if (dltUser === userDetails.id) {
            return false;
        } else {
            return true;
        }
    });
    saveUsers();
    renderTableHeaders();
};




//Edit selected User
function edtusr(evt) {
    //evt.target.parentElement.cells; will return the td cells 
    tdCells = evt.target.parentElement.cells;
    tdIdCell = evt.target.parentElement.cells.item(0)
    //here we are adding input field to each td cell
    if (evt.target.innerHTML === 'Edit User') {
        //In this HTMLCollection for TD cells i am also passing the index, so that i can ifnore the ID Cell  
        Array.from(tdCells).forEach((td, index) => {

            //here i am checking if the index is 0 then ignore it dont add input fields else it will add input element and value.
            if (index === 0) {
                console.log('ignore the td with ID')
            } else {
                const input = document.createElement('input');
                input.type = 'text';
                input.style.fontSize = '16px';
                input.style.fontFamily = 'Arial, Helvetica, sans-serif';
                tdText = td.innerHTML;
                input.value = tdText;
                td.innerHTML = '';
                td.appendChild(input);
            }

        })

        evt.target.innerHTML = 'Save User';

    }
    else {
        updateUser(evt);

    }

};


//updating the edited usage details 
function updateUser(event) {
    //get the edited user ID value to map
    let id = event.target.parentElement.cells[0].innerHTML
    //get the edited user values from input fields
    let fullName = event.target.parentElement.cells[1].lastChild.value;
    let email = event.target.parentElement.cells[2].lastChild.value;
    let userName = event.target.parentElement.cells[3].lastChild.value;
    let password = event.target.parentElement.cells[4].lastChild.value;

    //filtering userDetails array with selected/edited tr, matching id
    userDetails = userDetails.filter(function (userDetails) {

        if (id === userDetails.id) {
            userDetails.name = fullName;
            userDetails.email = email;
            userDetails.userName = userName;
            userDetails.password = password;
            saveUsers();
        } else {

            console.log('No UserID found')
        }

        return userDetails;
    })

    renderTableHeaders();
};


//storing the user Array in browser application localStorage
function saveUsers() {
    //locolstorage.setItem(key, value), here i am converting array of onject to string using JSON,stringify()  
    localStorage.setItem('savedUsers', JSON.stringify(userDetails));
};


//here we are creating the table, table headers and 'tr'
function renderTableHeaders() {
    document.getElementById('data-table').innerHTML = ' ';

    let headers = ['UserId', 'Name', 'Email', 'UserName', 'Password', 'Actions'];
    let table = document.createElement('table');
    table.setAttribute('id', 'Usertable')
    let tableRow = document.createElement('tr');

    headers.forEach(function (headerText) {
        let tableHedder = document.createElement('th');
        let textHeader = document.createTextNode(headerText);
        tableHedder.style.color = 'white';
        tableHedder.appendChild(textHeader);
        tableRow.appendChild(tableHedder);
    });
    table.appendChild(tableRow);

    createUserDataTable(table);
};


//here we are creating tr, td and adding values from userDetails Array object.
function createUserDataTable(table) {
    userDetails.forEach(function (userData) {
        let row = document.createElement('tr');

        Object.values(userData).forEach(function (text) {

            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);

            if (text === 'button') {
                const deletebtn = document.createElement('button');
                deletebtn.innerText = 'Delete User';
                deletebtn.style = 'padding: 5px 10px';
                deletebtn.style.margin = '5px';
                deletebtn.style.width = '150px';
                deletebtn.style.height = '30px';
                deletebtn.style.fontSize = '15px';
                deletebtn.id = '' + userData.id; // converting ID to string using ''+Id
                deletebtn.onclick = deleteUser;

                const btn = cell.appendChild(deletebtn);
                row.appendChild(btn);
            } else
                if (text === 'edit') {
                    const editBtn = document.createElement('button');
                    editBtn.setAttribute('class', 'editBtn');
                    editBtn.innerText = 'Edit User';
                    editBtn.style = 'padding: 5px 10px';
                    editBtn.style.margin = '5px';
                    editBtn.style.width = '150px';
                    editBtn.style.height = '30px';
                    editBtn.style.fontSize = '15px';
                    editBtn.id = '' + userData.id; // converting ID to string using ''+Id
                    editBtn.onclick = edtusr;



                    const editbtn = cell.appendChild(editBtn);
                    row.appendChild(editbtn);

                } else {
                    cell.appendChild(textNode);
                    row.appendChild(cell);
                };

        });

        table.appendChild(row);
    });
    const tablediv = document.getElementById('data-table');
    tablediv.appendChild(table);
};

