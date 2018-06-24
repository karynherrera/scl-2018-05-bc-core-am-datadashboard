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
      
        /*
        let unidades = Object.keys(progress[i][1].intro.units);// aca accedemos a las unidades de los cursos de cada alumna
          let cursos = Object.keys(progress[i][1]); // aca accedemos a los cursos que tiene cada alumna
          let porcentajeGral = progress[i][1].intro.percent;
          let percentUnitGral;
          let percentUnits = Object.entries(progress[i][1].intro.units);
          for (let x = 0; x < percentUnits.length; x++) {
            // console.log(percentUnits[x]);
            percentUnits.forEach(unit=>{
              percentUnitGral = unit.find(element => element.percent);
              // result=unit.forEach(element => element.percent)
            });
            // console.log(percentUnits);
            // console.log(percentUnitGral);
             percentUnitGral.forEach(element =>{
                console.log(element.percent);
              });
            }
       
      element.stats.percent= percentUnitGral.percent; */
      });

   // window.buscar(users, clave, progress);
  });  
  // element.stats.percent = 10;
  // let user = Object.entries(usuario);
 // 
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
          let unidades = Object.keys(progress[i][1].intro.units);// aca accedemos a las unidades de los cursos de cada alumna
          let cursos = Object.keys(progress[i][1]); // aca accedemos a los cursos que tiene cada alumna
          let porcentajeGral = progress[i][1].intro.percent;
          let percentUnitGral;
          let percentUnits = Object.entries(progress[i][1].intro.units);
          for (let x = 0; x < percentUnits.length; x++) {
            // console.log(percentUnits[x]);
            percentUnits.forEach(unit=>{
              percentUnitGral = unit.find(element => element.percent);
              // result=unit.forEach(element => element.percent)
            });
            // console.log(percentUnits);
            // console.log(percentUnitGral);
            /* percentUnitGral.forEach(element =>{
                console.log(element.percent);
              });*/
          }
          // console.log(percentUnitGral.percent);
          // const resultado = percentUnits.find( unidad => unidad.units==='introduction');
          let result;
          // console.log(percentUnits);

          // console.log(Object.entries(percentUnits[0][1]));
          
          // console.log(result);
          // console.log((element[1].name)+' '+); 
          let celdaUnits, textoCeldaUnits, colUnits, celdaUnitsPercent;
          let hilera = document.createElement('tr');// crea la fila para la info
          for (let i = 0; i < cursos.length; i++) { 
            let celdaCurso = document.createElement('td'); // crea la celda para los cursos
            let textoCeldaCurso = document.createTextNode(cursos[i]);
            celdaCurso.appendChild(textoCeldaCurso);
 
            let celdaPercenGral = document.createElement('td');
            let textoPercenGral = document.createTextNode(porcentajeGral + '% Completado');
            celdaPercenGral.appendChild(textoPercenGral);

            colUnits = document.createElement('td');
            for (let j = 0; j < unidades.length; j++) {
              celdaUnits = document.createElement('tr');
              textoCeldaUnits = document.createTextNode(unidades[j]);
              celdaUnits.appendChild(textoCeldaUnits); 
              colUnits.appendChild(celdaUnits);
            }
            
            colUnitsPercent = document.createElement('td');
            for (let j = 0; j < unidades.length; j++) {
              celdaUnitsPercent = document.createElement('tr');
              let textoPercenUnit = document.createTextNode(percentUnitGral.percent + '% Completado');
              celdaUnitsPercent.appendChild(textoPercenUnit);
              colUnitsPercent.appendChild(celdaUnitsPercent);
            }

            hilera.appendChild(celdaCurso);
            hilera.appendChild(celdaPercenGral);
            hilera.appendChild(colUnits);
            hilera.appendChild(colUnitsPercent);
          }
          
          tblBody.appendChild(hilera);
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