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
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  authTitle: string;
  userData;

  constructor(private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userData = this.activatedRoute.snapshot.data.LoginResolver;
    if (this.userData.user.first_name) {
      this.loginForm.controls.name.setValue(this.userData.user.first_name);
      this.loginForm.controls.name.disable();
      if (this.userData.user.last_name) {
        this.loginForm.controls.lastname.setValue(this.userData.user.last_name);
        this.loginForm.controls.lastname.disable();
      }
    }
    if (this.userData.user.email) {
      this.loginForm.controls.email.setValue(this.userData.user.email);
      this.loginForm.controls.email.disable();
    }
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
      if (res.user.type === 'hiring_manager') {
        this.router.navigate(['hiring']);
        return;
      } else if (res.user.type === 'administrator') {
        this.router.navigate(['admin']);
        return;
      }
      this.router.navigate(['auth/progress']);
    });
  }

}
