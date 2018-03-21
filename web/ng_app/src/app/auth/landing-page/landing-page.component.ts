import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService) { }
  userData: Object;
  returnedUser = false;

  ngOnInit() {
    this.userData = this.authService.userData;
    this.returnedUser = this.userData['last_login'] ? true : false;
  }

}
