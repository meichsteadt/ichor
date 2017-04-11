import { Component, OnInit, Input, Inject } from '@angular/core';
import { PortfolioItem } from '../portfolio-item.model';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'app-edit-portfolio-item',
  templateUrl: './edit-portfolio-item.component.html',
  styleUrls: ['./edit-portfolio-item.component.css']
})
export class EditPortfolioItemComponent implements OnInit {
  portfolioItems: FirebaseListObservable<any[]>;
  photos: FirebaseListObservable<any[]>;
  blankItem: PortfolioItem = new PortfolioItem('','','','','');
  currentItem: PortfolioItem = this.blankItem;
  currentAction: string = 'new';
  currentPhoto;
  currentFile;
  firebaseRef;

  constructor(private angularFire: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.portfolioItems = angularFire.database.list('portfolio');
    this.photos = angularFire.database.list('images/portfolio');
    this.firebaseRef = firebaseApp.storage().ref();
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.currentFile = files[0];
  }

  setItem(item) {
    this.currentItem = item;
    this.currentPhoto = item.photo
  }

  setAction(action){
    this.currentAction = action;
  }

  setPhoto(photo) {
    this.currentPhoto = photo.url;
  }

  resetItem() {
    this.blankItem = new PortfolioItem('','','','','');
    this.currentItem = this.blankItem;
  }


  ngOnInit() {
  }

  getItemByID(id: string) {
    return this.angularFire.database.object('/portfolio/' + id)
  }

  newItem(item) {
    this.portfolioItems.push(item);
    this.currentAction = 'new';
    this.resetItem();
  }

  updateItem(itemToUpdate) {
    var itemInFirebase = this.getItemByID(itemToUpdate.$key);
    itemInFirebase.update({
      client: itemToUpdate.client,
      review: itemToUpdate.review,
      description: itemToUpdate.description,
      photo: itemToUpdate.photo,
      url: itemToUpdate.url,
    })
  }

  deleteItem(itemToDelete) {
    var itemInFirebase = this.getItemByID(itemToDelete.$key);
    if(confirm("Are you sure you want to delete this item?")) {
      itemInFirebase.remove();
      this.resetItem();
    }
  }

  activeItem(item) {
    if(item === this.currentItem) {
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
      this.firebaseRef.child(name).put(this.currentFile)
      .then(a => this.firebaseRef.child(name).getDownloadURL()
        .then(url => this.angularFire.database.list('images/portfolio').push({ url: url, name: name}))
      )
    }
  }

  selectPhoto() {
    this.currentItem.photo = this.currentPhoto;
  }

}
