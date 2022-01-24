import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'orbit-report';

  	sourceList: Satellite[];
  	displayList: Satellite[];
	types = [{"value":"0","label":"ANY"},{"value":"1","label":"Space Debris"},{"value":"2","label":"Communication"},{"value":"3","label":"Probe"},{"value":"4","label":"Positioning"},{"value":"5","label":"Space Station"},{"value":"6","label":"Telescope"}];//["Any","Space Debris","Communication","Probe","Positioning","Space Station","Telescope"];
	orbits = [{"value":"0","label":"ANY"},{"value":"1","label":"LOW"},{"value":"2","label":"HIGH"}];
  
 	constructor() {
		this.sourceList = [];
		this.displayList = [];
		let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
		

		window.fetch(satellitesUrl).then(function (response) {
			response.json().then(function (data) {

				let fetchedSatellites = data.satellites;
				// loop over satellites
				for(let i=0; i < fetchedSatellites.length; i++) {
					// create a Satellite object 
					let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
					// add the new Satellite object to sourceList 
					this.sourceList.push(satellite);
				 }

				 // make a copy of the sourceList to be shown to the user
				 this.displayList = this.sourceList.slice(0);
	  
			}.bind(this));
		}.bind(this));

	}
	retrieveTypes(index:number, typeList:Object[]): string{
		let obj: object;
		let type: string;
		for(let i:number = 0; i<typeList.length;i++){
			obj = typeList[i];
			if(index === obj["value"]){
				return obj["label"];
			}
		}
	}
	search(searchTerm: string, satTypes:number, orbitType:number): void {
		this.displayList = this.sourceList.slice(0);
		let preSelectSearch: Satellite[] = [];
		let matchingSatellites: Satellite[] = [];
		searchTerm = searchTerm.toLowerCase();
		for(let i=0; i < this.sourceList.length; i++) {
			let name = this.sourceList[i].name.toLowerCase();
			if (name.indexOf(searchTerm) >= 0) {
				preSelectSearch.push(this.sourceList[i]);
			}
		}
		matchingSatellites = this.selectSearch(preSelectSearch,satTypes,orbitType);
		// assign this.displayList to be the array of matching satellites
		// this will cause Angular to re-make the table, but now only containing matches		
		this.displayList = matchingSatellites;
	}
	selectSearch(satIn: Satellite[], typeIn:number, orbitIn:number): Satellite[]{
		let satTypeOut: Satellite[]=[];
		let satOut: Satellite[]=[];
		for(let i:number = 0; i<satIn.length;i++){
			let type:string = satIn[i].type;
			if(type === this.retrieveTypes(typeIn,this.types)){
				satTypeOut.push(satIn[i]);
			}
		}
		if(this.retrieveTypes(typeIn,this.types) === "ANY"){
			satTypeOut = satIn;
		}
		for(let i:number = 0; i<satTypeOut.length;i++){
			let orbit:string = satTypeOut[i].orbitType;
			if(orbit === this.retrieveTypes(orbitIn,this.orbits)){
				satOut.push(satTypeOut[i]);
			}
		}
		if(this.retrieveTypes(orbitIn,this.orbits) === "ANY"){
			satOut = satTypeOut;
		}
		return satOut;
		
	}
}
