document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

let mobileNav = document.body.querySelectorAll('ul.sidenav li a, nav ul li a');
let mobileNav_arr = [...mobileNav];
mobileNav_arr.forEach(menu => {
  menu.addEventListener("click", function () {
    menuHref = menu.getAttribute(`href`).substr(1);
    loadPage(menuHref);
  } );
})

let homeButton = document.querySelector('.home').addEventListener("click",function (e) {
  let homeHref = e.target.getAttribute('href').substr(1);
  loadPage(homeHref);
})
const base_url = `https://private-044be-dicodingfootball.apiary-mock.com`;
async function loadPage(page) {
  try {
    let pageContent = await fetch(`../pages/${page}.html`);
    let content = await pageContent.text();
    document.body.querySelector(`.body-content`).innerHTML = content;
  } catch (error) {
    console.error('Woi', error.message);
  }
  
  if(page === `players`) {
    try {
      let response = await fetch(`${base_url}/api/v1/json/1/lookup_all_players.php?id=57`);
      let data = await response.json();
      let fc = data.player;
      fc.forEach(function (player) {
        if(player.strCutout === null) {
          player.strCutout = './placeholder.png'
        }
        document.querySelector('.player').innerHTML +=`  
        <div class="col s12 m3">
          <div class="card red accent-4">
            <div style="width: 334px,height: 250px" class="card-image">
              <img crossorigin="anonymous" src="${player.strCutout}" alt="">
              <a class="btn-floating halfway-fab waves-effect waves-light red p-${player.idPlayer}"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
              <p class="center-align">${player.strPlayer}</p>
              <p class="center-align">Nationality : ${player.strNationality}</p>
              <p class="center-align">Position : ${player.strPosition}</p>
            </div>
          </div>
        </div>`
      });
      fc.forEach(function(player){
        document.querySelector(`.p-${player.idPlayer}`).addEventListener("click", function () {
          saveForLater(player);
        })
      })
    } catch (error) {
      console.log(error.message);
    }
  }else if ( page ===`schedules`) {
    let response = await fetch(`${base_url}/api/v1/json/1/eventsnextleague.php?id=4328`);
    let data = await response.json();
    let schedule = data.events;
    schedule.forEach(function (fixture) {
      document.body.querySelector(`.schedule`).innerHTML +=`
      <div class="section">
        <h6 class="center-align">${fixture.dateEvent}</h6>
        <h5 class="center-align">${fixture.strHomeTeam} vs ${fixture.strAwayTeam}</h3>
      </div>
      `
    })
  }else if ( page === `saved`) {
    try {
      let data = await getAllData();
      data.forEach(function (player) {
        document.querySelector('.player').innerHTML +=`        <div class="col s12 m3">
        <div class="card red accent-4">
          <div style="width: 334px,height: 250px" class="card-image">
            <img src="${player.strCutout}" alt="None">
            <a class="btn-floating halfway-fab waves-effect waves-light red p-${player.idPlayer}"><i class="material-icons">remove</i></a>
          </div>
          <div class="card-content">
            <p class="center-align">${player.strPlayer}</p>
            <p class="center-align">Nationality : ${player.strNationality}</p>
            <p class="center-align">Position : ${player.strPosition}</p>
          </div>
        </div>
      </div>`
      })
      data.forEach(function (player) {
        document.querySelector(`.p-${player.idPlayer}`).addEventListener("click", function() {
          removeFromSaved(player);
        });
      })
    } catch (error) {
      console.log(error.message)
    }
  }
}

document.querySelector('.subscribe').addEventListener("click", function () {
  Notification.requestPermission();
});
