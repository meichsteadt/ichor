import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  portfolioItems: FirebaseListObservable<any[]>;
  currentService: string = "all";
  services: string[];
  constructor(private angularFire: AngularFire, private router: Router) {
    this.portfolioItems = angularFire.database.list('portfolio');
    this.services = ['custom site', 'branding', 'ecommerce', 'site-builder']
  }

  goToItem(item) {
    this.router.navigate(['work', item.$key])
  }

  ngOnInit() {
  }

  setService(service) {
    this.currentService = service;
  }

  activeService(service) {
    if(this.currentService === service) {
      return true;
    }
    else {
      return false;
    }
  }

  checkService(item, service) {
    if(item.services[service]) {
      return true;
    }
    else {
      return false;
    }
  }
}
