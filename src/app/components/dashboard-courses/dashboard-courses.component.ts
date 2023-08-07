import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-courses',
  templateUrl: './dashboard-courses.component.html',
  styleUrls: ['./dashboard-courses.component.css']
})
export class DashboardCoursesComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private courseService: CourseService) { }
  user: any = {};
  courses: any = [];
  accounts: boolean;
  submitCourse: boolean;
  course: boolean;
  student: boolean;
  exist: boolean = false;
  empty: boolean = false;
  connectedUser = localStorage.getItem("userId")

  ngOnInit() {
    // check if user connected or not
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
        }
      )
    }

    this.courseService.getAllCourses().subscribe((data) => {
      for (let j = 0; j < data.courses.length; j++) {
        if (data.courses[j].userId == this.connectedUser) {
          this.courses.push(data.courses[j]);
          this.empty = true
        }
        for (let i = 0; i < data.courses[j].applyedStudent.length; i++) {
          if (this.connectedUser == data.courses[j].applyedStudent[i].userId) {
            this.courses.push(data.courses[j])
            this.empty = true
          }
        }
      }
    });
  }

  // Methode Logout
  logout() {
    this.userService.logout();
  }
}
