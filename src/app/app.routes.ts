import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { CreatearticleComponent } from './createarticle/createarticle.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuthorComponent } from './author/author.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'article/:id',
    component: DetailComponent
  },
  {
    path: 'create',
    canActivate: [authGuard],
    component: CreatearticleComponent
  },
  {
    path: 'about',
    canActivate: [authGuard],
    component: AboutComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'author/:id',
    component: AuthorComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: "**",
    component: NotfoundComponent
  }
];
