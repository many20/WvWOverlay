var worldIDs = {
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
};


var MYAPP = {};
MYAPP.wvw = {
	currentWorldNumber : "",
	currentWorldColor : "", 
	wvwMatchID : "",
};


$(document).ready(function(){
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
});

var changeMap = function (curMap){
		//need to get current world, current match. 

		if(curMap === 'map_eternalbg'){
			console.log("TEST: APPENDING EBG MAP");
			$('#map').empty();	
			$('#map').append("<img src = 'img/map_eternal.png' alt = 'EBG MAP'>");
			localStorage['currentWvWMap'] = curMap;
			console.log('Center');
		}
		else if(curMap === 'map_borderland_red'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;
			console.log("RedHome");
		}
		else if(curMap === 'map_borderland_blue'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;
			console.log("BlueHome");
		}
		else if(curMap === 'map_borderland_green'){
			$('#map').empty();
			$('#map').append("<img src = 'img/map_borderland.png' alt = 'Borderland Map'>");
			localStorage['currentWvWMap'] = curMap;
			console.log("GreenHome");
		}
		else{
			alert("ERROR: INCORRECT MAP SELECTION");
		};
		console.log("Stuff changed. Reset match details.");
		
		getAllMatchDetails(localStorage['matchID']);
};
var getAllWorlds = function(){
	
	var worldNames = [];
	for(var key in worldIDs){
		if(worldIDs.hasOwnProperty(key)){
			worldNames.push(worldIDs[key]);
		}
	}
	return(worldNames);
	
};

var getAllWorldNumbers = function(){
	var worldNumbers = [];
	for (var worldNum in worldIDs){
		if(worldIDs.hasOwnProperty(worldNum)){
			worldNumbers.push(worldIDs.worldNum);
		}
	}
	return(worldNumbers);
};

var getSpecificWorldNumber = function(worldName){
	for (var worldNum in worldIDs){
		if(worldIDs.hasOwnProperty(worldNum) && worldName === worldIDs[worldNum]){
			return worldNum;
		}
	}
	
};

var getCurrentWorldNumber = function(){
	var selectedWorld = $("#gw2_world_list option:selected").text();
	console.log("Selected World: " + selectedWorld);
	
	MYAPP.wvw.currentWorldNumber = getSpecificWorldNumber(selectedWorld);
	localStorage['worldNumber'] = MYAPP.wvw.currentWorldNumber;
	
};

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
			console.log("Set wvwMatchID");
			localStorage['matchID'] = MYAPP.wvw.wvwMatchID;
		}
	});
};

var getAllMatchDetails = function(matchID){
	$.ajax({
		async : false,
		url : "https://api.guildwars2.com/v1/wvw/match_details.json?match_id=" + matchID,
		success :  function(currentMatch){
			console.log("WvW Scores: " + currentMatch.scores + "<br/>");		
			//$("#testSpace").append("WvW Scores: " + currentMatch.scores + "<br/>");
			openWvWMapWindow(function(){
				console.log("Map Opened");	
				console.log("Setting curMap to the Current Map: " + localStorage['currentWvWMap']);
				
				if(typeof localStorage['currentWvWMap'] === "undefined"){
					localStorage['currentWvWMap'] = '';
				}
				
				var curMap = localStorage['currentWvWMap'];
				console.log("DEBUG WHAT IS LOCALSAVED MAP: " + localStorage['currentWvWMap']);
				console.log("DEBUG WHAT IS CURRENT MAP: " + curMap);
				
				console.log('Current Map: ' + curMap);
				//Find current map and begin to populate points. 
				if(curMap === 'map_borderland_red'){
					console.log("SearchingFor map type");
					populatePoints(currentMatch, "RedHome");
				}
				else if(curMap === 'map_borderland_blue'){
					console.log("SearchingFor map type");
					populatePoints(currentMatch, "BlueHome");
				}
				else if(curMap === 'map_borderland_green'){
					console.log("SearchingFor map type");
					populatePoints(currentMatch, "GreenHome");
				}
				else if(curMap === 'map_eternalbg'){
					console.log("SearchingFor map type");
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
var populatePoints = function(currentMatch, mapType){
	for(map in currentMatch.maps){
		if(currentMatch.maps[map].type === mapType){
			console.log(currentMatch.maps[map].objectives[0]);
			
			if(mapType === "Center"){
				//POPULATE ETERNAL BATTLEGROUND MAP
				$('#worldPoints').empty();
				for(obj in currentMatch.maps[map].objectives){
					console.log("ID: " + currentMatch.maps[map].objectives[obj].id + " Owner: " + currentMatch.maps[map].objectives[obj].owner);
					$('#worldPoints').append('<div id ="objectiveNo' + currentMatch.maps[map].objectives[obj].id + '" class = "icon"><img src = "img/castle.' + currentMatch.maps[map].objectives[obj].owner + '.png" class="icon_img"></div>');
				}
			}
			else if(mapType === "RedHome"){
			//POPULATE RED BORDERLANDS
				$('#worldPoints').empty();
				for(obj in currentMatch.maps[map].objectives){
					console.log("ID: " + currentMatch.maps[map].objectives[obj].id + " Owner: " + currentMatch.maps[map].objectives[obj].owner);
					$('#worldPoints').append('<div id ="objectiveNo' + currentMatch.maps[map].objectives[obj].id + '" class = "icon"><img src = "img/castle.' + currentMatch.maps[map].objectives[obj].owner + '.png" class="icon_img"></div>');				
				}	
			}
			else if(mapType === "BlueHome"){
				$('#worldPoints').empty();
				//POPULATE BLUE BORDERLANDS
				for(obj in currentMatch.maps[map].objectives){
					console.log("ID: " + currentMatch.maps[map].objectives[obj].id + " Owner: " + currentMatch.maps[map].objectives[obj].owner);
					$('#worldPoints').append('<div id ="objectiveNo' + currentMatch.maps[map].objectives[obj].id + '" class = "icon"><img src = "img/castle.' + currentMatch.maps[map].objectives[obj].owner + '.png" class="icon_img"></div>');
				}	
			}
			else if(mapType === "GreenHome"){
				//POPULATE GREEN BORDERLANDS
				$('#worldPoints').empty();
				for(obj in currentMatch.maps[map].objectives){
					console.log("ID: " + currentMatch.maps[map].objectives[obj].id + " Owner: " + currentMatch.maps[map].objectives[obj].owner);
					$('#worldPoints').append('<div id ="objectiveNo' + currentMatch.maps[map].objectives[obj].id + '" class = "icon"><img src = "img/castle.' + currentMatch.maps[map].objectives[obj].owner + '.png" class="icon_img"></div>');
				}	
			}
			else{
				console.log("ERROR: NO MAP SELECTED");
				alert("Error: Incorrect map type selected in populatePoints");
			}

		}
	}
};
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

Object.size = function(obj){
	var size = 0, key;
	for (key in obj){
		if(obj.hasOwnProperty(key))	size++;
	}
	return size;
};
