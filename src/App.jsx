import React, { Component } from 'react';
import './App.css';
import { Form, FormGroup, FormControl, Button, Glyphicon, InputGroup, SplitButton, MenuItem } from 'react-bootstrap';
// import RiotAPI from './APICalls.js';

class App extends Component {
	constructor(props) {
		super(props);
		let me = this;
		me.state = {
			nameDisplay : '',
			region : "NA",
			apiKey : '',
			summonerName : '',
		}
	}

	onRegionSelect(region) {
		this.setState({region})
	}

	onSearchClick() {
		console.log("Summoner Name", this.state.summonerName);
		console.log("RiotAPI", RiotAPI);

		const RiotAPI = {
			apiKey : 'RGAPI-30cb70b5-0203-4c90-bbf4-2d1a4ca52981',

			getSummonerDetails(summonerName, callback) {
				let me = this,
					request = new XDomainRequest(),
					url = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${me.apiKey}`;

					request.onreadystatechange = function() { 
		        		if (request.readyState == 4 && request.status == 200)
		            		callback(request.responseText);
		    		}

		    		if ("withCredentials" in request) {
						request.open("GET", url, true);
					} else if (typeof XDomainRequest != "undefined") {
						request = new XDomainRequest();
						request.open("GET", url);
					}

					request.send(null);
				
				return request.responseText
			}
		}
		let me = this,
			summonerName = me.state.summonerName,
			summonerDetails = RiotAPI.getSummonerDetails(summonerName);
		console.log(summonerDetails);
	}

	setSummonerName(input) {
		this.setState({summonerName : input})
	}

	render() {
		let me = this,
			nameDisplay = me.state.nameDisplay,
			region = me.state.region;

		return(
			<div className="App">
				<h1 className="App-title">Summoner Search</h1>
				<div className="Searchbar">
					<Form inline>
						<SplitButton
							title={region}
						>
							<MenuItem eventKey="NA" onSelect={event => me.onRegionSelect(event)}>NA</MenuItem>
							<MenuItem eventKey="KR" onSelect={event => me.onRegionSelect(event)}>KR</MenuItem>
							<MenuItem eventKey="EUW" onSelect={event => me.onRegionSelect(event)}>EUW</MenuItem>
						</SplitButton>
						<FormGroup>
							<InputGroup>
								<FormControl
									type="text"
									placeholder="Search for a summoner"
									onChange={event => me.setSummonerName(event.target.value)}
								/>
								<InputGroup.Addon>
									<Glyphicon glyph="search" onClick={event => me.onSearchClick()}></Glyphicon>
								</InputGroup.Addon>
							</InputGroup>
						</FormGroup>
					</Form>
				</div>
			</div>
		)
	}
}

export default App;