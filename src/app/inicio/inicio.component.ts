import { Component, OnInit,  Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  user: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {   
    if (isPlatformBrowser(this.platformId)) {
      const userValue = localStorage.getItem('user');
      if (userValue) {
        const userv = JSON.parse(userValue);
        if (userv && userv.accessToken) {
          this.user = userv;
          this.router.navigate(['/user']);
        }else{
          this.router.navigate(['/login']);
        } 
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  

}
