import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PostsComponent } from './pages/posts/posts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"",redirectTo:"posts",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"posts",component:PostsComponent},
    {path:"profile",component:ProfileComponent}
];

