var MYAPP = {};
MYAPP.wvw = {
    currentWorldNumber: "",
    enemy1Number: "",
    enemy2Number: "",
    currentWorldColor: "",
    enemy1Color: "",
    enemy2Color: "",
    wvwMatchID: "",
    mouseClickX: "",
    mouseClickY: "",
    channelId: "",
    serverId: "",
    redName: "",
    blueName: "",
    greenName: "",
    objectiveTypes: {
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
    worldIDs: {
        1008: 'Jade Quarry',
        2006: 'Underworld',
        1023: "Devona's Rest",
        2105: 'Arborstone',
        1014: 'Crystal Desert',
        1022: 'Kaineng',
        2001: 'Fissure of Woe',
        1001: 'Anvil Rock',
        2003: 'Gandara',
        1003: "Yak's Bend",
        2007: 'Far Shiverpeaks',
        1011: 'Stormbluff Isle',
        2013: 'Aurora Glade',
        1016: 'Sea of Sorrows',
        2005: 'Ring of Fire',
        2012: 'Piken Square',
        1012: 'Darkhaven',
        1005: 'Maguuma',
        2204: "Abaddon's Mouth",
        2203: 'Elona Reach',
        2010: "Seafarer's Rest",
        2104: 'Vizunah Square',
        2207: 'Dzagonur',
        2009: 'Ruins of Surmia',
        1002: 'Borlis Pass',
        2002: 'Desolation',
        1010: 'Ehmry Bay',
        1024: 'Eredon Terrace',
        1004: 'Henge of Denravi',
        1007: 'Gate of Madness',
        2205: 'Drakkar Lake',
        2008: 'Whiteside Ridge',
        1017: 'Tarnished Coast',
        2101: 'Jade Sea',
        1013: 'Sanctum of Rall',
        2014: "Gunnar's Hold",
        1021: 'Dragonbrand',
        2301: 'Baruch Bay',
        2102: 'Fort Ranik',
        2103: 'Augury Rock',
        2201: 'Kodash',
        2202: 'Riverside',
        2206: "Miller's Sound",
        1018: 'Northern Shiverpeaks',
        1015: 'Isle of Janthir',
        2004: 'Blacktide',
        1006: "Sorrow's Furnace",
        2011: 'Vabbi',
        1009: 'Fort Aspenwood',
        1020: "Ferguson's Crossing",
        1019: 'Blackgate'
    }
};



$(document).ready(function () {
    //List the worlds so you can choose your home world. 
    var worldList = getAllWorlds();
    for (world in worldList) {
        $("#gw2_world_list").append("<option value = " + getSpecificWorldNumber(worldList[world]) + ">" + worldList[world] + "</option>");
    }

    //get wvw data only on the map view
    if ($("#gw2_world_list").length == 0 && localStorage['worldNumber'] != null) {
        console.log("worldNumber: " + localStorage['worldNumber']);
        MYAPP.wvw.currentWorldNumber = localStorage['worldNumber'];
        getWvWMatchIDandWorldColor(localStorage['worldNumber']);
    }

    //Do stuff when you change maps on the WVW Map Screen
    $('#map_list').on('change', function () {
        var curMap = $(this).val();
        localStorage['currentWvWMap'] = curMap;
        $("#welcomeMessage").attr("class", "hidden");
        $("#optionsContainer").toggleClass("hidden");
        changeMap(curMap);
    });

    //TODO: add functionality of being able to set the upgrades for the objectives
    // $('#worldPoints').delegate(".icon_img", "click", function(){

    //TODO: These are pulling ###px, need to remove the px part. 
    // var xOffset = $(this).closest('div').css('left');
    // var yOffset = $(this).closest('div').css('top');


    // MYAPP.wvw.mouseClickX = parseInt(xOffset.slice(0,3));
    // MYAPP.wvw.mouseClickY = parseInt(yOffset.slice(0,3));

    // console.log('Coordinates: ' + MYAPP.wvw.mouseClickX + " " + MYAPP.wvw.mouseClickY);
    // objClick(MYAPP.wvw.mouseClickX+16, MYAPP.wvw.mouseClickY+16);
    // });

    //calls the mapClick function which will place a scout selector on the map wher eyou clicked.
    $('#map').delegate("img", "click", function (e) {
        var offset = $(this).offset()
        MYAPP.wvw.mouseClickX = e.pageX;
        MYAPP.wvw.mouseClickY = e.pageY;

        console.log("CLICKED ON MAP @: " + MYAPP.wvw.mouseClickX + ", " + MYAPP.wvw.mouseClickY);

        mapClick("img\/scout.png", MYAPP.wvw.mouseClickX - 18, MYAPP.wvw.mouseClickY - 18);
    });

    //removes a scout icon when you click on it
    //useful if your map is getting cluttered. 
    $('#scoutPoints').delegate("div", "click", function () {
        $(this).remove();
    });

    //hids the scout selector when you click on it. 
    $('#centerSelector').delegate('a', "click", function () {
        //TODO: circle toggles before closing. 
        //document.querySelector('.circle').classList.toggle('open');
        $('.circle').toggleClass('open');
        $("#circular-menu").attr("class", "hidden");
    });

    $('#options').delegate('img', "click", function () {
        //$("#optionsContainer").toggleClass("hidden");
        restoreWindow('ServerSelect');
        return false;
    });

    $('#map_eternalbg_btn').delegate('img', "click", function () {
        $("#welcomeMessage").attr("class", "hidden");
        localStorage['currentWvWMap'] = 'map_eternalbg';
        changeMap('map_eternalbg');
    });

    $('#map_borderland_red_btn').delegate('img', "click", function () {
        $("#welcomeMessage").attr("class", "hidden");
        localStorage['currentWvWMap'] = 'map_borderland_red';
        changeMap('map_borderland_red');
    });

    $('#map_borderland_blue_btn').delegate('img', "click", function () {
        $("#welcomeMessage").attr("class", "hidden");
        localStorage['currentWvWMap'] = 'map_borderland_blue';
        changeMap('map_borderland_blue');
    });

    $('#map_borderland_green_btn').delegate('img', "click", function () {
        $("#welcomeMessage").attr("class", "hidden");
        localStorage['currentWvWMap'] = 'map_borderland_green';
        changeMap('map_borderland_green');
    });

});

//remove old map and add new one when switching maps. 
var changeMap = function (curMap) {

    if (curMap === 'map_eternalbg') {
        $('#map').empty();
        $('#map').append("<img src = 'img/map_eternal2.png' alt = 'EBG MAP'>");
        localStorage['currentWvWMap'] = curMap;
        $('#worldPoints').empty();
        $('#scoutPoints').empty();
        getAllMatchDetails(localStorage['matchID']);
        mapHeader('Center');
    } else if (curMap === 'map_borderland_red') {
        $('#map').empty();
        $('#map').append("<img src = 'img/map_borderland2.png' alt = 'Borderland Map'>");
        localStorage['currentWvWMap'] = curMap;
        $('#worldPoints').empty();
        $('#scoutPoints').empty();
        getAllMatchDetails(localStorage['matchID']);
        mapHeader("RedHome");
    } else if (curMap === 'map_borderland_blue') {
        $('#map').empty();
        $('#map').append("<img src = 'img/map_borderland2.png' alt = 'Borderland Map'>");
        localStorage['currentWvWMap'] = curMap;
        $('#worldPoints').empty();
        $('#scoutPoints').empty();
        getAllMatchDetails(localStorage['matchID']);
        mapHeader("BlueHome");
    } else if (curMap === 'map_borderland_green') {
        $('#map').empty();
        $('#map').append("<img src = 'img/map_borderland2.png' alt = 'Borderland Map'>");
        localStorage['currentWvWMap'] = curMap;
        $('#worldPoints').empty();
        $('#scoutPoints').empty();
        getAllMatchDetails(localStorage['matchID']);
        mapHeader("GreenHome");
    } else {
        alert("ERROR: INCORRECT MAP SELECTION");
    };
    console.log("Stuff changed. Reset match details.");
    //Sets the interval in which getAllMatchDetails updates in miliseconds.
    //Set to 5 seconds for now. 
    var startTimer = setInterval(function () {
        getAllMatchDetails(localStorage['matchID'])
    }, 5000);

};

var mapHeader = function (map) {
    MYAPP.wvw.worlds = localStorage['worlds'];
    if (map === "RedHome") {

        var worldName = getSpecificWorldName(localStorage['rname']);

        $("#header h1").html(worldName + " Borderlands");

    } else if (map === "GreenHome") {

        var worldName = getSpecificWorldName(localStorage['gname']);

        $("#header h1").html(worldName + " Borderlands");
    } else if (map === "BlueHome") {

        var worldName = getSpecificWorldName(localStorage['bname']);

        $("#header h1").html(worldName + " Borderlands");
    } else {
        $("#header h1").html("Eternal Battlegrounds");
    }
};

//Get world names from worldIDs object. 
var getAllWorlds = function () {

    var worldNames = [];
    var worldIDs = MYAPP.wvw.worldIDs;
    for (var key in worldIDs) {
        if (worldIDs.hasOwnProperty(key)) {
            worldNames.push(worldIDs[key]);
        }
    }
    return (worldNames);

};

//return the world number associated with the given world name to populate the html. 
var getSpecificWorldNumber = function (worldName) {
    var worldIDs = MYAPP.wvw.worldIDs;
    for (var worldNum in worldIDs) {
        if (worldIDs.hasOwnProperty(worldNum) && worldName === worldIDs[worldNum]) {
            return worldNum;
        }
    }

};

//get the world number associated with the user selected world. 
//Send the world number to local storage to be used in the WvWMapWindow
var getCurrentWorldNumber = function () {
    var selectedWorld = $("#gw2_world_list option:selected").text();
    console.log("Selected World: " + selectedWorld);

    MYAPP.wvw.currentWorldNumber = getSpecificWorldNumber(selectedWorld);
    localStorage['worldNumber'] = MYAPP.wvw.currentWorldNumber;

};

//gets the world name associated with the given world number
//used to populate the names on the hovers. 
var getSpecificWorldName = function (worldNum) {
    var worldIDs = MYAPP.wvw.worldIDs;
    for (var curNumber in worldIDs) {
        if (worldIDs.hasOwnProperty(curNumber) && worldNum === curNumber) {
            return worldIDs[curNumber];
        }
    }
};

//gets a list of all the current matches, and finds the one that corresponds with the selected world.
//sets the world color and match id to MYAPP global variables, and sets the matchID to local storage. 
var getWvWMatchIDandWorldColor = function (curWorldNum) {
    $.ajax({
        async: false,
        url: 'https://api.guildwars2.com/v1/wvw/matches.json',
        success: function (matches) {
            for (match in matches.wvw_matches) {
                //TODO: REFACTOR RED GREEN AND BLUE NAME VARIABLES. Very messy but running out of time ugh...
                if (matches.wvw_matches[match].red_world_id == curWorldNum) {
                    console.log(matches.wvw_matches[match].wvw_match_id);
                    MYAPP.wvw.wvwMatchID = matches.wvw_matches[match].wvw_match_id;
                    MYAPP.wvw.currentWorldColor = "red";
                    MYAPP.wvw.enemy1Color = "green";
                    MYAPP.wvw.enemy1Number = matches.wvw_matches[match].green_world_id;
                    MYAPP.wvw.enemy2Color = "blue";
                    MYAPP.wvw.enemy2Number = matches.wvw_matches[match].blue_world_id;

                    MYAPP.wvw.redName = matches.wvw_matches[match].red_world_id;
                    MYAPP.wvw.greenName = matches.wvw_matches[match].green_world_id;
                    MYAPP.wvw.blueName = matches.wvw_matches[match].blue_world_id;
                } else if (matches.wvw_matches[match].blue_world_id == curWorldNum) {
                    console.log(matches.wvw_matches[match].wvw_match_id);
                    MYAPP.wvw.wvwMatchID = matches.wvw_matches[match].wvw_match_id;
                    MYAPP.wvw.currentWorldColor = "blue";
                    MYAPP.wvw.enemy1Color = "red";
                    MYAPP.wvw.enemy1Number = matches.wvw_matches[match].red_world_id;
                    MYAPP.wvw.enemy2Color = "green";
                    MYAPP.wvw.enemy2Number = matches.wvw_matches[match].green_world_id;

                    MYAPP.wvw.redName = matches.wvw_matches[match].red_world_id;
                    MYAPP.wvw.greenName = matches.wvw_matches[match].green_world_id;
                    MYAPP.wvw.blueName = matches.wvw_matches[match].blue_world_id;
                } else if (matches.wvw_matches[match].green_world_id == curWorldNum) {
                    console.log(matches.wvw_matches[match].wvw_match_id);
                    MYAPP.wvw.wvwMatchID = matches.wvw_matches[match].wvw_match_id;
                    MYAPP.wvw.currentWorldColor = "green";
                    MYAPP.wvw.enemy1Color = "blue";
                    MYAPP.wvw.enemy1Number = matches.wvw_matches[match].blue_world_id;
                    MYAPP.wvw.enemy2Color = "red";
                    MYAPP.wvw.enemy2Number = matches.wvw_matches[match].red_world_id;

                    MYAPP.wvw.redName = matches.wvw_matches[match].red_world_id;
                    MYAPP.wvw.greenName = matches.wvw_matches[match].green_world_id;
                    MYAPP.wvw.blueName = matches.wvw_matches[match].blue_world_id;
                } else {
                    continue;
                }
            }
            //Set wvwMatchID
            localStorage['matchID'] = MYAPP.wvw.wvwMatchID;
            localStorage['worldColor'] = MYAPP.wvw.currentWorldColor;
            localStorage['e1Color'] = MYAPP.wvw.enemy1Color;
            localStorage['e2Color'] = MYAPP.wvw.enemy2Color;
            localStorage['e1Number'] = MYAPP.wvw.enemy1Number;
            localStorage['e2Number'] = MYAPP.wvw.enemy2Number;
            localStorage['worlds'] = MYAPP.wvw.worlds;

            //TODO: REFACTOR THIS...
            localStorage['rname'] = MYAPP.wvw.redName;
            localStorage['bname'] = MYAPP.wvw.blueName;
            localStorage['gname'] = MYAPP.wvw.greenName;


        }
    });
};


//Calls the gw2 API to get the current match details corresponding to the given match ID. 
//Calls the populatePoints function based on the current map. On first load of openWvWMapWindow, no map is selected.

var getAllMatchDetails = function (matchID) {
    $.ajax({
        async: false,
        url: "https://api.guildwars2.com/v1/wvw/match_details.json?match_id=" + matchID,
        success: function (currentMatch) {

            if (typeof localStorage['currentWvWMap'] === "undefined") {
                localStorage['currentWvWMap'] = '';
            }

            var curMap = localStorage['currentWvWMap'];

            //Find current map and begin to populate points. 
            if (curMap === 'map_borderland_red') {
                populatePoints(currentMatch, "RedHome");
            } else if (curMap === 'map_borderland_blue') {
                populatePoints(currentMatch, "BlueHome");
            } else if (curMap === 'map_borderland_green') {
                populatePoints(currentMatch, "GreenHome");
            } else if (curMap === 'map_eternalbg') {
                populatePoints(currentMatch, "Center");
            } else {
                console.log("No map selected");
            }
        }
    });
    console.log("All match details");
};

//iterate through the currentMatch data and find the correct map type. 
//Needs the current match id, and which wvw map is selected. 
var populatePoints = function (currentMatch, mapType) {
    for (map in currentMatch.maps) {
        if (currentMatch.maps[map].type === mapType) {

            //POPULATE CURRENT MAP
            for (obj in currentMatch.maps[map].objectives) {
                //console.log("ID: " + currentMatch.maps[map].objectives[obj].id + " Owner: " + currentMatch.maps[map].objectives[obj].owner);
                var objectiveNo = currentMatch.maps[map].objectives[obj].id;
                var objectiveColor = currentMatch.maps[map].objectives[obj].owner;
                var currentElement = "objectiveNo" + objectiveNo;
                //add the points on first iteration and map switch
                if (document.getElementById(currentElement) === null) {
                    appendHTML(objectiveColor, objectiveNo);
                } else {
                    //if the image has changed, add the new point and start the RI countdown. 
                    if (document.getElementById(currentElement).childNodes[0].getAttribute('id') !== objectiveNo + "" + objectiveColor && objectiveNo < 62) {
                        console.log(document.getElementById(currentElement).childNodes[0].getAttribute('id') + " : " + objectiveNo + "" + objectiveColor);
                        $('#' + currentElement).remove();
                        appendHTML(objectiveColor, objectiveNo);
                        //TODO: create RI countdown method. 
                        riCountdownTimer(currentElement);
                    } else if (document.getElementById(currentElement).childNodes[0].getAttribute('id') !== objectiveNo + "" + objectiveColor && objectiveNo >= 62) {
                        console.log(document.getElementById(currentElement).childNodes[0].getAttribute('id') + " : " + objectiveNo + "" + objectiveColor);
                        $('#' + currentElement).remove();
                        appendHTML(objectiveColor, objectiveNo);
                    }
                }
            }
        }
    };
};

//places a scout selector where you click on the map. 
var mapClick = function (img, xCord, yCord) {
    var curColor = localStorage['worldColor'];
    console.log('Selector placed at:' + xCord + ',' + yCord);

    placeSelector(xCord, yCord, curColor);

    console.log("My Color: " + curColor);
};

var objClick = function (xCord, yCord) {
    var curColor = localStorage['worldColor'];
    console.log('Selector placed at:' + xCord + ',' + yCord);

    //TODO: May need to add px behind xcord and y cord
    placeSelector(xCord, yCord, curColor);
};

//when the map is clicked, unhides the a scout selector and moves it to where you clicked.
//changes context depending on what your world color is. 
var placeSelector = function (xCord, yCord, curColor) {
    $("#circular-menu").css("top", yCord);
    $("#circular-menu").css("left", xCord);
    $("#circular-menu").attr("class", "visible");
    var items = document.querySelectorAll('.circle a');

    switch (curColor) {
    case "red":
        $("#circular-menu").css("color", "#B11313");
        $('#enemy1').css("color", "#36945F");
        $('#enemy2').css("color", "#4689BD");
        break;
    case "blue":
        $("#circular-menu").css("color", "#4689BD");
        $('#enemy1').css("color", "#B11313");
        $('#enemy2').css("color", "#36945F");
        break;
    case "green":
        $("#circular-menu").css("color", "#36945F");
        $('#enemy1').css("color", "#4689BD");
        $('#enemy2').css("color", "#B11313");
        break;
    default:
        break;
    };
    for (var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

        items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
    }

    /*document.querySelector('.menu-button').onclick = function(e) {
		e.preventDefault(); 
		document.querySelector('.circle').classList.toggle('open');
	}*/

    $('.circle').attr('class', 'circle open'); //open circle when created. 

};

//places a given image at the last place the mouse was clicked on the map. 
//TODO: need to set a timer on the scout points to remove them automatically
var placeScoutPointE1 = function () {
    xCord = MYAPP.wvw.mouseClickX - 18;
    yCord = MYAPP.wvw.mouseClickY - 18;
    var enemyColor = localStorage['e1Color'];
    console.log("E1 Number: " + localStorage['e1Number']);
    var enemyName = getSpecificWorldName(localStorage['e1Number']);
    var placedMap = localStorage['currentWvWMap'];

    console.log(enemyColor + " enemy is: " + enemyName);
    console.log("Color: " + enemyColor);
    // var img = "img\/scout.png";
    // $('#scoutPoints').append('<div class = "scoutImg" id = "enemy1' + enemyColor + '" style = "top:' + yCord 
    // + 'px; left:' + xCord + 'px; position: absolute;"><img src = "' +img+ '"></div>');
    $('.circle').toggleClass('open');
    $("#circular-menu").attr("class", "hidden");

    sendTSMessage(enemyColor + "Scout", xCord, yCord, enemyName, placedMap);

};

var placeScoutPointE2 = function () {
    xCord = MYAPP.wvw.mouseClickX - 18;
    yCord = MYAPP.wvw.mouseClickY - 18;
    var enemyColor = localStorage['e2Color'];
    console.log("E2 Number: " + localStorage['e2Number']);
    var enemyName = getSpecificWorldName(localStorage['e2Number']);
    var placedMap = localStorage['currentWvWMap'];

    console.log(enemyColor + " enemy is: " + enemyName);
    console.log("Color: " + enemyColor);
    // var img = "img\/scout.png";
    // $('#scoutPoints').append('<div class = "scoutImg" id = "enemy1' + enemyColor + '" style = "top:' + yCord 
    // + 'px; left:' + xCord + 'px; position: absolute;"><img src = "' +img+ '"></div>');
    $('.circle').toggleClass('open');
    $("#circular-menu").attr("class", "hidden");

    sendTSMessage(enemyColor + "Scout", xCord, yCord, enemyName, placedMap);


};

var placeWaypoint = function () {
    xCord = MYAPP.wvw.mouseClickX - 18;
    yCord = MYAPP.wvw.mouseClickY - 18;
    placedMap = localStorage['currentWvWMap'];
    // `

    $('.circle').toggleClass('open');
    $("#circular-menu").attr("class", "hidden");

    sendTSMessage("_wp", xCord, yCord, "none", placedMap);

};

var sendTSMessage = function (type, xCord, yCord, enemyName, placedMap) {
    if (type === "redScout") {
        plugin().sendTextMessage({
            type: "Channel",
            targetId: MYAPP.wvw.channelId,
            serverId: MYAPP.wvw.serverId,
            message: "_rs;" + xCord + ";" + yCord + ";" + enemyName + ";" + placedMap
        }, function () {
            console.log("Message Sent: Red Scout PLACED @: " + xCord + ", " + yCord);
        });
    } else if (type === "blueScout") {
        plugin().sendTextMessage({
            type: "Channel",
            targetId: MYAPP.wvw.channelId,
            serverId: MYAPP.wvw.serverId,
            message: "_bs;" + xCord + ";" + yCord + ";" + enemyName + ";" + placedMap
        }, function () {
            console.log("Message Sent: Blue Scout PLACED @: " + xCord + ", " + yCord);
        });
    } else if (type === "greenScout") {
        plugin().sendTextMessage({
            type: "Channel",
            targetId: MYAPP.wvw.channelId,
            serverId: MYAPP.wvw.serverId,
            message: "_gs;" + xCord + ";" + yCord + ";" + enemyName + ";" + placedMap
        }, function () {
            console.log("Message Sent: Green Scout PLACED @: " + xCord + ", " + yCord);
        });
    } else if (type === "_wp") {
        plugin().sendTextMessage({
            type: "Channel",
            targetId: MYAPP.wvw.channelId,
            serverId: MYAPP.wvw.serverId,
            message: "_wp;" + xCord + ";" + yCord + ";none" + ";" + placedMap
        }, function () {
            console.log("Message Sent: Waypoint PLACED @: " + xCord + ", " + yCord);
        });
    } else {
        console.log("ERROR: UNKNOWN TS MESSAGE TYPE: " + type);
    }
};

var mutePlayer = function (annoyingPlayerId) {
    console.log("Server: " + MYAPP.wvw.serverId);
    plugin().muteClient({
        serverId: MYAPP.wvw.serverId,
        clientId: annoyingPlayerId,
        mute: true
    }, function (result) {
        console.log("Player Muted: " + result.success);
    });
}

var centerClick = function () {
    $('.circle').toggleClass('open');
    $("#circular-menu").attr("class", "hidden");
};

var messageHandler = function (data) {
    console.log("ReceivedMessage: " + data.message);
    console.log("From Client Name: " + data.fromClientId + " " + data.fromClientName);

    if (data.message.charAt(0) === "_") {
        console.log("Start Handling");
        var messageArr = data.message.split(";", 5);
        var pointType = messageArr[0];
        var xCord = messageArr[1];
        var yCord = messageArr[2];
        var enemyName = messageArr[3];
        var placedMap = messageArr[4]
        var img = "img\/scout.png";
        if (placedMap === localStorage['currentWvWMap']) {
            if (pointType === "_wp") {
                $('#scoutPoints').append('<div class = "scoutImg" style = "top:' + yCord + 'px; left:' + xCord + 'px; position: absolute;"><a href="#" class="waypoint fa fa-asterisk" onclick = "return false;"></a><div class="tooltip wpTooltip">' + 'Waypoint placed by: ' + data.fromClientName + '<br/><a href = "#" onclick="mutePlayer(' + data.fromClientId + '); return false;">Mute Player</a></div></div>');

                scoutPointAppender(pointType, xCord, yCord);
            } else {
                $('#scoutPoints').append('<div class = "scoutImg ' + pointType + '" id = "' + pointType + xCord + yCord + '" style = "top:' + yCord + 'px; left:' + xCord + 'px; position: absolute;"><img src = "' + img + '"><div class="tooltip wpTooltip">' + enemyName + '<br/>' + 'Spotted: <span class="' + pointType + 'timer"></span> secs ago. <br/>' + 'Waypoint placed by: ' + data.fromClientName + '<br/><a href = "#" onclick="mutePlayer(' + data.fromClientId + '); return false;">Mute Player</a></div></div>');

                scoutPointAppender(pointType, xCord, yCord);
            }
        } else {
            console.log(placedMap + "!=" + localStorage['currentWvWMap']);
        }
    } else {
        console.log("Normal Text");
    }
};

//Starts the countdown when an objective is flipped
//Appends the coundown box, then starts counting down from 5 minutes. 
var riCountdownTimer = function (element) {
    var minutes = 5;
    var seconds = minutes * 60;
    $('#' + element).append('<div id="' + element + 'countdown" class = "riTimer" style="background:rgba(75, 75, 75, 0.75); color:#FFFFFF"></div>');
    var startCountdown = setInterval(function () {
        seconds -= 1;
        minutes = seconds / 60;
        formattedSeconds = seconds % 60;
        if (formattedSeconds < 10) {
            formattedSeconds = "0" + formattedSeconds;
        }
        $('#' + element + 'countdown').empty();
        $('#' + element + 'countdown').append(Math.floor(minutes) + ":" + formattedSeconds);
    }, 1000);

    var stopCountdown = setTimeout(function () {
        clearInterval(startCountdown);
        $('#' + element + 'countdown').remove();

    }, seconds * 1000);
};

var scoutPointAppender = function (pointType, xCord, yCord) {
    var time = 60;
    var seconds = 0;

    var startCountdown = setInterval(function () {
        seconds += 1;

        $('#' + pointType + xCord + yCord + ' .tooltip span').html(seconds);
        //$('#' + pointType + xCord + yCord + ' .tooltip span').append(seconds);
    }, 1000);

    var stopCountdown = setTimeout(function () {
        clearInterval(startCountdown);
        $('#' + pointType + xCord + yCord).remove();

    }, time * 1000);
};

//Adds the correct objective icons and colors. 
var appendHTML = function (objColor, objId) {
    if (objId < 62) {
        $('#worldPoints').append('<div id ="objectiveNo' + objId + '" class = "icon"><img src = "img/' + MYAPP.wvw.objectiveTypes[objId] + '.' + objColor + '.png" id="' + objId + objColor + '" class="icon_img"></div>');
    } else { //This also makes it so these points are not clickable to set upgrades. The class is different. 
        $('#worldPoints').append('<div id ="objectiveNo' + objId + '" class = "bloodlust_icon"><img src = "img/' + MYAPP.wvw.objectiveTypes[objId] + '.' + objColor + '.png" id="' + objId + objColor + '" class="icon_img_small"></div>');
    }
};

//First function called in App. 
//Function is called when user has selected a world. 
var selectWorld = function () {

    localStorage.removeItem('currentWvWMap');
    //**************************
    getCurrentWorldNumber();
    console.log("Current World Number: " + MYAPP.wvw.currentWorldNumber);

    getWvWMatchIDandWorldColor(MYAPP.wvw.currentWorldNumber);
    console.log(MYAPP.wvw.wvwMatchID);
    console.log(MYAPP.wvw.currentWorldColor);

    minimizeWindow();
    //openWvWMapWindow();

    getAllMatchDetails(localStorage['matchID']);

};

var dragResize = function (edge) {
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status == "success") {
            overwolf.windows.dragResize(result.window.id, edge);
        };
    });
};

