var MYAPP = {};
MYAPP.wvw = {
	currentWorldNumber : "",
	currentWorldColor : "", 
	enemy1Color : "",
	enemy2Color : "", 
	wvwMatchID : "",
	mouseClickX : "",
	mouseClickY : "", 
	objectiveTypes : {
		1: "Keep",
		2: "Keep",
		3: "Keep",
		4: "Camp",
		5: "Camp",
		6: "Camp",
		7: "Camp",
		8: "Camp",
		9: "Castle",
		10: "Camp",
		11: "Tower",
		12: "Tower",
		13: "Tower",
		14: "Tower",
		15: "Tower",
		16: "Tower",
		17: "Tower",
		18: "Tower",
		19: "Tower",
		20: "Tower",
		21: "Tower",
		22: "Tower",
		23: "Keep",
		24: "Camp",
		25: "Tower",
		26: "Tower",
		27: "Keep",
		28: "Tower",
		29: "Camp",
		30: "Tower",
		31: "Keep",
		32: "Keep",
		33: "Keep",
		34: "Camp",
		35: "Tower",
		36: "Tower",
		37: "Keep",
		38: "Tower",
		39: "Camp",
		40: "Tower",
		41: "Keep",
		42: "Tower",
		43: "Camp",
		44: "Keep",
		45: "Tower",
		46: "Keep",
		47: "Tower",
		48: "Camp",
		49: "Camp",
		50: "Camp",
		51: "Camp",
		52: "Camp",
		53: "Camp",
		54: "Camp",
		55: "Camp",
		56: "Camp",
		57: "Tower",
		58: "Camp",
		59: "Camp",
		60: "Camp",
		61: "Camp",
		62: "Temple_of_Lost_Prayers",
		63: "Battles_Hollow",
		64: "Bauers_Estate",
		65: "Orchard_Overlook",
		66: "Carvers_Ascent",
		67: "Carvers_Ascent",
		68: "Orchard_Overlook",
		69: "Bauers_Estate",
		70: "Battles_Hollow",
		71: "Temple_of_Lost_Prayers",
		72: "Carvers_Ascent",
		73: "Orchard_Overlook",
		74: "Bauers_Estate",
		75: "Battles_Hollow",
		76: "Temple_of_Lost_Prayers"
	},
	worldIDs : {
	1008 : 'Jade Quarry',
	2006 : 'Underworld',
	1023 : "Devona's Rest",
	2105 : 'Arborstone',
	1014 : 'Crystal Desert',
	1022 : 'Kaineng',
	2001 : 'Fissure of Woe',
	1001 : 'Anvil Rock',
	2003 : 'Gandara',
	1003 : "Yak's Bend",
	2007 : 'Far Shiverpeaks',
	1011 : 'Stormbluff Isle',
	2013 : 'Aurora Glade',
	1016 : 'Sea of Sorrows',
	2005 : 'Ring of Fire',
	2012 : 'Piken Square',
	1012 : 'Darkhaven',
	1005 : 'Maguuma',
	2204 : "Abaddon's Mouth",
	2203 : 'Elona Reach',
	2010 : "Seafarer's Rest",
	2104 : 'Vizunah Square',
	2207 : 'Dzagonur',
	2009 : 'Ruins of Surmia',
	1002 : 'Borlis Pass',
	2002 : 'Desolation',
	1010 : 'Ehmry Bay',
	1024 : 'Eredon Terrace',
	1004 : 'Henge of Denravi',
	1007 : 'Gate of Madness',
	2205 : 'Drakkar Lake',
	2008 : 'Whiteside Ridge',
	1017 : 'Tarnished Coast',
	2101 : 'Jade Sea',
	1013 : 'Sanctum of Rall',
	2014 : "Gunnar's Hold",
	1021 : 'Dragonbrand',
	2301 : 'Baruch Bay',
	2102 : 'Fort Ranik',
	2103 : 'Augury Rock',
	2201 : 'Kodash',
	2202 : 'Riverside',
	2206 : "Miller's Sound",
	1018 : 'Northern Shiverpeaks',
	1015 : 'Isle of Janthir',
	2004 : 'Blacktide',
	1006 : "Sorrow's Furnace",
	2011 : 'Vabbi',
	1009 : 'Fort Aspenwood',
	1020 : "Ferguson's Crossing",
	1019 : 'Blackgate'
	}
};



