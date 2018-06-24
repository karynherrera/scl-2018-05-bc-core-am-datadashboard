window.onload = (()=>{
  window.datas();
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

const formBuscar = document.getElementById('formBuscar');

const lista = document.getElementById('nombreAlumna'); // select para elegir alumna por nombre
const btnSearch = document.getElementById('btnBuscar');// boton para buscar alumna


formBuscar.addEventListener('focus', function(event) {
  event.preventDefault();
});

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
  });
};


window.fillProgressList = ()=>{
  let users = Object.entries(window.userData);
  let progress = Object.entries(window.progressData);
  let courses = Object.entries(window.cohortsData);
  

  const inputBuscar = document.getElementById('buscarAlumna');
  inputBuscar.addEventListener('change', ()=> {
    window.limpiarTabla();

  });

  btnSearch.addEventListener('click', ()=> {
    const clave = document.getElementById('buscarAlumna').value;
    window.buscar(users, clave, progress);

    // tabla.removeChild(tblBody);
  });

  lista.addEventListener('change', ()=>{
    window.limpiarTabla();
    const x = document.getElementById('nombreAlumna').value;
    window.buscar(users, x, progress);
    inputBuscar.value= x;
  });
  // window.computeUsersStats(users, progress, courses);
  // console.log(result);
  /*
  for (let i in alumna) {
    let user;
    user = alumna[i];
    for (let j in progreso) {
      let progresId = progreso[i];
      if (user[i].id === progresId[0]) {
        console.log(user[i].name + ' ' + progresId[1].intro.percent);
      } 
    }

    for (let i =0; i< alumna.length; i++) {
    usersObject = alumna[i];
  }
  let users =  usersObject[1];
  for (let x in progreso) {
    progresObject = progreso[x];
  }
  let progress = progresObject[1];
  }*/
};


