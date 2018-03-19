import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { UserAuthService } from '../../shared/user-auth.service';

@Component({
  selector: 'app-without-token-login',
  templateUrl: './without-token-login.component.html',
  styleUrls: ['./without-token-login.component.sass']
})
export class WithoutTokenLoginComponent implements OnInit {

  errorMsg = '';
  errorFlag = false;
  constructor(private router: Router,
    public authService: AuthService,
    private userAuthService: UserAuthService) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });


  ngOnInit() {
  }

  login() {
    const data = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
    this.userAuthService.loginUser(data).subscribe((res) => {
      this.authService.updateUser(res);
      if (this.authService.userData.survey_response.token) {
        this.authService.getApplicantType(this.authService.userData.survey_response.token)
          .subscribe(() => {
            this.router.navigate(['auth/progress']);
          });
        return;
      }
      this.authService.loginErrorFlag = true;
    }, ((err) => {
      this.errorFlag = true;
      this.errorMsg = err.error.error;
    }));
  }

}
