import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private courseService: CourseService) { }
  user: any = {};
  users: any = [];
  accounts: boolean;
  submitCourse: boolean;
  course: boolean;
  parent: boolean;
  student: boolean;
  exist: boolean = false;
  connectedUser = localStorage.getItem("userId")
  students: any = 0;
  teachers: any = 0;
  courses: any = 0;

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

    this.userService.getAllUsers().subscribe((data) => {
      for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].role == 'student') {
          this.students++;
        }
        if (data.users[i].role == 'teacher') {
          this.teachers++;
        }
      }
    })
    this.courseService.getAllCourses().subscribe((data)=>{
      this.courses=data.courses.length
    })
  }

  logout() {
    this.userService.logout();
  }

}
