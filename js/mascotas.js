const listaMascotas = document.getElementById('lista-mascotas');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const cerrar = document.getElementById('cerrar');

let mascostas = [
    {
     tipo: "Perro",
     nombre: "Lalo",
     dueno: 'Yuraima',
    },
    {
        tipo: "Gato",
        nombre: "Manchas",
        dueno: 'Karla',
       },
];


function listarMascotas() {
    let htmlMascotas = mascostas.map((mascota, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${mascota.tipo}</td>
        <td>${mascota.nombre}</td>
        <td>${mascota.dueno}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>
        </td>
    </tr>`).join("");
    listaMascotas.innerHTML = htmlMascotas;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(e) {
    e.preventDefault();
    const datos = {
        tipo: tipo.value,
        nombre: nombre.value,
        dueno: dueno.value,
    };
    const accion = btnGuardar.innerHTML;
    switch(accion){
        case 'Editar':
            mascostas[indice.value] = datos;
            break;
        default:
            mascostas.push(datos);
            break;
    }
    listarMascotas();
    resetModal();
}

function editar(index){
    return function cuandoCliqueo(){
        btnGuardar.innerHTML = 'Editar'
        const mascota = mascostas[index];
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        tipo.value = mascota.tipo;
        indice.value = index;
    }
}

function resetModal() {
    nombre.value = '';
    dueno.value = '';
    tipo.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear'
}

function eliminar(index) {
    return function clickEnEliminar() {
        mascostas = mascostas.filter((mascota, indiceMascota)=>indiceMascota !== index);
        listarMascotas();
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
