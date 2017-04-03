import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentRoute: string = this.router.url
  currentSection: string = "team";
  constructor(private router: Router, private angularFire: AngularFire) {
    this.angularFire.auth.subscribe();
  }

  ngOnInit() {
    this.angularFire.auth.login({ email: 'jqian@ichorstudios.com', password: 'LiloMomo12'});
    // this.angularFire.auth.logout();
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
