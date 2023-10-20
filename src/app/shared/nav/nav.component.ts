import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  userRole?: string;
  private loginSubscription: Subscription[] = [];

  constructor(private loginService: LoginService) {}

  ngOnDestroy(): void {
    this.loginSubscription.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.loginSubscription.push(
      this.loginService.currentUserLoginOn.subscribe({
        next: (userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      })
    );
    
    this.loginSubscription.push(
      this.loginService.currentUserData.subscribe({
        next: (userData) => {
          this.userRole = userData.role;
        }
      })
    );
  }
  
  onMouseEnter(event: Event): void {
    const target = event.target as HTMLElement;
    const parent = target.closest('.nav-item');
    if (parent) {
      parent.classList.add('show');
      const menu = parent.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.add('show');
      }
    }
  }

  onMouseLeave(event: Event): void {
    const target = event.target as HTMLElement;
    const parent = target.closest('.nav-item');
    if (parent) {
      parent.classList.remove('show');
      const menu = parent.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.remove('show');
      }
    }
  }
}
