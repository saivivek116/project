import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { CanActivateRouteGuard } from './can-activate-route-guard';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './read/read.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ContactComponent } from './contact/contact.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { UsersComponent } from './users/users.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetComponent } from './forget/forget.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'login', component: LoginComponent },
  {path:'register',component:RegisterComponent},
  { path: 'dashboard', component: DashboardComponent/*canActivate: [CanActivateRouteGuard]*/},
  { path: 'profile/:username', component: ProfileComponent },
  {path:'read/:blogId',component:ReadComponent},
  {path:'post',component:PostComponent},
  {path:'update-profile',component:UpdateProfileComponent},
  {path:'contact',component:ContactComponent},
  {path:'edit/:blogId',component:BlogEditComponent},
  {path:'otp',component:OtpverificationComponent},
  {path:'bookmarks',component:BookmarksComponent},
  {path:'users',component:UsersComponent},
  {path:'forget',component:ForgetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
