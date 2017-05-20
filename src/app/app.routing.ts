import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AboutComponent} from './about/about.component';
import { TeamComponent} from './team/team.component';
import { AdminComponent } from './admin/admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { WorkComponent } from './work/work.component';
import { WorkSingleComponent } from './work-single/work-single.component';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { TeamMemberSingleComponent } from './team-member-single/team-member-single.component';
import { AuthGuardService } from './auth-guard.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'about/:id',
    component: TeamMemberSingleComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'work',
    component: WorkComponent,
  },
  {
    path: 'work/:id',
    component: WorkSingleComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'blog/:id',
    component: BlogSingleComponent,
  },
  {
    path: 'services',
    component: ServiceComponent,
  },
  {
    path: 'contact',
    component: ContactComponent
  }

]
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
