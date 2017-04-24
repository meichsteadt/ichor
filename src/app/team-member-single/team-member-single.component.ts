import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TeamMember } from '../team-member.model';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-team-member-single',
  templateUrl: './team-member-single.component.html',
  styleUrls: ['./team-member-single.component.css']
})
export class TeamMemberSingleComponent implements OnInit {
  teamMemberId: string;
  teamMember: FirebaseObjectObservable<any>;
  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private angularFire: AngularFire) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.teamMemberId = urlParameters['id'];
    });
    this.teamMember = this.angularFire.database.object('/members/' + this.teamMemberId);
  }

}
