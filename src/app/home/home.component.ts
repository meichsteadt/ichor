import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentState: string = "oregon";
  constructor() { }

  ngOnInit() {
  }

  setState(state) {
    this.currentState = state;
  }

  getState(state) {
    if(state === this.currentState) {
      return true;
    }
    else {
      return false;
    }
  }

  hideState(state) {
    if(state !== this.currentState) {
      return true;
    }
    else {
      return false;
    }
  }

}
