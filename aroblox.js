console.log('bbbbbb');
var p = document.createElement('div');
p.innerHTML = `
	<div class="game-play-button-container">
		<div id="MultiplayerVisitButton" placeid="192800" data-action="play" data-is-membership-level-ok="true" data-user-id="25229666" data-universe-id="47545" data-originator-type="" data-originator-id="" class="VisitButton VisitButtonPlayGLI btn-primary">
			<a class="btn-common-play-game-lg" style="background-color: #b00000;border-color: #590c0c;" id="neves768script"> 
				<span id="robloxfndr" class="icon-play-game"></span>
			</a>
		</div>
	</div>
`;

var div = document.getElementsByClassName("game-play-buttons")[0];
div.appendChild(p);

var path = window.location.pathname.split("/")[2],
	counter = 1,
	page = 1;

function updateCounter(){
	fetch("https://www.roblox.com/games/getgameinstancesjson?placeId="+path+"&startIndex=0")
	.then(response => response.json())
	.then(parsed => {
		counter = parsed.TotalCollectionSize
		page = counter-50;
		if(page < 0) page = counter;
		alert(page);
	});
}

function search(page){
	var selected = false;
	fetch("https://www.roblox.com/games/getgameinstancesjson?placeId="+path+"&startIndex="+page)
	.then(response => response.json())
	.then(parsed => {
		counter = parsed.TotalCollectionSize;
		page--;
		if(page > counter) page = counter-50;
		if(page < 0) page = counter;
		selected = parsed.Collection[parsed.Collection.length-1];
		if(selected.CurrentPlayers.length < 2){
			console.log(selected.JoinScript);
			return selected.JoinScript;
		} else {
			if(parsed.Collection.length == 10){
				page += 10;
			}
		}
		return false;
	});
}

function neves_OpenUp(){
	console.log("running");
	var result = false,
		counter = 1;
	while(!result && counter < 100){
		result = search(page);
		counter++;
	}
}

updateCounter();
document.getElementById('neves768script').addEventListener('click', neves_OpenUp, false);