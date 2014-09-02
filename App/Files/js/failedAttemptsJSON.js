
var getWvWMatchIDandWorldColor = function(selectedWorldID){
	console.log("Begin getMatchID");
	$.getJSON("https://api.guildwars2.com/v1/wvw/matches.json") .done(function(gw2_matches){
		MYAPP.wvw.wvwMatchID = getWvWMatchID(gw2_matches, selectedWorldID);
		MYAPP.wvw.currentWorldColor = getWorldColor(gw2_matches, selectedWorldID);
	})
};

var getWvWMatchID = function(match, selectedWorldID){
	console.log("Received JSON");
		var i = 0;
		var numOfMatches = Object.size(match.wvw_matches);
		console.log("Number of Matches: " + numOfMatches);
		while(i < numOfMatches){
			
			if(gw2_matches.wvw_matches[i].red_world_id == selectedWorldID){
				console.log("Red Match");
				console.log(gw2_matches.wvw_matches[i].wvw_match_id)
				return (match.wvw_matches[i].wvw_match_id);
			}
			else if(gw2_matches.wvw_matches[i].blue_world_id == selectedWorldID){
				console.log("Blue Match");
				console.log(gw2_matches.wvw_matches[i].wvw_match_id)
				return (match.wvw_matches[i].wvw_match_id);
			}
			else if(gw2_matches.wvw_matches[i].green_world_id == selectedWorldID){
				console.log("Green Match");
				console.log(gw2_matches.wvw_matches[i].wvw_match_id);
				return (match.wvw_matches[i].wvw_match_id);
			}
			else{
				i++;
			}
		}
};

var getWorldColor = function(match, selectedWorldID){
	var i = 0;
	var numOfMatches = Object.size(match.wvw_matches);
	console.log("Number of Matches: " + numOfMatches);
	while(i < numOfMatches){
		if(match.wvw_matches[i].red_world_id == selectedWorldID){
			console.log("Red Match");
			return("red");
		}
		else if(match.wvw_matches[i].blue_world_id == selectedWorldID){
			console.log("Blue Match");
			return("blue");
		}
		else if(match.wvw_matches[i].green_world_id == selectedWorldID){
			console.log("Green Match");
			return("green");
		}
		else{
			i++;
		}
		
		
	};

};

var getAllMatchDetails = function(matchID){
	$.getJSON("https://api.guildwars2.com/v1/wvw/match_details.json?match_id=" + matchID).done( function(currentMatch){
		console.log("WvW Scores: " + currentMatch.scores + "<br/>");		
		$("#testSpace").append("WvW Scores: " + currentMatch.scores + "<br/>");

	});
}