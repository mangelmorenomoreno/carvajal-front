import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false;
  loginValidation: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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