import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';;
import { PaswordService } from '../pasword.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  token!: string;
  recoverError: boolean = false;
  countdown: number = 10;
  registrationSuccess: boolean = false;
  constructor(
    private paswordService: PaswordService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
  
    // Verifica si alguno de los controles es null (lo cual no debería suceder en un escenario normal)
    if (!password || !confirmPassword) {
      return null; // O puedes devolver un error específico si prefieres
    }
  
    // Ahora puedes verificar si los valores coinciden
    return password.value === confirmPassword.value ? null : { mismatch: true };
  }

  resetPassword() {
    if (this.resetForm.valid && this.token) {
      const passwordControl = this.resetForm.get('password');
  
      if (passwordControl) {
        const encodedPassword = btoa(passwordControl.value);
        this.paswordService.resetPassword(this.token, encodedPassword).subscribe(
          response => {
            if (response.data) {
              this.registrationSuccess = true;
              this.recoverError = false;
              const interval = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                  clearInterval(interval);
                  this.router.navigate(['/login']);
                }
              }, 1000);
            } else {
              this.recoverError = true;
            }
          },
          error => {
            console.error('Error en la recuperación:', error);
            this.recoverError = true;
          }
        );
      }
    }
  }

}
