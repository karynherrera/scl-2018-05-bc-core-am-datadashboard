window.onload = (()=>{
  window.users();
  // Declaracion de botones del menú del sidebar y secciones a donde mostraran
  const btnHome = document.getElementById('btnHome');
  const seccionHome = document.getElementById('home');

  const btnAlumna = document.getElementById('btnAlumnas');
  const seccionAlumna = document.getElementById('datosAlumnas');

  const btnCohort = document.getElementById('btnCohorts');
  const seccionCohort = document.getElementById('datosCohortsAll');

  // funcionalidad botones del menú del sidebar

  btnHome.addEventListener('click', function(event) {
    event.preventDefault();
    seccionAlumna.style.display = 'none';
    seccionCohort.style.display = 'none';
    return seccionHome.style.display = 'block';
  });

  btnAlumna.addEventListener('click', function(event) {
    event.preventDefault();
    seccionHome.style.display = 'none';
    seccionCohort.style.display = 'none';
    return seccionAlumna.style.display = 'block';
  });

  btnCohort.addEventListener('click', function(event) {
    event.preventDefault();
    seccionAlumna.style.display = 'none';
    seccionHome.style.display = 'none';

    return seccionCohort.style.display = 'block';
  });
}); // fin de window onload

// Haciendo conexion a JSON Users para mostrar el listado de todas las alumnas

const lista = document.getElementById('nombreAlumna'); // select para elegir alumna por nombre
const btnSearch = document.getElementById('btnBuscar');// boton para buscar alumna
const inputAlumna = document.getElementById('buscarAlumna');


window.fillUserList = ()=>{
  window.userData; // esto es un arreglo
  window.userData.forEach(element => {
    let option = document.createElement('option');
    option.text = element.name;
    lista.add(option);
  });  
};

// haciendo conexxion al JSON carga toda la lista del cohort y se puede seleccionar una opcion
const selectCohort = document.getElementById('selectCohort');
window.fillCohortList = ()=>{
  window.cohortsData.forEach(element =>{
    let optionNode = document.createElement('option');
    optionNode.text = element.id;
    selectCohort.appendChild(optionNode);
    console.log('Option > ' + optionNode);
  });
};







const boton = document.getElementById('btn');
