import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  userData;

  constructor(private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userData = this.activatedRoute.snapshot.data.LoginResolver;
    this.authTitle = this.userData.auth.login_message;
  }

  login() {
    const data = {
      password: this.loginForm.controls.password.value,
      first_name: this.loginForm.controls.name.value,
      last_name: this.loginForm.controls.lastname.value,
      token: this.authService.getToken()
    };
    this.userAuthService.login(data).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['auth/progress']);
  }

}
