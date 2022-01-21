import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';

@Component({
  selector: 'app-orbit-counts',
  templateUrl: './orbit-counts.component.html',
  styleUrls: ['./orbit-counts.component.css']
})
export class OrbitCountsComponent implements OnInit {

	@Input() satellites: Satellite[];

  constructor() { }

  ngOnInit() {
  }
  satTypes = [{"name":"Space Debris","count":this.countByType("Space Debris")},
  {"name":"Communication","count":this.countByType("Communication")},
  {"name":"Probe","count":this.countByType("Probe")},
  {"name":"Positioning","count":this.countByType("Positioning")},
  {"name":"Space Station","count":this.countByType("Space Station")},
  {"name":"Telescope","count":this.countByType("Telescope")}];


  countByType(type: string): number {
	let count = 0;
	if (this.satellites) {
	  for (let i = 0; i < this.satellites.length; i++) {
		 if (this.satellites[i].type === type) {
			count++;
		 }
	  }
	}
	return count;
 }


}