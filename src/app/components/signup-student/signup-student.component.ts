import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {

  // signup ID 
  signupForm: FormGroup;

  // signup obj
  user: any = {};

  // var
  errMessage: String;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  // Create New Student
  signup() {
    // ADD Static variable To Formgroup
    this.user.role = "student"
    this.user.status = "not-valid"
    // Methode Signup Student
    this.userService.signupStudent(this.user).subscribe(
      (data) => {
        if (data.message) {
          //Navigate to Login page
          this.router.navigate(['/login'])
        } else {
          // Error Message
          this.errMessage = "Email Or Phone Number Already Exist !";
        }
      }
    )
  }
}
