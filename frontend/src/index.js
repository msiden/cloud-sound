
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
  let newUserId = parseInt(document.getElementById("userId").value);
  let content

  fetch(`http://localhost:8080/new_user?user_id=${newUserId}`, {method: 'POST'}).then((response) => {
    response.json().then((result) => {
      if (result === 200) {
        content = document.createTextNode('User created');
      } else {
        content = document.createTextNode('User already exists');
      }
      const nameDiv = document.createElement('div');
      nameDiv.appendChild(content);
      document.querySelector('.user').appendChild(nameDiv);
    })
  });
}

let userForm = document.getElementById("newUserId");
userForm.addEventListener('submit', createUser);
