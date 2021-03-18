setTimeout(function() {
  let body = document.body;
  let loader = document.getElementById('loader');
  let url = window.location.toString();
  const getNameFromUrl = (url) => {
    let getUrl = url.split('=');
    let name = getUrl[1];
    if (name == undefined) {
      name = 'Roman-Babushkin';
    }
    return name;
  }
  const date = new Date();
  const getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject("Не удалось получить дату"), 100);
  })

  const getName = getNameFromUrl(url);

  const getUser = new Promise((resolve, reject) => {
    setTimeout(() => getName ? resolve(getName) : reject(alert("Имя пользователя не получено!")), 150);
  })
  Promise.all([getUser, getDate])
    .then(([getName, date]) => fetch(`https://api.github.com/users/${getName}`))
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

      let dateBlock = document.createElement('p');
      dateBlock.innerHTML = date;
      body.append(dateBlock);
      dateBlock.classList.add("date");
    })

    .catch(err => alert(err))

    .finally(loader.classList.add('done'))
}, 3000);