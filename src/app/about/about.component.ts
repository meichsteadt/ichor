import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor() { }
  goTo() {
    let currentPosition = self.pageYOffset
    let values = document.getElementById('story').offsetTop - 101
    let distance = values - currentPosition;
    let duration = 4;
    let timer = 0;
    let leapY = currentPosition + (distance/100)
    for(let i = currentPosition; i < values; i+= distance/100) {
      this.scrollTo(leapY, duration * timer);
      leapY += (distance/100);
      if(leapY > values) leapY = values; timer++;
  }
}
  scrollTo(position, duration) {
    setTimeout(() => {
      window.scrollTo(0, position)
    }, duration);
    return;
  }
}
