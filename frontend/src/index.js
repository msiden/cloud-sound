/* document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData,
  }).then(() => {
    window.location.reload();
  }).catch((error) => {
    console.error(error);
  });
}); */

/* fetch('http://localhost:3001/songs').then((response) => {
  response.json().then((songs) => {
    songs.forEach((song) => {
      const songElement = document.createElement('audio');
      songElement.controls = 'controls';
      songElement.src = song.url;
      document.querySelector('.songs').appendChild(songElement);
    });
  });
}).catch((error) => {
  console.error(error);
}); */


function getUser() {
  fetch('http://user_api:8080/user/{user_id}').then((response) => {
    response.json().then((users) => {
      console.log('>>>',users)
    });
  }).catch((error) => {
    console.error(error);
  }); 
}

function helloWorld() {
  console.log('hello world')
  getUser()
}

window.helloWorld = helloWorld