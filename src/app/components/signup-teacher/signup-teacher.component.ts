import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {

  // signup ID 
  signupForm: FormGroup;

  // signup obj
  user: any = {};

  // var
  errMessage: String;
  imagePreview: any;

  file:any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }
  onImageSelected(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(this.file);
  }
  // Create New Teacher
  signup() {  
    this.user.role = "teacher"
    this.user.status = "not-valid" 
    this.userService.signupTeacher(this.user,this.file).subscribe(
      (data) => {
        if (data.message) {
          this.router.navigate(['/login'])
        } else {
          this.errMessage = "Email Or Phone Number Already Exist !";
        }
      }
    )
  }
}
