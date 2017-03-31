import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { routing } from './app.routing';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule, FirebaseListObservable } from 'angularfire2';
import { AdminComponent } from './admin/admin.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { EditPortfolioItemComponent } from './edit-portfolio-item/edit-portfolio-item.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    AboutComponent,
    AdminComponent,
    EditMemberComponent,
    PortfolioComponent,
    EditPortfolioItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