$(document).ready(function(){
	//List the worlds so you can choose your home world. 
	var worldList = getAllWorlds();
	for(world in worldList){
		$("#gw2_world_list").append("<option value = " + getSpecificWorldNumber(worldList[world]) + ">" 
			+ worldList[world] + "</option>");
	}
	//Do stuff when you change maps on the WVW Map Screen
	$('#map_list').on('change',  function(){        
		var curMap = $(this).val();
		localStorage['currentWvWMap'] = curMap;
		changeMap(curMap);
	});
	
	//TODO: add functionality of being able to set the upgrades for the objectives
	$('#worldPoints').delegate(".icon_img", "click", function(){
		alert("CLICKED ON ICON: " + $(this).closest('div').attr('id'));
	});
	
	//calls the mapClick function which will place a scout selector on the map wher eyou clicked.
	$('#map').delegate("img", "click", function(e){
		var offset = $(this).offset()
		MYAPP.wvw.mouseClickX = e.pageX;
		MYAPP.wvw.mouseClickY = e.pageY;
		
		console.log("CLICKED ON MAP @: " + MYAPP.wvw.mouseClickX + ", " + MYAPP.wvw.mouseClickY);

		mapClick("img\/scout.png", MYAPP.wvw.mouseClickX-18, MYAPP.wvw.mouseClickY-18);
	});
	
	//removes a scout icon when you click on it
	//useful if your map is getting cluttered. 
	$('#scoutPoints').delegate("div", "click", function(){
		$(this).remove();
	});
	
	//hids the scout selector when you click on it. 
	$('#centerSelector').delegate('a', "click", function(){
		//TODO: change this next line to jQuery, make sure it completes before closing. 
		document.querySelector('.circle').classList.toggle('open');
		$("#circular-menu").attr("class", "hidden");
	});
	
});

//remove old map and add new one when switching maps. 
var changeMap = function (curMap){
		
		if(curMap === 'map_eternalbg'){
			$('#map').empty();	
			$('#map').append("<img src = 'img/map_eternal.png' alt = 'EBG MAP'>");
			localStorage['currentWvWMap'] = curMap;
			$('#worldPoints').empty();
			$('#scoutPoints').empty();
			getAllMatchDetails(localStorage['matchID']);
			console.log('Center');
		}
		else if(curMap === 'map_borderland_red'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;		
			$('#worldPoints').empty();
			$('#scoutPoints').empty();
			getAllMatchDetails(localStorage['matchID']);
			console.log("RedHome");
		}
		else if(curMap === 'map_borderland_blue'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;
			$('#worldPoints').empty();
			$('#scoutPoints').empty();
			getAllMatchDetails(localStorage['matchID']);
			console.log("BlueHome");
		}
		else if(curMap === 'map_borderland_green'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;
			$('#worldPoints').empty();
			$('#scoutPoints').empty();
			getAllMatchDetails(localStorage['matchID']);
			console.log("GreenHome");
		}
		else{
			alert("ERROR: INCORRECT MAP SELECTION");
		};
		console.log("Stuff changed. Reset match details.");
		//Sets the interval in which getAllMatchDetails updates in miliseconds.
		//Set to 5 seconds for now. 
		var	startTimer = setInterval(function(){getAllMatchDetails(localStorage['matchID'])}, 5000);
		
};

//Get world names from worldIDs object. 
var getAllWorlds = function(){
	
	var worldNames = [];
	var worldIDs = MYAPP.wvw.worldIDs;
	for(var key in worldIDs){
		if(worldIDs.hasOwnProperty(key)){
			worldNames.push(worldIDs[key]);
		}
	}
	return(worldNames);
	
};

//return the world number associated with the given world name to populate the html. 
var getSpecificWorldNumber = function(worldName){
	var worldIDs = MYAPP.wvw.worldIDs;
	for (var worldNum in worldIDs){
		if(worldIDs.hasOwnProperty(worldNum) && worldName === worldIDs[worldNum]){
			return worldNum;
		}
	}
	
};

