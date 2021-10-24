'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active')
}

    


// CRUD
const setLocalStorage = (db_clientes) => localStorage.setItem("db_clientes",JSON.stringify(db_clientes));
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_clientes')) ?? [];


const deleteCliente = (index) => {
    const db_clientes = getLocalStorage();
    db_clientes.splice(index,1);
    setLocalStorage(db_clientes);
}

// CRUD - UPDATE
const updateCliente = (index,cliente) => {
    const db_clientes = getLocalStorage();
    db_clientes[index] = cliente;
    setLocalStorage(db_clientes);
    
}

// CRUD - READ
const readCliente = () => getLocalStorage();

// CRUD - CREATE
const createCliente = (cliente) =>{
    const db_clientes = getLocalStorage()
    db_clientes.push(cliente);
    setLocalStorage(db_clientes);
}

const isValidFields = () =>{
    return document.getElementById('formulario').reportValidity();
}

const clearFields= () =>{
    let camposModal = document.querySelectorAll('.modal-field');
    camposModal.forEach(x => x.value = "");
}

// Interação com layout

const salvarCliente = () =>{
    if(isValidFields()){
        const cliente = {
            nome: document.getElementById('nome').value,
            senha: document.getElementById('senha').value,
            email: document.getElementById('email').value
        }
        const index = document.getElementById('formulario').dataset.index;
        
        if(index == 'new') createCliente(cliente);

        else updateCliente(index, cliente);

        updateTable();
        closeModal();
    }
}

const createRow = (cliente,index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.senha}</td>
        <td>${cliente.email}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}" >Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Deletar</button>
        </td>
    `;

    document.querySelector('#tbCliente>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tbCliente>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const db_clientes = readCliente();
    clearTable();
    document.getElementById('formulario').dataset.index = 'new';
    db_clientes.forEach(createRow);
}

const fillFields = (cliente, index) => {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('senha').value = cliente.senha;
    document.getElementById('email').value = cliente.email;
    document.getElementById('formulario').dataset.index = index;
}

const editCliente = (index) => {
    const cliente = readCliente()[index];
    fillFields(cliente, index);
    openModal();
}

const editDelete = (event) => {

    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-');

        if(action == 'edit'){
            editCliente(index);
        }
        else {
            const cliente = readCliente()[index];
            const response = confirm(`Deseja realmente excluir o cliente ${cliente.nome}?`);
            if(response){
                deleteCliente(index);
                updateTable();
            }   
        }
    }
}

updateTable();

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', salvarCliente);

document.getElementById('cancelar')
    .addEventListener('click', closeModal);

document.querySelector('#tbCliente>tbody')
    .addEventListener('click', editDelete);