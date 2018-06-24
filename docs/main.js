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
  
  window.computeUsersStats(users, progress, courses);

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
    inputBuscar.value = x;
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

// mostrar resultados en display en porcentaje desempeño del alumnas en total por cohort

selectCohort.addEventListener('change', users);
selectCohort.addEventListener('change', percentage);

function getCohort() {
  if (selectUsers.value !== 0) {
    var cohort = Object.keys(data[selectUsers.value]);
    var usersCount = cohort.length;
    selectCohort.length = usersCount;

    for (var i = 0; i < usersCount; i++) {
      selectCohort.options[i].value = cohort[i];
      selectCohort.options[i].text = cohort[i];
    }
  } else {
    selectCohort.length = -1;
    selectCohort.options[0].value = '---';
    selectCohort.options[0].text = '---';
  }
  selectCohort.options[0].selected = true;
}

var displayTotalUsers = document.getElementsByClassName('usersCount')[2];
var displayTotalUsersGeneralIntro = document.getElementsByClassName('usersCount')[2];
var displayTotalUsersGeneralCompleted = document.getElementsByClassName('completed')[9];

function usersReached(users, intro, completed) {
  var users = users.map(function(id) {
    var sumOfIntroPercent = id.intro.reduce(function(sum, intro) {
      return sum + intro.percent[completed];
    }, 0);

    return sumOfSprintsScores / student.sprints.length;
  });

  return usersPercentCompleted.filter(function(completed) {
    return completed >= percent;
  }).length;
}

function usersPercentGeneral(users, percent) {
  var usersPercentCompleted = users.map(function(id) {
    var sumOfIntroPercent = id.intro.reduce(function(sum, intro) {
      return sum + intro.percent.users + intro.percent.completed;
    }, 0);

    return sumOfIntroPercent / id.intro.length;
  });

  return usersPercentCompleted.filter(function(completed) {
    return completed >= percent;
  }).length;
}


function percentage() {
  var users = cohort.users;
  var totalGeneral = users.length;

  var general = document.getElementsByClassName('usersCount')[1].textContent;
  var intro = document.getElementsByClassName('usersCount')[1].textContent;
  var unit = document.getElementsByClassName('usersCount')[3].textContent;

 
  var generalPercentage = document.getElementsByClassName('percent')[1];
  var introPercentage = document.getElementsByClassName('percent')[3];

  
  generalPercentage.innerText = Math.round((general * 100) / total);
  introPercentage.innerText = Math.round((intro * 100) / total);
  unitPercentage.innerText = Math.round((unit * 100) / total);
}
