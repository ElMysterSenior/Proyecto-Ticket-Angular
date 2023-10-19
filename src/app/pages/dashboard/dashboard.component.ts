import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { Subscription } from 'rxjs';
import { Meta } from '@angular/platform-browser'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoginOn:boolean=false;
  userData?:User;
  private userLoginOnSubscription: Subscription = null!;
  private userDataSubscription: Subscription = null!;


  constructor(private loginService:LoginService, private meta: Meta){}
  ngOnDestroy(): void {
    this.userLoginOnSubscription.unsubscribe();
    this.userDataSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.userLoginOnSubscription = this.loginService.userLoginOn.subscribe({
        next: (userLoginOn) => {
            console.log('userLoginOn:', userLoginOn);
            this.userLoginOn = userLoginOn;
        }
    });
    this.userDataSubscription = this.loginService.userData.subscribe({
        next: (userData) => {
            console.log('userData:', userData);
            this.userData = userData;
        }
    });
    this.meta.addTags([
      { 'http-equiv': 'Cache-Control', content: 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0' },
      { 'http-equiv': 'Pragma', content: 'no-cache' },
      { 'http-equiv': 'Expires', content: '0' },
    ]);
  }
 


}
