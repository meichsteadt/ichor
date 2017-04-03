import { Component, OnInit, Input } from '@angular/core';
import { TeamMember } from '../team-member.model';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  members: FirebaseListObservable<any[]>;
  blankMember: TeamMember = new TeamMember('','','');
  currentMember: TeamMember = this.blankMember;
  currentAction: string = 'new';

  constructor(private angularFire: AngularFire) {
    this.members = angularFire.database.list('members');
  }

  ngOnInit() {
  }

  resetMember() {
    this.blankMember = new TeamMember('','','');
    this.currentMember = this.blankMember;
  }

  setMember(member) {
    this.currentMember = member;
  }

  setAction(action) {
    this.currentAction = action;
  }

  getMemberByID(id: string) {
    return this.angularFire.database.object('/members/' + id)
  }

  newMember(item) {
    this.members.push(item);
    this.resetMember();
  }

  updateMember(memberToUpdate) {
    var memberInFirebase = this.getMemberByID(memberToUpdate.$key);
    memberInFirebase.update({
      name: memberToUpdate.name,
      text: memberToUpdate.text,
      photo: memberToUpdate.photo
    });
  }

  deleteMember(memberToDelete) {
    var memberInFirebase = this.getMemberByID(memberToDelete.$key);
    if(confirm("Are you sure you want to delete this member?")) {
      memberInFirebase.remove();
      this.resetMember();
      this.setAction('new');
    }
  }

  activeMember(member) {
    if(this.currentMember === member) {
      return true;
    }
    else {
      return false;
    }
  }

}
