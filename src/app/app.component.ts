import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AuthGuardService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'app works!';
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
  }
  ngDoCheck() {
    if(this.router.url === "/") {
      document.getElementsByTagName('body')[0].onscroll = this.scroll;
    }
    else {
      document.getElementsByTagName('body')[0].onscroll = null;
    }
  }

  scroll() {
    let nav = document.getElementsByClassName('nav')[0]
    if(window.scrollY > 200) {
      nav.className = "nav scrolled"
    }
    else {
      nav.className = "nav"
    }
  }

  adminRoute() {
    if(this.router.url === '/admin') {
      return true;
    }
    else {
      return false;
    }
  }

  currentRoute(route) {
    if(this.router.url === route) {
      return true;
    }
    else {
      return false;
    }
  }

  rootRoute() {
    if(this.router.url === '/') {
      return false;
    }
    else {
      return true;
    }
  }
}
