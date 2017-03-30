import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from '../portfolio-item.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-edit-portfolio-item',
  templateUrl: './edit-portfolio-item.component.html',
  styleUrls: ['./edit-portfolio-item.component.css']
})
export class EditPortfolioItemComponent implements OnInit {
  portfolioItems: FirebaseListObservable<any[]>;
  blankItem: PortfolioItem = new PortfolioItem('','','','','');
  currentItem: PortfolioItem = this.blankItem;
  currentAction: string;

  setItem(item) {
    this.currentItem = item;
  }

  setAction(action){
    this.currentAction = action;
  }
  constructor(private angularFire: AngularFire) {
    this.portfolioItems = angularFire.database.list('portfolio');
  }

  ngOnInit() {
  }

  getItemByID(id: string) {
    return this.angularFire.database.object('/portfolio/' + id)
  }

  newItem(item) {
    this.portfolioItems.push(item);
    this.currentAction = 'update';
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
      this.currentItem = this.portfolioItems[0]
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

}
