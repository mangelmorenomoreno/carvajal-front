import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    private router: Router
  ) { }

  logout(): void {
    localStorage.removeItem('user'); // Elimina la información del usuario de localStorage
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }
}
