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

}