//Allows you to drag the window around. 
//Currently set to the top banner of both windows. 
var dragMove = function () {
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status == "success") {
            overwolf.windows.dragMove(result.window.id);
        };
    });
};

var closeWindow = function () {
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status == "success") {
            //save worldnumber for the next time the app starts
            MYAPP.wvw.currentWorldNumber = localStorage['worldNumber'];
            localStorage.clear();
            localStorage['worldNumber'] = MYAPP.wvw.currentWorldNumber;
            console.log("worldNumber: " + MYAPP.wvw.currentWorldNumber);

            overwolf.windows.close(result.window.id);
        };
    });
};

var minimizeWindow = function () {
    overwolf.windows.getCurrentWindow(function (result) {
        if (result.status == "success") {
            overwolf.windows.minimize(result.window.id);
        };
    });
};

var restoreWindow = function (window) {
    overwolf.windows.obtainDeclaredWindow(window, function (result) {
        if (result.status == "success") {
            overwolf.windows.restore(result.window.id);
        };
    });
};

//Opens the wvwMapWindow once a server has been selected. 
var openWvWMapWindow = function (callback) {
    overwolf.windows.obtainDeclaredWindow("WvWMapWindow", function (result) {
        if (result.status == "success") {
            overwolf.windows.restore(result.window.id, function (result) {
                console.log(result);
                if (callback && typeof (callback) === 'function') {
                    callback();
                }
            });
        } else {
            alert("Map failed to load");
        }
    });

};

