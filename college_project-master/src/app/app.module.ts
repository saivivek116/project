import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {NgxPasswordToggleModule} from 'ngx-password-toggle';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { CanActivateRouteGuard } from './can-activate-route-guard';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { ReadComponent } from './read/read.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { from } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
// import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { JwPaginationComponent} from 'jw-angular-pagination';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ContactComponent } from './contact/contact.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { OtpverificationComponent } from './otpverification/otpverification.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { UsersComponent } from './users/users.component';
import { ForgetComponent } from './forget/forget.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    DashboardComponent,
    HomeComponent,
    ReadComponent,
    ProfileComponent,
    PostComponent,
    JwPaginationComponent,
    UpdateProfileComponent,
    ContactComponent,
    BlogEditComponent,
    OtpverificationComponent,
    BookmarksComponent,
    UsersComponent,
    ForgetComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxPasswordToggleModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpClientModule
    // ShowHidePasswordModule
  ],
  providers: [/*CanActivateRouteGuard*/AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
