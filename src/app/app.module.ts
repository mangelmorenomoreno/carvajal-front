import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicationComponent } from './publication/publication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, withFetch } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateSuccessComponent } from './create-success/create-success.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    ProfileComponent,
    PublicationComponent,
    ForgotPasswordComponent,
    CreateSuccessComponent,
    ResetPasswordComponent,
    UpdateUserComponent,
    InicioComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,       
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
