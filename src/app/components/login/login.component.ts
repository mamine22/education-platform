import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // form
  loginForm: FormGroup;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  errorMsg: string
  user: any = {};
  
  // Methode Login
  login() {
    this.userService.login(this.user)
    let test = this.userService.getErrorMsg()
    if (test == false) {
      this.errorMsg = 'Please Check Your Email/Password !'
    }
  }

}
