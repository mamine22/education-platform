import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.css']
})
export class DashboardSettingsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  user: any = {};
  accounts: boolean;
  submitCourse: boolean;
  course: boolean;
  parent: boolean;
  student: boolean;
  exist: boolean = false;
  connectedUser = localStorage.getItem("userId")

  ngOnInit() {
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
  editProfile() {
    this.userService.editUser(this.user).subscribe((data) => {
      console.log(data.isUpdated)
    })
    this.router.navigate([`dashboard-profil/${this.user._id}`])
  }
  // Methode Logout
  logout() {
    this.userService.logout();
  }

}
