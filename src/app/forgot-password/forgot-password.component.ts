import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetService } from '../reset.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  recoverForm: FormGroup;
  recoverError: boolean = false;
  countdown: number = 10;
  registrationSuccess: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private resetService: ResetService, // Inyecta tu servicio de autenticación
    private router: Router
  ) {
    this.recoverForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  recoverPassword(): void {
    if (this.recoverForm.valid) {
      this.resetService.resetPassword(this.recoverForm.value.correo).subscribe(
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
    } else {
      // Manejar la visualización de errores de validación
    }
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']); 
  }
}
