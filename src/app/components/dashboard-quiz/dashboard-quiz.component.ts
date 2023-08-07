import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-quiz',
  templateUrl: './dashboard-quiz.component.html',
  styleUrls: ['./dashboard-quiz.component.css']
})
export class DashboardQuizComponent implements OnInit {

  user: any = {};
  account: boolean;
  submitCourse: boolean;
  course: boolean;
  parent: boolean;
  student: boolean;
  exist: boolean = false;
  applyedToCourses: any = [];
  quiz: any = {};
  connectedUser = localStorage.getItem("userId")

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.connectedUser) {
      this.userService.getUserById(this.connectedUser).subscribe(
        (data) => {
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
            this.student = true;
          }
          //Header 'parent'
          if (data.user.role == "parent") {
            this.parent = true;
          }

        }
      )
    }

    // display all student affected to connected teacher
    this.userService.getApplyedStudentById(this.connectedUser).subscribe((data) => {
      this.applyedToCourses = data.applyed
    });

  }
  logout() {
    this.userService.logout();
  }
}
