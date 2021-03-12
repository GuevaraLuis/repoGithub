const listaDuenos = document.getElementById('lista-duenos');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const dueno = document.getElementById('pais');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const cerrar = document.getElementById('cerrar');

let duenos = [
    {
     nombre: "Luis",
     apellido: "Guevara",
     pais: 'Venezuela',
     identificacion: '123456789',
    },
    {
    nombre: "Karla",
    apellido: "Zapata",
    pais: 'Venezuela',
    identificacion: '987654321',
    },
];


function listarDuenos() {
    let htmlDuenos = duenos.map((dueno, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${dueno.identificacion}</td>
        <td>${dueno.pais}</td>
        <td>${dueno.nombre}</td>
        <td>${dueno.apellido}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`).join("");
    listaDuenos.innerHTML = htmlDuenos;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value,
    };
    const accion = btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            duenos[indice.value] = datos;
            break;
        default:
            duenos.push(datos);
            break;
    }
    listarDuenos();
    resetModal();
}

function editar(index){
    return function cuandoCliqueo(){
        btnGuardar.innerHTML = 'Editar'
        const dueno = duenos[index];
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        pais.value = dueno.pais;
        identificacion.value = dueno.identificacion;
        indice.value = index;
    }
}

function resetModal() {
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    identificacion.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
    return function clickEnEliminar() {
        duenos = duenos.filter((dueno, indiceDueno)=>indiceDueno !== index);
        listarDuenos();
    }
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;