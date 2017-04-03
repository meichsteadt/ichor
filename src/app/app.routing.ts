import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AboutComponent} from './about/about.component';
import { TeamComponent} from './team/team.component';
import { AdminComponent } from './admin/admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
