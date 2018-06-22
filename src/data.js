// invocamos la data de users y creamos un arreglo con todos los usuarios
window.userData = [];
window.progressData = [];
window.cohortsData = [];


window.users = ()=>{
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
    console.log(allJson);
    window.userData = allJson[1]; // lleno la funcion global window.userData con allJson[1] que seria el arreglo de usuarios
    window.fillUserList();// cuando tenga lista la respuesta llamo a la funcion de llenado
    
    window.cohortsData = allJson[0];
    window.fillCohortList();
    allJson.forEach((jsonElement)=>{
      jsonElement.forEach((element)=>{
        
      });
    });
  }).catch((error) => {
    alert('Error', error);
  });
};

window.computeUsersStats = (users, progress, courses) => {

};

window.sortUsers = (users, orderBy, orderDirection) =>{

};

window.filterUsers = (users, filterBy) => {

};

window.processCohortData = (cohortData, orderBy, orderDirection, filterBy) => {

};