import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { firebaseAuthConfig } from '../api-keys';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentRoute: string = this.router.url
  currentSection: string = "blog";
  constructor(private router: Router, private angularFire: AngularFire) {
    this.angularFire.auth.subscribe();
  }

  ngOnInit() {
    this.angularFire.auth.login({ email: firebaseAuthConfig.email, password: firebaseAuthConfig.password});
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
