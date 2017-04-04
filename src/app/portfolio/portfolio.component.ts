import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolioItems: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.portfolioItems = angularFire.database.list('portfolio');
  }

  setClass(position) {
    if(position === 0) {
      return 'portfolio rectangle'
    }
    else if (position === 1 || position === 5 || position === 10) {
      return 'portfolio bg-square'
    }
    else {
      return 'portfolio sm-square'
    }
  }

  ngOnInit() {
  }

}