//get the world number associated with the user selected world. 
//Send the world number to local storage to be used in the WvWMapWindow
var getCurrentWorldNumber = function(){
	var selectedWorld = $("#gw2_world_list option:selected").text();
	console.log("Selected World: " + selectedWorld);
	
	MYAPP.wvw.currentWorldNumber = getSpecificWorldNumber(selectedWorld);
	localStorage['worldNumber'] = MYAPP.wvw.currentWorldNumber;
	
};

//gets a list of all the current matches, and finds the one that corresponds with the selected world.
//sets the world color and match id to MYAPP global variables, and sets the matchID to local storage. 
var getWvWMatchIDandWorldColor = function(curWorldNum){
		$.ajax({
			async : false,
			url : 'https://api.guildwars2.com/v1/wvw/matches.json', 
			success : function(matches){
			for(match in matches.wvw_matches){
				if(matches.wvw_matches[match].red_world_id == curWorldNum){
					console.log(matches.wvw_matches[match].wvw_match_id);
					MYAPP.wvw.wvwMatchID =  matches.wvw_matches[match].wvw_match_id;
					MYAPP.wvw.currentWorldColor =  "red";
					MYAPP.wvw.enemy1Color =  "green";
					MYAPP.wvw.enemy2Color =  "blue";
				}
				else if(matches.wvw_matches[match].blue_world_id == curWorldNum){
					console.log(matches.wvw_matches[match].wvw_match_id);
					MYAPP.wvw.wvwMatchID =  matches.wvw_matches[match].wvw_match_id;
					MYAPP.wvw.currentWorldColor =  "blue";
					MYAPP.wvw.enemy1Color =  "red";
					MYAPP.wvw.enemy2Color =  "green";				
				}
				else if(matches.wvw_matches[match].green_world_id == curWorldNum){
					console.log(matches.wvw_matches[match].wvw_match_id);
					MYAPP.wvw.wvwMatchID =  matches.wvw_matches[match].wvw_match_id;
					MYAPP.wvw.currentWorldColor =  "green";
					MYAPP.wvw.enemy1Color =  "blue";
					MYAPP.wvw.enemy2Color =  "red";				
				}
				else{
					continue;
				}
			}
			//Set wvwMatchID
			localStorage['matchID'] = MYAPP.wvw.wvwMatchID;
			localStorage['worldColor'] = MYAPP.wvw.currentWorldColor;
			localStorage['e1Color'] = MYAPP.wvw.enemy1Color;
			localStorage['e2Color'] = MYAPP.wvw.enemy2Color;
			
		}
	});
};


//Calls the gw2 API to get the current match details corresponding to the given match ID. 
//Calls the populatePoints function based on the current map. On first load of openWvWMapWindow, no map is selected.
//Right now on first load, an alert pops up, saying to select a map. **May change this later**
var getAllMatchDetails = function(matchID){
	$.ajax({
		async : false,
		url : "https://api.guildwars2.com/v1/wvw/match_details.json?match_id=" + matchID,
		success :  function(currentMatch){
						
				if(typeof localStorage['currentWvWMap'] === "undefined"){
					localStorage['currentWvWMap'] = '';
				}
				
				var curMap = localStorage['currentWvWMap'];
				
				//Find current map and begin to populate points. 
				if(curMap === 'map_borderland_red'){
					$('#close_onmap').css('left', '625px');
					populatePoints(currentMatch, "RedHome");
				}
				else if(curMap === 'map_borderland_blue'){
					$('#close_onmap').css('left', '625px');

					populatePoints(currentMatch, "BlueHome");
				}
				else if(curMap === 'map_borderland_green'){
					$('#close_onmap').css('left', '625px');
					populatePoints(currentMatch, "GreenHome");
				}
				else if(curMap === 'map_eternalbg'){
					$('#close_onmap').css('left', '700px');
					populatePoints(currentMatch, "Center");
				}
				else{
					console.log("No map selected");
				}
		}
	});
	console.log("All match details");
};

//iterate through the currentMatch data and find the correct map type. 
//Needs the current match id, and which wvw map is selected. 
var populatePoints = function(currentMatch, mapType){
	for(map in currentMatch.maps){
		if(currentMatch.maps[map].type === mapType){
			
			//POPULATE CURRENT MAP
			for(obj in currentMatch.maps[map].objectives){
				//console.log("ID: " + currentMatch.maps[map].objectives[obj].id + " Owner: " + currentMatch.maps[map].objectives[obj].owner);
					var objectiveNo = currentMatch.maps[map].objectives[obj].id;
					var objectiveColor = currentMatch.maps[map].objectives[obj].owner;
					var currentElement = "objectiveNo" + objectiveNo;
				//add the points on first iteration and map switch
				if(document.getElementById(currentElement) === null){
					appendHTML(objectiveColor, objectiveNo);
				}else{
					//if the image has changed, add the new point and start the RI countdown. 
					if(document.getElementById(currentElement).childNodes[0].getAttribute('id') !== objectiveNo+""+objectiveColor){
						console.log(document.getElementById(currentElement).childNodes[0].getAttribute('id') + " : " + objectiveNo+""+objectiveColor);
						$('#'+currentElement).remove();
						appendHTML(objectiveColor, objectiveNo);
						//TODO: create RI countdown method. 
						riCountdownTimer(currentElement);
					}
				}				
			}
		}
	}
};


//places a scout selector where you click on the map. 
var mapClick = function(img, xCord, yCord){
	var curColor = localStorage['worldColor']; 
	console.log(img + ' placed at:' + xCord + ',' + yCord);
	//$('#scoutPoints').append('<div class = "scoutImg" style = "top:' + yCord + 'px; left:' + xCord + 'px; position: absolute;"><img src = "' +img+ '"></div>');
	placeSelector(xCord, yCord, curColor);
	
	console.log("My Color: " + curColor);
};

//when the map is clicked, unhides the a scout selector and moves it to where you clicked.
//changes context depending on what your world color is. 
var placeSelector = function(xCord, yCord, curColor){
	$("#circular-menu").css("top", yCord);
	$("#circular-menu").css("left", xCord);
	$("#circular-menu").attr("class", "visible");
	var items = document.querySelectorAll('.circle a');
	
	switch(curColor){
		case "red" : 
			$("#circular-menu").css("color", "#B11313");
			$('#enemy1').css("color", "#4689BD");
			$('#enemy2').css("color", "#36945F");
			break;
		case "blue" : 
			$("#circular-menu").css("color", "#4689BD");
			$('#enemy1').css("color", "#B11313");
			$('#enemy2').css("color", "#36945F");
			break;
		case "green" : 
			$("#circular-menu").css("color", "#36945F");
			$('#enemy1').css("color", "#4689BD");
			$('#enemy2').css("color", "#B11313");
			break;	
		default:
			break;
	};
	for(var i = 0, l = items.length; i < l; i++) {
	  items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	  
	  items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
	}

	/*document.querySelector('.menu-button').onclick = function(e) {
		e.preventDefault(); 
		document.querySelector('.circle').classList.toggle('open');
	}*/
		
		document.querySelector('.circle').classList.toggle('open');//open circle when created. 

};

//places a given image at the last place the mouse was clicked on the map. 
//TODO: need to set a timer on the scout points to remove them automatically
var placeScoutPointE1 = function(){
	xCord = MYAPP.wvw.mouseClickX-18;
	yCord = MYAPP.wvw.mouseClickY-18;
	var enemyColor = localStorage['e1Color'];
	console.log("Color: " + enemyColor);
	var img = "img\/scout.png";
	$('#scoutPoints').append('<div class = "scoutImg" id = "enemy1' + enemyColor + '" style = "top:' + yCord 
		+ 'px; left:' + xCord + 'px; position: absolute;"><img src = "' +img+ '"></div>');
	$('.circle').toggleClass('open');
	$("#circular-menu").attr("class", "hidden");
	
};

var placeScoutPointE2 = function(){
	xCord = MYAPP.wvw.mouseClickX-18;
	yCord = MYAPP.wvw.mouseClickY-18;
	var enemyColor = localStorage['e2Color'];
	console.log("Color: " + enemyColor);
	var img = "img\/scout.png";
	$('#scoutPoints').append('<div class = "scoutImg" id = "enemy1' + enemyColor + '" style = "top:' + yCord 
		+ 'px; left:' + xCord + 'px; position: absolute;"><img src = "' +img+ '"></div>');
	$('.circle').toggleClass('open');
	$("#circular-menu").attr("class", "hidden");
	
};

