import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AuthGuardService]
})
export class AppComponent implements OnInit, DoCheck, OnDestroy {
  title = 'app works!';
  routerSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router) {
   }


  ngOnInit() {
    this. routerSubscription = this.router.events.subscribe(event => {
        window.scroll(0, 0);
    });
  }

  ngDoCheck() {
    if(this.router.url === "/") {
      document.getElementsByTagName('body')[0].onscroll = this.scroll;
    }
    else {
      document.getElementsByTagName('body')[0].onscroll = null;
    }
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  scroll() {
    let nav = document.getElementsByTagName('nav')[0]
    if(window.scrollY > 20) {
      nav.className = "scrolled"
    }
    else {
      nav.className = ""
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

  showNav() {
    document.getElementById('nav-mobile').style.zIndex = '998';
    document.getElementById('nav-mobile').style.opacity = '.95';
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
  }

  hideNav() {
    document.getElementById('nav-mobile').style.zIndex = '-1';
    document.getElementById('nav-mobile').style.opacity = '0';
    document.getElementsByTagName('body')[0].style.overflow = "";
  }
}
