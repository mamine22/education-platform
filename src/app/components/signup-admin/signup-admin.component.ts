import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {

 
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

  // Create New Admin
  signup() {  
    this.user.role = "admin"
    this.userService.signupAdmin(this.user).subscribe(
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
