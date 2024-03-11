import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false;
  loginValidation: boolean = false;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    if (isPlatformBrowser(this.platformId)) {
      const userValue = localStorage.getItem('user');
      if (userValue) {
        const userv = JSON.parse(userValue);
        if (userv && userv.accessToken) {
          this.user = userv;
          this.router.navigate(['/user']);
        } 
      } 
    }
  }


  login(): void {

    if (this.loginForm.valid) {
      const encodedPassword = btoa(this.loginForm.value.password);
      this.authService.login(this.loginForm.value.email, encodedPassword).subscribe(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.router.navigate(['/user']);
        } else {
          // Mostrar mensaje de error
          this.loginError = true;
          this.loginValidation = false;
        }
      }, error => {
        console.error(error);
      });
    } else {
      this.loginValidation = true;
      this.loginError = false;
    }
  }



  // Función para facilitar el acceso a los campos del formulario en la plantilla
  get f() { return this.loginForm.controls; }

  navigateToRegister(): void {
    this.router.navigate(['/register']); 
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']); 
  }

}