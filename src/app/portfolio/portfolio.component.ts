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

  ngOnInit() {
  }

}
