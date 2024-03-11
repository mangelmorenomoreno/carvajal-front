import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { UpdateUserService } from '../update-user.service';
import { InfoUserService } from '../info-user.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
  user = {
    nombre: '',
    apellido: '',
    correo: ''
  };
  countdown: number = 10;
  data: any;
  errorUpdate: boolean = false;
  errorFormulario: boolean = false;
  registrationSuccess: boolean = false;
  registerForm: FormGroup;
  registerForm2: FormGroup;
  actualizarPasword: boolean = false;
  errorUpdatePasword: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private updateUserService: UpdateUserService,
    private infoUserService: InfoUserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    });

    this.registerForm2 = this.formBuilder.group({
      passwordNew: ['', Validators.required],
      passwordOld: ['', Validators.required]
    });
  }

  updateUserInfo(): void {
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {
        if (this.registerForm.valid) {
          this.updateUserService.updateUser(this.registerForm.value, userv.accessToken).subscribe(
            response => {
              if (response.data === true) {
                this.registrationSuccess = true;
                this.errorUpdate = false;
                console.log('Usuario actualizado con éxito', response);

                const interval = setInterval(() => {
                  this.countdown--;
                  if (this.countdown === 0) {
                    clearInterval(interval);
                    this.router.navigate(['/user']); // Redirige al usuario
                  }
                }, 1000); // Disminuye en 1 cada segundo

              } else {
                this.errorUpdate = true;
              }

            },
            error => {
              this.errorUpdate = true;
              console.error('Error al actualizar el usuario', error);
            }
          );
        } else {
          this.registerForm.markAllAsTouched();
        }
      }
    }
  }


  updatePassword(): void {
    console.log('Ejecuta peticion');
    const userValue = localStorage.getItem('user');
    if (userValue) {
      const userv = JSON.parse(userValue);
      if (userv && userv.accessToken) {
        if (this.registerForm2.valid) {

          const encodedPassword = btoa(this.registerForm2.value.passwordOld);
          const encodedPasswordNew = btoa(this.registerForm2.value.passwordNew);
          const encodedData = {
            ...this.registerForm2.value,
            passwordOld: encodedPassword, // Reemplazar el password con su versión en Base64
            passwordNew: encodedPasswordNew 
          };

          this.updateUserService.updateUserPasword(encodedData, userv.accessToken).subscribe(
            response => {
              if (response.data === true) {
                this.registrationSuccess = true;
                this.errorUpdatePasword = false;
                console.log('Usuario actualizado con éxito', response);

                const interval = setInterval(() => {
                  this.countdown--;
                  if (this.countdown === 0) {
                    clearInterval(interval);
                    this.router.navigate(['/user']); // Redirige al usuario
                  }
                }, 1000); // Disminuye en 1 cada segundo

              } else {
                this.errorUpdatePasword = true;
              }

            },
            error => {
              this.errorUpdatePasword = true;
              console.error('Error al actualizar el usuario', error);
            }
          );
        } else {
          this.registerForm2.markAllAsTouched();
        }
      }
    }
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userValue = localStorage.getItem('user');
      if (userValue) {
        const userv = JSON.parse(userValue);
        if (userv && userv.accessToken) {

          this.infoUserService.findUser(userv.accessToken).subscribe(
            response => {
              if (response.data !== null) {
                this.data = response.data;
                this.registerForm.setValue({
                  nombre: response.data.nombre,
                  apellido: response.data.apellido || '',
                  correo: response.data.correoElectronico || ''
                });
                console.log('Consulta exitosa', response.data);
                // Redirigir al usuario a la página de inicio o perfil, por ejemplo:
                
                
              } else {
                // Si data no es true, manejar como un error
                console.error('Error en la consulta:', response);
              }
            },
            error => {
              // this.validacionDatos = false;
              // Aquí manejas los errores
              console.error(error);
            }
          );
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    } else {

    }
    

  }
  logout(): void {
    localStorage.removeItem('user'); // Elimina la información del usuario de localStorage
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
  changePassword() {
    this.actualizarPasword = true;

  }
  changeUser() {
    this.actualizarPasword = false;

  }
}
