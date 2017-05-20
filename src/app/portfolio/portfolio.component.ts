import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolioItems: FirebaseListObservable<any[]>;
  windowHeight: number;
  constructor(private angularFire: AngularFire) {
    this.portfolioItems = angularFire.database.list('portfolio');
  }

  setClass(position) {
    if(position === 0) {
      return 'portfolio rectangle'
    }
    else if (position === 1 || position % 5 === 0 ) {
      return 'portfolio bg-square'
    }
    else {
      return 'portfolio sm-square'
    }
  }

  ngOnInit() {

  }

  showModal(id) {
    let div = document.getElementById(id);
    let delay;
    let fade;
    let transition = "all .9s ease";
    div.style.transition = "";
    div.style.display = "none";
    div.style.left = "-100%";
    div.style.display = "block";
    clearTimeout(delay);
    clearTimeout(fade);
    delay = setTimeout(function(){
      div.style.transition = transition;
      div.style.left = "0";
      document.getElementById('portfolio').style.paddingTop = "0";
    }, 0)
  }

  hideModal(id) {
    document.getElementById('portfolio').style.paddingTop = "101px";
    let div = document.getElementById(id)
    div.style.transition = "all .5s";
    div.style.left = "100%";
  }
}
