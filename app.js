const allPlayers = () => {

    const searchValue = document.getElementById("search-box").value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;

    fetch(url)
        .then(Response => Response.json())
        .then(data => {
            console.log(data.player == null)
            if (data.player == null) {
                document.getElementById("spinner").style.display = "block";

            }
            else {
                showPlayerDetails(data.player);
                document.getElementById("spinner").style.display = "none";
            }
        });


};

const showPlayerDetails = (players) => {

    for (const player of players) {
        const parent = document.getElementById("player-container");
        const div = document.createElement("div");


        div.innerHTML = `<div class="shadow p-2 mb-3 bg-body rounded ">
          <div class="pro-pic text-center">
              <img class="w-50 rounded-circle mx-auto d-block" src="${player.strThumb}" alt="">
          </div>
          <h4 class="text-center">Name: ${player.strPlayer}</h4>
          <h6 class="text-center">Country: ${player.strNationality}</h6>
          <p></p>
          <div class="all-button text-center mb-2">
              <button class="btn btn-danger">Delete</button>
              <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
          </div>
      </div>`;
        parent.appendChild(div);
        console.log(player);
    }

};


//details player

const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => setDetails(data.players[0]));

};
const setDetails = (info) => {
    console.log(info.strGender);

    if (info.strGender == "Male") {
        document.getElementById("male").style.display = "block";
        document.getElementById("female").style.display = "none";
    } else {
        document.getElementById("male").style.display = "none";
        document.getElementById("female").style.display = "block";
    }

    document.getElementById("details-container").innerHTML = `
 <div class="shadow p-2 mb-3 bg-body rounded">
 <img src="" alt="">
 <h5 class="text-center">Name: ${info.strPlayer}</h5>
 <h5 style="font-size:14px;" class="text-center">Date of Birth: ${info.dateBorn}</h5>
  <p style="font-size:12px; text-align: justify;" class="text-center">${info.strDescriptionEN}</p>
 </div>
    `;
};