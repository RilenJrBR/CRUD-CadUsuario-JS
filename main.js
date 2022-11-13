'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    limparCampos()  
    document.getElementById('modal').classList.remove('active')      
}    

const tempUsuario = {
    nome: "",
    sobrenome: ""
}

const lstUsuario = () => JSON.parse(localStorage.getItem('repositoryUsuario')) ?? []
const salvaUsuario = (repositoryUsuario) => localStorage.setItem("repositoryUsuario", JSON.stringify(repositoryUsuario))

const createUsuario = (usuario) => {
    const repositoryUsuario = lstUsuario()
    repositoryUsuario.push (usuario) 
    salvaUsuario(repositoryUsuario)
}

const updateUsuario = (index, usuario) => {
    const repositoryUsuario = lstUsuario()
    repositoryUsuario[index] = usuario
    salvaUsuario(repositoryUsuario)
}

const deleteUsuario = (index) => {
    const repositoryUsuario = lstUsuario()
    repositoryUsuario.splice(index, 1)
    salvaUsuario(repositoryUsuario)
}

const validaCampos = () => {
    return document.getElementById('form').reportValidity()
}
const limparCampos = () => {
    const campos = document.querySelectorAll('.modal-field')
    campos.forEach(field => field.value = "")
}

const saveUsuario = () =>{
    if(validaCampos()){
        const usuario = {
            nome: document.getElementById('nome').value, 
            sobrenome: document.getElementById('sobrenome').value
        }
        createUsuario(usuario)    
        loadPagina()
        closeModal()
    }
}

const createRow = (usuario) =>{
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.sobrenome}</td>                    
    <td>
        <button type="button" class="button green">editar</button>
        <button type="button" class="button red">excluir</button>
    </td>
    `
    document.querySelector('#tabUsuario').appendChild(newRow)
}

const limparTabela = () =>{
    const linhas = document.querySelectorAll('#tabUsuario>tBody tr')
    linhas.forEach(linha => linha.parentNode.removeChild(linha))
}

const loadPagina = () =>{
    const repositoryUsuario = lstUsuario()
    limparTabela()
    repositoryUsuario.forEach(createRow)
}

loadPagina()

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveUsuario)