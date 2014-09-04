var MYAPP = {};
MYAPP.wvw = {
	currentWorldNumber : "",
	currentWorldColor : "", 
	wvwMatchID : "",
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
	
	//TODO: add functionality to add a scouting point on map. 
	$('#map').delegate("img", "click", function(){
		alert("CLICKED ON MAP @: " + event.pageX + ", " + event.pageY);
	});
});

//remove old map and add new one when switching maps. 
var changeMap = function (curMap){
		//var stopTimer = clearInterval(startTimer);
		//console.log("stopTimer");
		if(curMap === 'map_eternalbg'){
			$('#map').empty();	
			$('#map').append("<img src = 'img/map_eternal.png' alt = 'EBG MAP'>");
			localStorage['currentWvWMap'] = curMap;
			getAllMatchDetails(localStorage['matchID']);
			console.log('Center');
		}
		else if(curMap === 'map_borderland_red'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;		
			getAllMatchDetails(localStorage['matchID']);
			console.log("RedHome");
		}
		else if(curMap === 'map_borderland_blue'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;
			getAllMatchDetails(localStorage['matchID']);
			console.log("BlueHome");
		}
		else if(curMap === 'map_borderland_green'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;
			getAllMatchDetails(localStorage['matchID']);
			console.log("GreenHome");
		}
		else{
			alert("ERROR: INCORRECT MAP SELECTION");
		};
		console.log("Stuff changed. Reset match details.");
		$('#worldPoints').empty();
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
					MYAPP.wvw.currentWorldColor =  matches.wvw_matches[match].red_world_id;
				}
				else if(matches.wvw_matches[match].blue_world_id == curWorldNum){
					console.log(matches.wvw_matches[match].wvw_match_id);
					MYAPP.wvw.wvwMatchID =  matches.wvw_matches[match].wvw_match_id;
					MYAPP.wvw.currentWorldColor =  matches.wvw_matches[match].blue_world_id;
				}
				else if(matches.wvw_matches[match].green_world_id == curWorldNum){
					console.log(matches.wvw_matches[match].wvw_match_id);
					MYAPP.wvw.wvwMatchID =  matches.wvw_matches[match].wvw_match_id;
					MYAPP.wvw.currentWorldColor =  matches.wvw_matches[match].green_world_id;
				}
				else{
					continue;
				}
			}
			//Set wvwMatchID
			localStorage['matchID'] = MYAPP.wvw.wvwMatchID;
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
			openWvWMapWindow(function(){				
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
					alert("Please select a map!");
				}
			});
		}
	});
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
					}
				}				
			}
		}
	}
};



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
	
	getAllMatchDetails(MYAPP.wvw.wvwMatchID);
	
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

/*Object.size = function(obj){
	var size = 0, key;
	for (key in obj){
		if(obj.hasOwnProperty(key))	size++;
	}
	return size;
};*/
