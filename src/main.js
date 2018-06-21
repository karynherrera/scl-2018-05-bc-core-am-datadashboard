window.onload = (() => {
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
  
  
  // declaracion del home para selecionar sede y cohort.
  const boton = document.getElementById('btn');
  const selectSedes = document.getElementById('sedes');
  const selectCohort = document.getElementById('cohort');
  
  
  // funcionalidades del boton seleccion sede y cohort
  // llamada al evento de select de Sedes para hacer dinámico el select de los cohorts (generacion)
  selectSedes.addEventListener('change', getCohort);
  selectSedes.addEventListener('change', studentsEnrollment);
  selectCohort.addEventListener('change', studentsEnrollment);
  
  selectSedes.addEventListener('change', percentage);
  selectCohort.addEventListener('change', percentage);
  
  // aca es la funcion para acceder y obtener info de la cohort o generacion
  function getCohort() {
	  if (selectSedes.value != 0) {
      const cohort = Object.keys(data[selectSedes.value]);
      const numCohort = cohort.length;
      selectCohort.length = numCohort;
  
      for (const i = 0; i < numCohort; i++) {
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
  
  const displayTotalStudents = document.getElementsByClassName('numTotal')[0];
  const displayTotalStudentsEnrolled = document.getElementsByClassName('numTotal')[1];
  const displayTotalStudentsEnrolledCourses = document.getElementsByClassName('numTotal')[2];
  const displayTotalStudentsEnrolledTask = document.getElementsByClassName('numTotal')[3];
  
  // estudiantes que alcanzaron el objetivo
  // la funcion(estudiante_que_termino) recibe 3 parametros que son : estudiantes , tipo_de_puntaje, puntos
  function studentsReachedGoal(students, scoreType, goal) {
	  const studentsScoresAverages = students.map(function(student) {
		  const sumOfSprintsScores = student.sprints.reduce(function(sum, sprint) {
        return sum + sprint.score[scoreType];
		  }, 0);
  
		  return sumOfSprintsScores / student.sprints.length;
    });
    // aca es el resultado de las estudiantes con sus promedios de puntuacion.
	  return studentsScoresAverages.filter(function(average) {
      return average >= goal;
	  }).length;
  }
  
  // estudiantes que alcanzaron todos los objetivos
  function studentsReachedGeneralGoal(students, goal) {
    const studentsScoresAverages = students.map(function(student) {
		  const sumOfSprintsScores = student.sprints.reduce(function(sum, sprint) {
        return sum + sprint.score.courses + sprint.score.task;
		  }, 0);
  
		  return sumOfSprintsScores / student.sprints.length;
    });
  
    return studentsScoresAverages.filter(function(average) {
		  return average >= goal;
    }).length;
	  }
	  // aca esta la funcion de las estudiantes efectivamente activas 
  function studentsEnrollment() {
	  const sedeAccessor = selectSedes.value;
	  const cohortBySede = data[sedeAccessor][selectCohort.value];
	  const students = cohortBySede.students;
	  const studentsActive = students.filter(function(student) {
      return student.active;
	  });
  
	  const numberOfStudents = studentsActive.length;
  
	  displayTotalStudents.innerText = numberOfStudents;
	  displayTotalStudentsEnrolled.innerText = studentsReachedGeneralGoal(studentsActive, 2100);
	  displayTotalStudentsEnrolledCourses.innerText = studentsReachedGoal(studentsActive, 'courses', 1260);
	  displayTotalStudentsEnrolledTask.innerText = studentsReachedGoal(studentsActive, 'task', 840);
  }
  
  function percentage() {
	  const sedeAccessor = selectSedes.value;
	  const cohortBySede = data[sedeAccessor][selectCohort.value];
	  const students = cohortBySede.students;
	  const totalEnrollment = students.length;
  
	  const studentsActive = document.getElementsByClassName('numTotal')[0].textContent;
	  const generalGoal = document.getElementsByClassName('numTotal')[1].textContent;
	  const coursesGoal = document.getElementsByClassName('numTotal')[2].textContent;
	  const taskGoal = document.getElementsByClassName('numTotal')[3].textContent;
  
	  const dropoutPercentage = document.getElementsByClassName('percent')[0];
	  const generalGoalPercentage = document.getElementsByClassName('percent')[2];
	  const coursesGoalPercentage = document.getElementsByClassName('percent')[4];
	  const taskGoalPercentage = document.getElementsByClassName('percent')[6];
  
	  dropoutPercentage.innerText = Math.round((studentsActive * 100) / totalEnrollment);
	  generalGoalPercentage.innerText = Math.round((generalGoal * 100) / totalEnrollment);
	  coursesGoalPercentage.innerText = Math.round((coursesGoal * 100) / totalEnrollment);
	  taskGoalPercentage.innerText = Math.round((taskGoal * 100) / totalEnrollment);
  }
}); // fin de window onload