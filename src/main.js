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


const lista = document.getElementById('nombreAlumna'); // select para elegir alumna por nombre
const btnSearch = document.getElementById('btnBuscar');// boton para buscar alumna
const inputAlumna = document.getElementById('buscarAlumna');
const tabla = document.getElementById('table');


window.fillUserList = ()=>{
  window.userData; // esto es un arreglo
  window.userData.forEach(element => {
    let optionAlumna = document.createElement('option');
    optionAlumna.text = element.name;
    lista.add(optionAlumna);
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

window.fillProgressList = ()=>{
  window.ProgressData;
  window.userData;
  let alumna = Object.entries(window.userData);
  let progreso = Object.entries(window.progressData);
  // console.log(progreso);
  for (let i in alumna) {
    let user;
    user = alumna[i];
    for (let j in progreso) {
      let progresId = progreso[i];
      if (user[i].id === progresId[0]) {
        console.log(user[i].name + ' ' + progresId[1].intro.percent);
      } 
    }
  }
};

lista.addEventListener('change', ()=>{
  let x = document.getElementById('nombreAlumna').value;
  
  tblBody = document.getElementById('tbody');
  // Crea las hileras de la tabla
  var hilera = document.createElement('tr');
  var celda = document.createElement('td');
  var textoCelda = document.createTextNode(x);
  celda.appendChild(textoCelda);
  hilera.appendChild(celda);
  tblBody.appendChild(hilera);
});
