console.log('bbbbbb');
var p = document.createElement('div');
p.innerHTML = `
	<div class="game-play-button-container">
		<div id="MultiplayerVisitButton" placeid="192800" data-action="play" data-is-membership-level-ok="true" data-user-id="25229666" data-universe-id="47545" data-originator-type="" data-originator-id="" class="VisitButton VisitButtonPlayGLI btn-primary">
			<a class="btn-common-play-game-lg" style="background-color: #b00000;border-color: #590c0c;" id="neves768script"> 
				<span id="robloxfndr" class="icon-play-game"></span> RobloxFinder
			</a>
		</div>
	</div>
`;

var div = document.getElementsByClassName("game-details-play-button-container")[0];
div.appendChild(p);

var path = window.location.pathname.split("/")[2],
	counter = 1,
	page = 1,
	result = false,
	did = {};

function updateCounter(){
	fetch("https://www.roblox.com/games/getgameinstancesjson?placeId="+path+"&startIndex=0")
	.then(response => response.json())
	.then(parsed => {
		counter = parsed.TotalCollectionSize
		page = counter-50;
		if(page < 0) page = counter;
	});
}

function setButtonClick(func){
	document.getElementById('neves768script').innerHTML = '<span id="robloxfndr" class="icon-play-game"></span> Connect';
	document.getElementById("neves768script").setAttribute("onclick", func); 
}

function search(){
	var selected = false;
	if(result) return true;
	if(!(page in did)){
		did[page] = true;
		page--;
		if(page < 0) page = counter;
		//console.log(page);
		fetch("https://www.roblox.com/games/getgameinstancesjson?placeId="+path+"&startIndex="+page)
		.then(response => response.json())
		.then(parsed => {
			counter = parsed.TotalCollectionSize;
			if(page > counter) page = counter-50;
			if(page < 0) page = counter;
			selected = parsed.Collection[parsed.Collection.length-1];
			//console.log(page);
			//console.log(parsed);
			if(selected.CurrentPlayers.length < 2 || parsed.Collection.length < 10){
				if(!result){
					//console.log(selected.JoinScript);
					setButtonClick(selected.JoinScript);
					result = true;
				}
				return true;
			} else {
				if(parsed.Collection.length == 10){
					page += 10;
				}
			}
			return false;
		});
	}
}

function neves_OpenUp(){
	/*if(counter < 12){
		document.getElementById('neves768script').innerHTML = '<span id="robloxfndr" class="icon-play-game"></span> Server empty already...';
		return;
	}*/
	document.getElementById('neves768script').innerHTML = '<span id="robloxfndr" class="icon-play-game"></span> Finding...';
	result = false;
	var counter = 1;
	while(!result && counter < 100){
		result = search();
		counter++;
	}
}

updateCounter();
document.getElementById('neves768script').addEventListener('click', neves_OpenUp, false);
