import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-without-token-login',
  templateUrl: './without-token-login.component.html',
  styleUrls: ['./without-token-login.component.sass']
})
export class WithoutTokenLoginComponent implements OnInit {

  constructor() { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  ngOnInit() {
  }

}
