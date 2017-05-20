import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-work-single',
  templateUrl: './work-single.component.html',
  styleUrls: ['./work-single.component.css']
})
export class WorkSingleComponent implements OnInit {
  portfolioItemId: string;
  portfolioItem: FirebaseObjectObservable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private angularFire: AngularFire) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.portfolioItemId = urlParameters['id'];
    });
    this.portfolioItem = this.angularFire.database.object('/portfolio/' + this.portfolioItemId);
  }

}
