import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-accounts',
  templateUrl: './dashboard-accounts.component.html',
  styleUrls: ['./dashboard-accounts.component.css']
})
export class DashboardAccountsComponent implements OnInit {
  user: any = {};
  users: any = [];
  teachers: any = [];
  account: boolean;
  submitCourse: boolean;
  course: boolean;
  exist: boolean = false;
  connectedUser = localStorage.getItem("userId");

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.connectedUser) {
      this.userService.getUserById(this.connectedUser).subscribe(
        (data) => {
          console.log("user data:", data.user)
          this.user = data.user;
          this.exist = true;
          if (data.user.role == "admin") {
            this.account = true;
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
          }

        }
      )
    }
    // get all users
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.users
      for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].role == "teacher") {
          this.teachers.push(data.users[i])
        }
      }
    });
  }

  affectation(userId) {
    this.router.navigate([`affect-student/${userId}`])
  }

  deleteAccount(id) {
    this.userService.deleteUser(id).subscribe((data) => {
      console.log(data.isDeleted)
    })
  }

  acceptAccount(id) {
    this.userService.validUser(this.user, id).subscribe((data) => {
      console.log(data.isUpdated)
    })
  }

  logout() {
    this.userService.logout();
  }
}

