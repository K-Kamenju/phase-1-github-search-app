// code begins here

const form = document.getElementById('github-form')
console.log(form)

form.addEventListener("submit", e => {
    e.preventDefault()
    console.log(e)
    const search = document.getElementById("search")
    console.log(search)
    fetch(`https://api.github.com/search/users?q=${search.value}`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json"   
        }
    })
    .then(res => res.json())
    .then(data => searchData(data.items))
    .catch(error => {
        alert("something wrong is going on")
        console.log(error.message)
    })
})

function searchData(users) {
    // Clear previous search results
    const userList = document.getElementById("user-list")
    userList.innerHTML = '';
  
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" />
      <h3>${user.login}</h3>
      <a href="${user.html_url}" target="_blank">View Profile</a> `

    li.querySelector("a").addEventListener("click", e => {
        e.preventDefault()
        fetch(`https://api.github.com/users/${user.login}/repos`, {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(res => res.json())
        .then(repo => display(repo))
    })

      userList.appendChild(li);
    });
  }

  function display(repo) {
    const repoList = document.getElementById("repos-list")
    repoList.innerHTML = ""

    repo.forEach(element => {
        const list = document.createElement("li")
        list.innerHTML = `<h3>${element.name}</h3>
        <p>${element.description || 'No description'}</p>
        <a href="${element.html_url}" target="_blank">View Repository</a>`
        repoList.appendChild(list)
    });
    
  }