import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../team-member.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: FirebaseListObservable<any[]>;
  constructor(private angularFire: AngularFire) {
    this.team = angularFire.database.list('members');
  }
  ngOnInit() {
    
  }

}
