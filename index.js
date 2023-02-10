const addHTML = document.querySelector('#addHTML');
const saveBtn = document.querySelector('.saveBtn').addEventListener('click', addnote);
const btnShowRef = document.querySelector('#btnShowRef').addEventListener('click', showRef);

const allNotes = [];

function addnote() {
  const note = {
    inputDate: document.querySelector('#inputDate').value,
    inputID: Date.now(),
    inputTitle: document.querySelector('#inputTitle').value,
    inputNote: document.querySelector('#inputNote').value,
  };

  if (note.inputDate === '' || note.inputTitle === '' || note.inputNote === '') {
    swal('¡ErroR!', 'Por favor, ingrese datos válidos', 'error');
    return;
  }
  allNotes.push(note);
  insertHTML(note);
  swal('¡Excelente!', 'Nota agregada exitosamente', 'success');

  const formulario = document.querySelector('#formulario');
  formulario.reset();
}

//crear html
function insertHTML({ inputDate, inputTitle, inputNote, inputID }) {
  addHTML.insertAdjacentHTML(
    'afterend',
    `<div class="noteInHTML" id='item_${inputID}'> 

          <div class='styleID'>
             <div> Fecha: ${inputDate}</div>
             <div> Título: ${inputTitle}</div>
             <div> Tarea: ${inputNote}</div> 
          </div>
          
          <div class="deleteCss">
              <button id='deleteItem'>borrar nota</button>
          </div>
      </div>`
  );

  //delete fn !
  const btnDeleteItem = document.querySelector('#deleteItem');
  btnDeleteItem.addEventListener('click', () => {
    const itemDiv = document.querySelector(`#item_${inputID}`);
    itemDiv.remove();
  });
  showLocalStorage();
}

function showLocalStorage() {
  // almacenar localStorage
  localStorage.setItem('notes', JSON.stringify(allNotes));
  // traer lo guardado en localStorage
  const localNotes = localStorage.getItem('notes');
  console.log(JSON.parse(localNotes));
}

function showRef() {
  const showRefDiv = document.querySelector('#showRef');
  if (showRefDiv.style.display === 'none') {
    showRefDiv.style.display = 'block';
  } else {
    showRefDiv.style.display = 'none';
  }
}

// api calidad del aire - (rosario)
const getApiAqi = async (lat, lon) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f96ba7a12bmsh48f2a7e08356d4ap1551eajsnea3ee61c6ab5',
      'X-RapidAPI-Host': 'air-quality.p.rapidapi.com',
    },
  };
  lat = -32.930414;
  lon = -60.650166;
  const baseUrl = 'https://air-quality.p.rapidapi.com';

  const response = await fetch(`${baseUrl}/current/airquality?lon=${lon}&lat=${lat}`, options);
  apiAqiData(response);
};

const apiAqiData = async (response) => {
  const res = await response.json();
  const aqiRosData = res.data[0].aqi;
  insertAqi(aqiRosData);
};
getApiAqi();

// insertar en html
const insertAqi = (aqiRosData) => {
  const aqiRosSpan = document.querySelector('#aqiRos');
  const aqiColor = document.querySelector('#aqiColor');
  aqiRosSpan.insertAdjacentHTML('afterend', aqiRosData);
  if (aqiRosData < 50) {
    aqiColor.style.backgroundColor = 'rgb(0, 170, 0)';
  }
  if (aqiRosData >= 51 && aqiRosData <= 100) {
    aqiColor.style.backgroundColor = 'rgb(255, 234, 0)';
  }
  if (aqiRosData >= 101 && aqiRosData <= 150) {
    aqiColor.style.backgroundColor = 'rgb(255, 123, 0)';
  }
  if (aqiRosData >= 151 && aqiRosData <= 200) {
    aqiColor.style.backgroundColor = 'red';
  }
  if (aqiRosData >= 201 && aqiRosData <= 300) {
    aqiColor.style.backgroundColor = 'purple';
  }
  if (aqiRosData >= 301) {
    aqiColor.style.backgroundColor = 'maroon';
  }
};
