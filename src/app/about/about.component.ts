import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor() { }
  goTo() {
    let values = document.getElementById('values')
    scrollTo(0, values.offsetTop - 160)
  }
}
