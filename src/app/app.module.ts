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
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AdminComponent } from './admin/admin.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { EditPortfolioItemComponent } from './edit-portfolio-item/edit-portfolio-item.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { BlogComponent } from './blog/blog.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { MarkdownModule } from 'angular2-markdown';
import { PortfolioSingleComponent } from './portfolio-single/portfolio-single.component';
import { TeamMemberSingleComponent } from './team-member-single/team-member-single.component';
import { MapsComponent } from './maps/maps.component';
import { MessagerComponent } from './messager/messager.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import {CategoryPipe } from './category.pipe';
import { WorkComponent } from './work/work.component';
import { WorkSingleComponent } from './work-single/work-single.component';
import { TruncatePipe } from './truncate.pipe';
import { ServicePipe } from './service.pipe';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    AboutComponent,
    AdminComponent,
    EditMemberComponent,
    PortfolioComponent,
    EditPortfolioItemComponent,
    LoginComponent,
    EmailComponent,
    BlogComponent,
    BlogSingleComponent,
    EditBlogComponent,
    PortfolioSingleComponent,
    TeamMemberSingleComponent,
    MapsComponent,
    MessagerComponent,
    ContactComponent,
    ServiceComponent,
    HomeComponent,
    CategoryPipe,
    WorkComponent,
    WorkSingleComponent,
    TruncatePipe,
    ServicePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    MarkdownModule.forRoot()
  ],
  providers: [AuthGuardService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
