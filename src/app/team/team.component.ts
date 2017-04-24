import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  members: FirebaseListObservable<any[]>;

  currentRoute: string = this.router.url
  constructor(private angularFire: AngularFire, private router: Router) {
    this.members = angularFire.database.list('members');
  }
  ngOnInit() {

  }

  clearCss(div) {
    div.style.transition = "";
  }

  show(div) {
    div.style.display = "block";
  }

  hide(div) {
    div.style.display = "none";
  }

  hover($event, member) {
    let id  = member.toLowerCase();
    let alt = document.getElementById(id+ '-alt');
    let div = document.getElementById(id);
    let direction = this.getDir(div, { x : $event.pageX, y : $event.pageY })
    let delay;
    let transition = "all .3s ease";
    if(direction === 0) {
      this.clearCss(alt);
      this.hide(alt);
      alt.style.top = "-100%";
      alt.style.left = "0";
      this.show(alt);
      clearTimeout(delay);
      delay = setTimeout(function() {
        alt.style.transition = transition;
        alt.style.top = "0";
        alt.style.left = "0";
      },0)
    }
    else if (direction === 1) {
      this.clearCss(alt);
      this.hide(alt);
      alt.style.left = "100%";
      alt.style.top = "0";
      this.show(alt);
      clearTimeout(delay);
      delay = setTimeout(function() {
        alt.style.transition = transition;
        alt.style.top = "0";
        alt.style.left = "0";
      },0)
    }
    else if (direction === 2) {
      this.clearCss(alt);
      this.hide(alt);
      alt.style.top = "100%";
      alt.style.left = "0";
      this.show(alt);
      clearTimeout(delay);
      delay = setTimeout(function() {
        alt.style.transition = transition;
        alt.style.top = "0";
        alt.style.left = "0";
      },0)
    }
    else {
      this.clearCss(alt);
      this.hide(alt);
      alt.style.left = "-100%";
      alt.style.top = "0";
      this.show(alt);
      clearTimeout(delay);
      delay = setTimeout(function() {
        alt.style.transition = transition;
        alt.style.top = "0";
        alt.style.left = "0";
      },0)
    }
  }

  unhover($event, member) {
    let id  = member.toLowerCase();
    let alt = document.getElementById(id+ '-alt');
    let div = document.getElementById(id);
    let direction = this.getDir(div, { x : $event.pageX, y : $event.pageY })
    if(direction === 0) {
      alt.style.top = "-110%";
    }
    else if (direction === 1) {
      alt.style.left = "100%";
    }
    else if(direction === 2) {
      alt.style.top = "100%";
    }
    else {
      alt.style.left = "-100%";
    }
  }

  getDir( $el, coordinates ) {
		// the width and height of the current div
		var w = $el.clientWidth,
			h = $el.clientHeight,
			// calculate the x and y to get an angle to the center of the div from that x and y.
			// gets the x value relative to the center of the DIV and "normalize" it
			x = ( coordinates.x - $el.offsetLeft - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
			y = ( coordinates.y - $el.offsetTop  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),

			// the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
			// first calculate the angle of the point,
			// add 180 deg to get rid of the negative values
			// divide by 90 to get the quadrant
			// add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
			direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;
		return direction;
	}

  goToMember(member) {
    this.router.navigate(['about', member.$key])
  }

}
