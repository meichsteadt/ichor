import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { auth0Config } from './api-keys';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

declare var Auth0Lock: any;


@Injectable()
export class AuthService {
  lock = new Auth0Lock(auth0Config.clientId, auth0Config.domain);
  constructor(private router: Router, private angularFire: AngularFire) {
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        localStorage.setItem('profile', JSON.stringify(profile));
      });
      this.lock.hide();
      this.router.navigate(['/admin'])
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');

    this.router.navigateByUrl('/');
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