//THE TEAMSPEAK FUNCTIONALITY (BASIC CODE TAKEN FROM OVERWOLF TEAMSPEAK SAMPLE)
function tsPlugin() {
    return document.getElementById('tsPlugin');
};

plugin = tsPlugin;

function addEvent(obj, name, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + name, func);
    } else {
        obj.addEventListener(name, func, false);
    }
}

function load() {

}

function pluginLoaded() {
    console.log("Plugin loaded!");

    plugin().addEventListener("onServerStatusChange", function (data) {
        console.log("onServerStatusChang: ", data);
    });

    plugin().addEventListener("onChannelUpdated", function (data) {
        console.log("onChannelUpdated: ", data);
    });

    plugin().addEventListener("onTextMessageReceived", function (data) {
        messageHandler(data);
    });

    setTimeout(function () {

        plugin().init({
            name: "Overwolf-TeamSpeak-Plugin"
        }, function (result, servers) {
            console.log("result: ", result, servers);

            // no server is connected
            if (servers && !servers.activeServerId) {
                plugin().connectToServer({
                        tab: "currentTab",
                        label: "ts3 public server",
                        address: "voice.teamspeak.com",
                        nickName: "bFox"
                    },
                    function (result, server) {
                        console.log("start new connection: ", result, server)
                    });
            } else {

                plugin().getAllServersInfo(function (errorObject, servers) {
                    console.log("All servers:", result, servers);
                    MYAPP.wvw.channelId = servers[0].channelId;
                    MYAPP.wvw.serverId = servers[0].serverId;
                    console.log('ChannelID: ' + MYAPP.wvw.channelId);
                    console.log('ServerID: ' + MYAPP.wvw.serverId);
                });
            }


        });

    }, 500);


}
