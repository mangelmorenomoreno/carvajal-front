import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  registrationError: boolean = false;
  validacionDatos: boolean = false;
  registrationSuccess: boolean = false;
  countdown: number = 10;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']); 
  }

  register(): void {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe(
        response => {
          if (response.data === true) {
            this.validacionDatos = false;
            this.registrationError = false;
            this.registrationSuccess = true;
            console.log('Registro exitoso:', response.detail);
            // Redirigir al usuario a la página de inicio o perfil, por ejemplo:
            const interval = setInterval(() => {
              this.countdown--;
              if (this.countdown === 0) {
                clearInterval(interval);
                this.router.navigate(['/login']); // Redirige al usuario
              }
            }, 1000); // Disminuye en 1 cada segundo
          } else {
            this.validacionDatos = false;
            // Si data no es true, manejar como un error
            console.error('Error en el registro:', response.detail);
            this.registrationError = true; // Esto mostrará un mensaje de error en la interfaz de usuario
          }
        },
        error => {
          this.validacionDatos = true;
         // this.validacionDatos = false;
          // Aquí manejas los errores
          console.error(error);
          

        }
      );
    } else {
      // Asegúrate de que el formulario se ha tocado para que se muestren los errores de validación
      this.registerForm.markAllAsTouched();
    }
  }


}
