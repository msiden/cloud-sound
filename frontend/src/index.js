// document.querySelector('uploadForm').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const formData = new FormData(e.target);
//   fetch('http://localhost:8080/upload', {
//     method: 'POST',
//     body: formData,
//   }).then(() => {
//     // window.location.reload();
//     console.log('>>')
//     alert('hej')
//   }).catch((error) => {
//     console.error(error);
//   });
// });

fetch('http://localhost:8080/sounds').then((response) => {
  response.json().then((songs) => {
    songs.forEach((song) => {
      const parentDiv = document.createElement('div');

      const nameDiv = document.createElement('div');
      const name = document.createTextNode(`Name: ${song.name}`);
      nameDiv.appendChild(name);
      parentDiv.appendChild(nameDiv)

      const dateDiv = document.createElement('div');
      const date = document.createTextNode(`Date: ${song.created_at}`);
      dateDiv.appendChild(date);
      parentDiv.appendChild(dateDiv)


      const userDiv = document.createElement('div');
      const user = document.createTextNode(`User: ${song.created_by}`);
      userDiv.appendChild(user);
      parentDiv.appendChild(userDiv)

      const idDiv = document.createElement('div');
      const id = document.createTextNode(`Id: ${song.id}`);
      idDiv.appendChild(id);
      parentDiv.appendChild(idDiv)

      document.querySelector('.songs').appendChild(parentDiv);
    });
  });
}).catch((error) => {
  console.error(error);
});

function createUser(event) {
  event.preventDefault();
  var newUserId = document.getElementById("userId").value;

  fetch(`http://localhost:8080/new_user?user_id=${newUserId}`, {method: 'POST'}).then((response) => {
    let content
    if (response.status === 200) {
      content = document.createTextNode('User created');
    } else {
      content = document.createTextNode('User already exists');
    }

    const nameDiv = document.createElement('div');
    nameDiv.appendChild(content);
    document.querySelector('.user').appendChild(nameDiv);
  }).catch((error) => {
    console.error('>>>>', error);
  });
}

function uploadFile(event) {
  event.preventDefault();
  console.log('>>>>')
}

let userForm = document.getElementById("newUserId");
userForm.addEventListener('submit', createUser);

// let uploadForm = document.getElementById("upload");
// uploadForm.addEventListener('submit', uploadFile);
// window.createUser = createUser
