import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentRoute: string = this.router.url
  currentSection: string = "team";
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
  activeSection(section) {
    if(this.currentSection === section) {
      return true;
    }
    else {
      return false;
    }
  }
}
