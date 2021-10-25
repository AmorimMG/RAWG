// Get e Set Local Storage
const setLocalStorage = (db_usuario) => localStorage.setItem("db_usuario",JSON.stringify(db_usuario));
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_usuario')) ?? [];

// CRUD-DELETE
const deleteUsuario = (index) => {
    const db_usuarios = getLocalStorage();
    db_usuarios.splice(index,1);
    setLocalStorage(db_usuarios);

    updateTabela();
}

// CRUD - UPDATE
const updateUsuario = (index,usuario) => {
    const db_usuarios = getLocalStorage();
    db_usuarios[index] = usuario;
    setLocalStorage(db_usuarios);
    
}

// CRUD - READ
const readUsuario = () => getLocalStorage();

// CRUD - CREATE
const createUsuario = (usuario) =>{
    const db_usuarios = getLocalStorage()
    db_usuarios.push(usuario);
    setLocalStorage(db_usuarios);
}

const CreateRowCRUD = (nome,email,senha,indice) => {
    let row = document.createElement('tr');

    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${senha}</td>
        <td>
            <a type="button" class="button" data-toggle="modal" data-target="#modalEdit" onclick="CallEditUsuario(${indice})">
                <span class="material-icons-outlined">
                edit
                </span>
                </a>
            <a type="button" class="button" data-toggle="modal" data-target="#modalDelete" onclick="CallDeleteUsuario(${indice})">
                <span class="material-icons-outlined">
                delete
                </span>
            </a>
        </td>
    `;

    document.getElementById('TabelaCRUDCorpo').appendChild(row);
}

function updateTabela(){

    document.querySelector('#TabelaCRUDCorpo').innerHTML = "";

    let usuarios = getLocalStorage();

    for(let i = 0; i < usuarios.length; i++){
        CreateRowCRUD(usuarios[i].nome,usuarios[i].email,usuarios[i].senha,i)
    }
}

function CallEditUsuario(indice){

    let usuarios = getLocalStorage();
  
    document.getElementById('NomeUsuarioEdit').value = usuarios[indice].nome;
    document.getElementById('EmailEdit').value = usuarios[indice].email;
    document.getElementById('SenhaEdit').value = usuarios[indice].senha;

    document.getElementById('id-SalvarEdit').setAttribute('onclick',`GetChanges(${indice})`)
}

function GetChanges(indice){

    let usuario = {
        nome: document.getElementById('NomeUsuarioEdit').value,
        email: document.getElementById('EmailEdit').value,
        senha: document.getElementById('SenhaEdit').value
    };

    updateUsuario(indice,usuario);

    updateTabela();
}

function CallDeleteUsuario(indice){

    let usuarios = getLocalStorage();

    document.getElementById('NomeUsuarioDelete').value = usuarios[indice].nome;
    document.getElementById('EmailDelete').value = usuarios[indice].email;

    document.getElementById('DeletarUsuario').setAttribute('onclick',`deleteUsuario(${indice})`)
}



function usuarioExiste(usuario){

    const usuarios = getLocalStorage();

    let existe = false;

    for(let i = 0; i < usuarios.length; i++){
        
        if(usuarios[i].nome == usuario.nome && usuarios[i].senha == usuario.senha) existe = true;
    }

    return existe;
}

function usuarioExisteCreate(usuario){

    const usuarios = getLocalStorage();

    let existe = false;

    for(let i = 0; i < usuarios.length; i++){
        
        if(usuarios[i].nome == usuario.nome && usuarios[i].email == usuario.email) existe = true;
    }

    return existe;
}

function login(){

    let form = document.getElementById('formularioLogin');
    let parametros = [];

    for(let i = 0; i < form.length; i++){
        parametros[i] = form[i].value;
    }

    let [nome,senha] = parametros;

    let usuario = {
        nome: nome,
        senha: senha
    }

    if(usuarioExiste(usuario)){
        Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Login efetuado com sucesso',
        })

        document.getElementById('LogoutBtn').style.display = 'block';
        document.getElementById('LoginBtn').style.display = 'none';
        document.getElementById('SignUpBtn').style.display = 'none';
        document.getElementById('NomeUser').style.display = 'block';
        document.getElementById('NomeUser').innerHTML = usuario.nome;
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Parece que o usuario não existe',
        })
    }

    ClearModal('formularioLogin');
}

function logout(){
    
    document.getElementById('LogoutBtn').style.display = 'none';
    document.getElementById('LoginBtn').style.display = 'block';
    document.getElementById('SignUpBtn').style.display = 'block';
    document.getElementById('NomeUser').style.display = 'none';
    document.getElementById('NomeUser').innerHTML = '';

    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Logout efetuado com sucesso',
    })
}

function registrar(){

    let form = document.getElementById('formularioCreate');
    let parametros = [];

    for(let i = 0; i < form.length; i++){
        parametros[i] = form[i].value;
    }

    let [nome,email,senha] = parametros;

    if(nome != "" && email != "" && senha != ""){
        let usuario = {
            nome: nome,
            email: email,
            senha: senha
        }
    
        if(usuarioExisteCreate(usuario)){

            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Parece que esse usuario já existe',
            });

        }
        else{
            createUsuario(usuario);

            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Usuario criado',
            });

            updateTabela();
        }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Parece que alguns campos não foram preenchidos',
        });
    }

    ClearModal('formularioCreate');
}

function ClearModal(id){
    let form = document.getElementById(id);

    for(let i = 0; i < form.length; i++){
        form[i].value = '';
    }
}

updateTabela();