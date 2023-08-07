import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { connected } from 'process';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-profil',
  templateUrl: './dashboard-profil.component.html',
  styleUrls: ['./dashboard-profil.component.css']
})
export class DashboardProfilComponent implements OnInit {

  signupForm: FormGroup;
  imagePreview: any;
  user: any = {};
  accounts: boolean;
  submitCourse: boolean;
  course: boolean;
  parent: boolean;
  student: boolean;
  exist: boolean = false;
  file: any;
  connectedUser = localStorage.getItem("userId")

  constructor(private FormBuilder: FormBuilder, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.signupForm = this.FormBuilder.group({
      img: [""]
    })
    if (this.connectedUser) {
      this.userService.getUserById(this.connectedUser).subscribe(
        (data) => {
          console.log("user data:", data.user)
          this.user = data.user;
          this.exist = true;
          if (data.user.role == "admin") {
            this.accounts = true;
          }

          //Header 'submitCourse'
          if (data.user.role == "teacher") {
            this.submitCourse = true;
          }

          //Header 'my courses and message teacher'
          if (data.user.role == "teacher") {
            this.course = true;
          }

          //Header 'my courses and message student'
          if (data.user.role == "student") {
            this.course = true;
            this.student = true;
          }
           //Header 'parent'
           if (data.user.role == "parent") {
            this.parent = true;
          }
        }
      )
    }
    
  }

  onImageSelected(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(this.file);
  }

  updatePhoto() {
    let formData = new FormData()
    formData.append("img", this.file);
    this.userService.uploadPhoto(this.connectedUser, formData).subscribe((data) => {
      console.log(data.message)
    })
  }

  // Methode Logout
  logout() {
    this.userService.logout();
  }
}



