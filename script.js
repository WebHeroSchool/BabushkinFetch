let body = document.body;
let url = window.location.toString();

const getNameFromUrl = (url) => {
  let getUrl = url.split('=');
  let name = getUrl[1]; 
  if(name == undefined) {
  name = 'Roman-Babushkin';
  }
return name;
}

fetch(`https://api.github.com/users/${getNameFromUrl(url)}`)
    .then(res => res.json())
    .then(json => {
        let photo = new Image();
        photo.src = json.avatar_url;
        body.append(photo);
        photo.classList.add("photo");
        let name = document.createElement('p');
        if (json.name != null) {
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(name);
        name.classList.add("name")
        name.addEventListener("click", () => window.location = json.html_url);

        let bio = document.createElement('p');
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(bio);
        bio.classList.add("bio")
    })
    .catch(err => alert('Информация о пользователе недоступна'));