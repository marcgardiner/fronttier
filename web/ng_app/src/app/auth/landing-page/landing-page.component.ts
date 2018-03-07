import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService) { }
  userData: Object;
  returnedUser = false;

  ngOnInit() {
    this.userData = this.authService.getUserType();
    this.returnedUser = this.userData['last_login'] ? true : false;
  }

}
