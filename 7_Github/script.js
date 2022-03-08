const API_URL = "https://api.github.com/users/";

const main = document.querySelector(".main");
const repoEL = document.querySelector("#repo");
const form = document.querySelector(".search-form");
const input = document.querySelector("#search");

async function getUser(user) {
  const resp = await fetch(API_URL + user);
  const data = await resp.json();

  createCard(data);

  getRepo(user);
}
function createCard(user) {
  const cardHtml = `
        <div class="card row">
            <div>
                <img  alt="${user.name}" src="${user.avatar_url}"></img>
            </div>
            <div class="content">
            <div class="user-content">
            <h3>${user.name}</h3>
            <p>${user.location}</p>
            <p class="bio">${user.bio}</p>

            <ul>  
                <li>${user.followers} <span>Followers</span></li>
                <li>${user.following} <span>Following</span></li>
                <li>${user.public_repos} <span>Repositries</span></li>
            </ul>
        </div>
        <div class="repos">
        
        </div>
            </div>
        </div>
    `;
  main.innerHTML = cardHtml;
}
function CheckError(resp) {
  if (resp.status >= 200 && resp.status <= 299) {
    return resp.json();
  } else {
    throw Error(resp.statusText);
  }
}
async function getRepo(user) {
  const resp = await fetch(API_URL + user + "/repos");
  const data = await CheckError(resp) ;
  repoUi(data)
}

function repoUi(repos) {
  const repoEl = document.querySelector(".repos");

  console.log(repos);
  repos
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .forEach((repo) => {
      const repoChild = document.createElement("a");
      repoChild.classList.add("btn-repo");

      repoChild.innerText = repo.name;
      repoChild.href = repo.html_url;
      repoChild.target = "_blank";
      repoEl.appendChild(repoChild);
    });
}

form.addEventListener("keyup", (e) => {
  e.preventDefault();

  const user = input.value;
  // const user = "thanhtutzaw";

  if (user) {
    getUser(user);
    // input.value= ""
  }
});
