const USERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users/';

const contactTemplate = document.getElementById('newContactTemplate').innerHTML;
const contactsListEl = document.getElementById('contactsList');
const nameInputEl = document.getElementById('nameInput');
const phoneInputEl = document.getElementById('phoneInput');
const emailInputEl = document.getElementById('emailInput');
const addContact = document.getElementById('addContactButton');

addContact
        .addEventListener('click', onAddContactBtnSubmit);

contactsListEl.addEventListener('click', onDeleteBtn);


let users = [];

init();


function onAddContactBtnSubmit(event) {
    event.preventDefault();
    submitForm();
}


function onDeleteBtn(event) {
    
    if (event.target.classList.contains('delete-btn')) { 
     const el = getUserId(event.target);   
    deleteUser(el)
  }
}

function getUserId(id) {
    return id.closest('.contact-item').dataset.contactId;
}

function init(){
    fetchUsers();
}


function fetchUsers(){
    fetch(USERS_URL)
        .then((resp) =>  resp.json())
        .then(setUsers)
        .then(renderList)
}

function setUsers(data) {
    return users = data;
}


function renderList(list) {
    contactsListEl.innerHTML = list.map(getItemHtml).join('');// из массива тудушек, через мар создаем массив html и делаем join
}

function getItemHtml({name, phone, email, id}) {
    return contactTemplate
      .replace('{{name}}', name)
      .replace('{{phone}}', phone)                    
      .replace('{{email}}', email)
      .replace('{{id}}', id);
}

function submitForm() {
    const newUser = getFormData()

    if (isInputValid(nameInputEl.value && phoneInputEl.value && emailInputEl.value)) {
        createUser(newUser);    }
        resetForm();

}

 function getFormData() {
        return {
            name: nameInputEl.value,
            phone: phoneInputEl.value,
            email: emailInputEl.value
        };
    }
    

 function resetForm(){
   nameInputEl.value = '';
   phoneInputEl.value = '';
   emailInputEl.value = '';
         }
        


 function isInputValid(str) {
    return str.trim() !== '';
     }


function createUser(newUser) {
    fetch(USERS_URL, {
        method: 'POST',
        body: JSON.stringify(newUser),
         headers: {
         'Content-Type' : 'application/json'
      },
        
    }).then((resp) => resp.json())
      .then(addUser)
  }
        

function addUser(user) {
    users.push(user);
    renderList(users);
}


function deleteUser(id) {
    fetch(USERS_URL + id, {
        method: 'DELETE',
        }).then(() => {
            users = users.filter((item) => (item.id !== id));
            renderList(users)
        });
      
}