var placeWaypoint = function(){
	xCord = MYAPP.wvw.mouseClickX-18;
	yCord = MYAPP.wvw.mouseClickY-18;
	$('#scoutPoints').append('<div class = "scoutImg" style = "top:' + yCord + 'px; left:' + xCord 
	+ 'px; position: absolute;"><a href="#" class="waypoint fa fa-asterisk" onclick = "return false;"></a></div>');
	
	
	$('.circle').toggleClass('open');
	$("#circular-menu").attr("class", "hidden");
	
};

var centerClick = function(){
	$('.circle').toggleClass('open');
	$("#circular-menu").attr("class", "hidden");
};

//Starts the countdown when an objective is flipped
//Appends the coundown box, then starts counting down from 5 minutes. 
var riCountdownTimer = function(element){
	var minutes = 5;
	var seconds = minutes * 60;
	$('#' + element).append('<div id="' + element + 'countdown" style="background:rgba(75, 75, 75, 0.75); color:#FFFFFF"></div>');
	var startCountdown = setInterval(function(){ 
		seconds -= 1;
		minutes = seconds/60;
		formattedSeconds = seconds%60;
		if(formattedSeconds < 10){formattedSeconds = "0" + formattedSeconds;}
		$('#' + element + 'countdown').empty();
		$('#' + element + 'countdown').append(Math.floor(minutes) + ":" + formattedSeconds);
	}, 1000);
	
	var stopCountdown = setTimeout(function(){
		clearInterval(startCountdown);
		$('#' + element + 'countdown').remove();

	}, 300000)
};

//Adds the correct objective icons and colors. 
var appendHTML = function(objColor, objId){
	if(objId < 62){			 
		$('#worldPoints').append('<div id ="objectiveNo' + objId
		+ '" class = "icon"><img src = "img/'+ MYAPP.wvw.objectiveTypes[objId]
		+'.' + objColor + '.png" id="'+ objId + objColor + '" class="icon_img"></div>');
	}else{//This also makes it so these points are not clickable to set upgrades. The class is different. 
		$('#worldPoints').append('<div id ="objectiveNo' + objId 
		+ '" class = "icon"><img src = "img/'+ MYAPP.wvw.objectiveTypes[objId]
		+'.' + objColor + '.png" id="'+ objId + objColor + '" class="icon_img_small"></div>');
	}
};

//First function called in App. 
//Function is called when user has selected a world. 
var selectWorld = function(){

	localStorage.removeItem('currentWvWMap');
	getCurrentWorldNumber();
	console.log("Current World Number: " + MYAPP.wvw.currentWorldNumber);
	
	getWvWMatchIDandWorldColor(MYAPP.wvw.currentWorldNumber);
	console.log(MYAPP.wvw.wvwMatchID);
	console.log(MYAPP.wvw.currentWorldColor);
	
	openWvWMapWindow();

	getAllMatchDetails(localStorage['matchID']);
	
};

var dragResize = function(edge){
	overwolf.windows.getCurrentWindow(function(result){
		if (result.status=="success"){
			overwolf.windows.dragResize(result.window.id, edge);
		};
	});
};

//Allows you to drag the window around. 
//Currently set to the top banner of both windows. 
var dragMove = function(){
	overwolf.windows.getCurrentWindow(function(result){
		if (result.status=="success"){
			overwolf.windows.dragMove(result.window.id);
		};
	});
};

var closeWindow = function(){
	overwolf.windows.getCurrentWindow(function(result){
		if (result.status=="success"){
			overwolf.windows.close(result.window.id);
		};
	});
};

var minimizeWindow = function(){
	overwolf.windows.getCurrentWindow(function(result){
		if (result.status=="success"){
			overwolf.windows.minimize(result.window.id);
		};
	});
};

//Opens the wvwMapWindow once a server has been selected. 
var openWvWMapWindow = function(callback){
	overwolf.windows.obtainDeclaredWindow("WvWMapWindow", function(result){
			if (result.status == "success"){
				overwolf.windows.restore(result.window.id, function(result){
						console.log(result);
						if(callback && typeof(callback) === 'function'){
							callback();
						}
				});
			}
			else{
				alert("Map failed to load");
			}
		});
	
};
