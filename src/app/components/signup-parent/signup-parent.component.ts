import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.css']
})
export class SignupParentComponent implements OnInit {

  // signup ID 
  signupForm: FormGroup;

  // signup obj
  user: any = {};

  // var
  errMessage: String;
  errStudent: String;

  constructor(private router: Router, private userService: UserService) {
    this.user.studentNumber = [{
      studentPhone: ''
    }]
  }

  ngOnInit() {
  }

  // Create New Teacher
  signup() {
    this.user.role = "parent"
    this.user.status = "not-valid"
    console.log(this.user)

    this.userService.signupParent(this.user).subscribe(
      (data) => {
        this.errMessage = "";
        if (data.message) {
          this.router.navigate(['/login'])
        } else {
          if (data.errMessage) {
            this.errStudent = data.errMessage
          } else {
            this.errStudent = '';
            this.errMessage = "Email Or Phone Number Already Exist !";
          }
        }
      }
    )
  }

  newBox() {
    this.user.studentNumber.push({
      studentPhone: ''
    })
  }
}
