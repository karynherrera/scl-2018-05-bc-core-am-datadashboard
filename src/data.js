// invocamos la data de users y creamos un arreglo con todos los usuarios
window.userData = [];
window.progressData = [];
window.cohortsData = [];


window.datas = ()=>{
  Promise.all([
    fetch('/data/cohorts.json'),
    fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json'),
    fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
  ]).then((responses) => {
    return Promise.all(
      responses.map(
        (response) => {
          return response.json();
        }
      )
    );
  }).then((allJson) => {// allJson es el arreglo que contiene todas las respuestas de los 2 primeros json cohort y users
    window.userData = allJson[1]; // lleno la funcion global window.userData con allJson[1] que es el arreglo de usuarios
    window.fillUserList();// cuando tenga lista la respuesta llamo a la funcion de llenado
    
    window.cohortsData = allJson[0];// la posicion 0 de alljason tiene el arreglo con datos de los cohorts
    window.fillCohortList();

    window.progressData = allJson[2];
    window.fillProgressList();

    allJson.forEach((jsonElement)=>{
      jsonElement.forEach((element)=>{
        
      });
    });
  }).catch((error) => {
    
  });
};

window.computeUsersStats = (users, progress, courses) => {
  let usuario;
  let result;
  

  usuario = users.forEach(element=>{ 
    element.forEach(property=>{ // cada element es un sub array con propiedades, entonces a c/u le creamos una propiedad nueva stats
      property.stats = { // se le crea una propiedad stats que es un objeto de objetos que contiene:
        exercises: {}, // objeto con 3 propiedades total, completed y percent
        reads: {}, // objeto con 3 propiedades total, completed y percent
        quizzes: {}, // objeto con 5 propiedades total, completed, percent, scoreSum, scoreAvg
        percent: 0};// numero entre 0 y 100 que indica el porcentaje de completitud del usuario respecto a todos los cursos de su cohort
    });
  });  
  // element.stats.percent = 10;
  // let user = Object.entries(usuario);
 
  // console.log(progress[0]);
};

window.sortUsers = (users, orderBy, orderDirection) =>{

};

window.filterUsers = (users, filterBy) => {

};

window.processCohortData = (cohortData, orderBy, orderDirection, filterBy) => {

};

window.buscar = (users, clave, progress) =>{
  const tabla = document.getElementById('table');
  const tblBody = document.createElement('tbody');
  tblBody.setAttribute('id', 'tbody');
  users.forEach(element=>{
    if (clave === element[1].name) {
      for (let i in progress) {
        if (element[1].id === progress[i][0]) {
          // console.log(progress[i][1].intro.units);
          let unidades = Object.keys(progress[i][1].intro.units);
          let cursos = Object.keys(progress[i][1].intro.units);
          console.log(cursos);
          // console.log((element[1].name)+' '+); 
          for (let i = 0; i < cursos.length; i++) {
            let hilera = document.createElement('tr');
            let celda = document.createElement('td');
            let textoCelda = document.createTextNode(cursos[i]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            
            tblBody.appendChild(hilera);
          }
          tabla.appendChild(tblBody);
        }// cierre del segundo if

        // console.log(progress[i][0]);
      } // cierre del for que recorre progress
    }
  });// fin del foreach que recorre users
};// fin funcion buscar

window.limpiarTabla = () =>{
  const tblBody = document.getElementById('tbody');
  if (tblBody !== null) {
    let parent = tblBody.parentElement;
    parent.removeChild(tblBody);
  } 
};