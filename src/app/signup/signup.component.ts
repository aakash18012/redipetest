import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MustMatch} from '../_helpers/must-match.validator';
import {Router} from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
    constructor(public router: Router, private formBuilder: FormBuilder) { }

    ngOnInit() {
      this.registerForm = this.formBuilder.group({
        userName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        termsAndConditions: [false, Validators.required]
      }, {
        validator: MustMatch('password', 'confirmPassword')
      });
    }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    let myArray = [];
    const currentuser = [];
    const loginobj = {
      userName: '',
      password: ''
    };
    loginobj.userName = this.registerForm.value.userName;
    loginobj.password = this.registerForm.value.password;
    if (JSON.parse(localStorage.getItem('isLoggedin'))) {
      myArray = JSON.parse(localStorage.getItem('isLoggedin'));
      if (myArray.length > 0) {
        myArray.push(loginobj);
      }else {
        myArray.push(loginobj);
      }}else {
      myArray.push(loginobj);
    }
    localStorage.setItem('isLoggedin',  JSON.stringify(myArray));
    localStorage.setItem('currentuser',  JSON.stringify(loginobj));
    this.router.navigate(['/login']);
  }
}
