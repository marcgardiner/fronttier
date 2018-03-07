import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../shared/user-auth.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  authTitle: string;

  constructor(private router: Router,
  private authService: AuthService) { }

  ngOnInit() {
    const userType = this.authService.getUserType().auth;
    this.authTitle = userType.login_message;
  }

  login() {
    const data = {
      email: 'test@test.com',
      password: '123456'
    };
    // this.authService.login(data).subscribe((res) => {
    //   console.log(res);
    // });
    this.router.navigate(['auth/progress']);
  }

}
