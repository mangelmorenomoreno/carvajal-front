import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { InfoUserService } from '../info-user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user: any;
  data: any;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private infoUserService: InfoUserService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userValue = localStorage.getItem('user');
      if (userValue) {
        const userv = JSON.parse(userValue);
        if (userv && userv.accessToken) {
          console.log(localStorage.getItem('user') +"loggg");
          this.infoUserService.findUser(userv.accessToken).subscribe(
            response => {
              if (response.data !== null) {
                console.log('Consulta exitosa', response.data);
                // Redirigir al usuario a la página de inicio o perfil, por ejemplo:
                this.data = response.data;
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



  
}
