import XDomainRequest;

const RiotAPI = {
	apiKey : 'RGAPI-30cb70b5-0203-4c90-bbf4-2d1a4ca52981',

	getSummonerDetails(summonerName, callback) {
		let me = this,
			request = new XMLHttpRequest(),
			url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${me.apiKey}`;

			request.onreadystatechange = function() { 
        		if (request.readyState == 4 && request.status == 200)
            		callback(request.responseText);
    		}

			request.open("GET", url, true);
			request.send(null);
		
		return request.responseText
	}
}