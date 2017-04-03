import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, AuthGuardService]
})
export class AppComponent {
  title = 'app works!';

  constructor(private authService: AuthService, private router: Router) { }
  adminRoute() {
    if(this.router.url === '/admin') {
      return true;
    }
    else {
      return false;
    }
  }
}
