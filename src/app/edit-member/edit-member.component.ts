import { Component, OnInit, Input, Inject } from '@angular/core';
import { TeamMember } from '../team-member.model';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {
  members: FirebaseListObservable<any[]>;
  photos: FirebaseListObservable<any[]>;
  blankMember: TeamMember = new TeamMember('','','','');
  currentMember: TeamMember = this.blankMember;
  currentAction: string = 'new';
  currentPhoto;
  currentFile;
  firebaseRef;

  constructor(private angularFire: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.members = angularFire.database.list('members');
    this.photos = angularFire.database.list('images/members')
    this.firebaseRef = firebaseApp.storage().ref();
    console.log(this.firebaseRef)
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.currentFile = files[0];
  }

  ngOnInit() {

  }

  resetMember() {
    this.blankMember = new TeamMember('','','','');
    this.currentMember = this.blankMember;
  }

  setMember(member) {
    this.currentMember = member;
    this.currentPhoto = member.photo;
  }

  setAction(action) {
    this.currentAction = action;
  }

  setPhoto(photo) {
    this.currentPhoto = photo.url;
  }

  getMemberByID(id: string) {
    return this.angularFire.database.object('/members/' + id)
  }

  newMember(item) {
    this.members.push(item);
    this.resetMember();
  }

  updateMember(memberToUpdate) {
    let memberInFirebase = this.getMemberByID(memberToUpdate.$key);
    memberToUpdate.name = this.emptyField(memberToUpdate.name);
    memberToUpdate.text = this.emptyField(memberToUpdate.text);
    memberToUpdate.title = this.emptyField(memberToUpdate.title);
    memberInFirebase.update({
      name: memberToUpdate.name,
      text: memberToUpdate.text,
      photo: memberToUpdate.photo,
      title: memberToUpdate.title
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

  activePhoto(photo) {
    if(photo.url === this.currentPhoto) {
      return true;
    }
    else {
      return false;
    }
  }

  uploadFile() {
    let url;
    if(this.currentFile) {
      let name = this.currentFile.name;
      this.firebaseRef.child('images/members/' + name).put(this.currentFile)
      .then(a => this.firebaseRef.child('images/members/' + name).getDownloadURL()
        .then(url => this.angularFire.database.list('images/members').push({ url: url, name: name}))
      )
    }
  }

  selectPhoto() {
    this.currentMember.photo = this.currentPhoto;
  }

  emptyField(field) {
    if(!field) {
      return '';
    }
    else {
      return field
    }
  }
}
