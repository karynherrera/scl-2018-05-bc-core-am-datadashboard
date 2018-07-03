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
  let objUser, objUnits, objCourses, objParts;
  let percentGral, insideUnits,insideObjParts;
  let objProgress, arrayProgress;
  
  // let userArray = Object.entries(users);
  // let progressArray = Object.entries(progress);
  for (let i = 0; i < users.length; i++) {
    let userId = users[i][1].id;
    objUser = users[i][1]; // este objeto ya se puede manipular y usar directamente llamando sus propiedades como objUser.name
    // console.log(progress[1][0]);
    // console.log(objProgress);
    
    users.forEach(property=>{ // cada element es un sub array con propiedades, entonces a c/u le creamos una propiedad nueva stats
      property.forEach(element=>{
        element.stats = { // se le crea a cada ususario una propiedad stats que es un objeto de objetos que contiene:
          exercises: {total: 0,
            completed: 0,
            percent: 0}, // objeto con 3 propiedades total, completed y percent
          reads: {total: 0,
            completed: 0,
            percent: 0}, // objeto con 3 propiedades total, completed y percent
          quizzes: {total: 0,
            completed: 0,
            percent: 0,
            scoreSum: 0}, // objeto con 5 propiedades total, completed, percent, scoreSum, scoreAvg
          scoreAvg: 0};
      });
    });// aca termina el forEach que recorre users y agrega la propiedad stats

    arrayProgress = progress[i];
    // console.log(users[i]);
    // for(let elemento of objProgress){ // esto itera por las llaves del objeto progress, muestra el id y el objeto con los cursos
    objProgress = arrayProgress[1]; // este objeto ya se puede manipular y usar directamente llamando sus propiedades como objProgress.intro y devuelve un objeto con todo lo que tiene el objeto intro
    // console.log(objProgress.intro);
    for (let x in objProgress) {
      objCourses = objProgress[x]; // acá objCourses itera sobre los cursos que tenga asignada la alumna, en este caso intro
    };
    percentGral = objCourses.percent; // almacena el porcentaje general del curso
    objUnits = objCourses.units;// accede al objeto que contiene las unidades
    // console.log(objUnits);
    insideUnits = Object.values(objUnits);
    for (let v = 0; v < insideUnits.length; v++) {
      // console.log(insideUnits[v].totalParts);// esto ya puede manipularse y entrar a las propiedades dentro de cada unidad
      objParts = insideUnits[v].parts;// acá accedemos al objeto parts
      insideObjParts =Object.values(objParts);
      //console.log(insideObjParts);
      for (let d = 0; d < insideObjParts.length; d++) {
        // console.log(insideObjParts[d]);
      }
    }
      
    
    /*
    for (let v = 0; v < objUnits.length; v++) {
      let unit = objUnits[v];
      console.log(oBJunit[v]);
    }*/
    
    // console.log('nombre:'+ objUser.name +' porcentaje curso '+objCourses.percent);
   
      
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
       
      element.stats.percent= percentUnitGral.percent; 
      });*/
  };// aqui termina el for de users.length
  // element.stats.percent = 10;
  // let user = Object.entries(usuario);
  // 
  // console.log(progress[0]);
  // return users;
  // console.log(users);
};

window.sortUsers = (users, orderBy, orderDirection) =>{
  if (orderBy === "name") { //name es el campo por el que quiere ordenarlo
    //sort es una funcion que ordena los arreglos, recibe una funcion que compara un elemento con otro
    return users.sort(function (a, b) {
      if (orderDirection == "ASC") {
        //localCompare compara 2 strings que en este caso son los nombres de las alumnas
        return a.name.localeCompare(b.name);
      } else {
        //esto mostrara el ordenamiento en orden descendente
        return a.name.localeCompare(b.name) * -1;
      }
    });
  }
  if (orderBy === "percent") {
    let result; 
    return users.sort(function (a, b) {
      if (orderDirection == "ASC") {
        return a.stats.percent - b.stats.percent;
        /*
        if(a.stats.percent > b.stats.percent){
          result= 1;
          return result; 
        } else if(a.stats.percent < b.stats.percent) {
          result= -1;
          return result; 
        } 
        */
      }else{
        return (a.stats.percent - b.stats.percent)*-1;
      }
      
    });
  }
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