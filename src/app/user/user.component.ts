import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
