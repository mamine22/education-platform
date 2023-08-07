import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-child',
  templateUrl: './dashboard-child.component.html',
  styleUrls: ['./dashboard-child.component.css']
})
export class DashboardChildComponent implements OnInit {

  user: any = {};
  users: any = [];
  account: boolean;
  submitCourse: boolean;
  course: boolean;
  parent: boolean;
  exist: boolean = false;
  applyedToCourses: any = [];
  teachersCourses: any = [];
  numbers: any = []
  connectedUser = localStorage.getItem("userId")

  constructor(private userService: UserService, private courseService: CourseService, private router: Router) { }

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
          }
          //Header 'parent'
          if (data.user.role == "parent") {
            this.parent = true;
          }
        }
      )
    }

    // display all student affected to connected teacher
    this.userService.getApplyedStudent().subscribe((data) => {
      this.applyedToCourses = data.applyed
    });

    this.userService.getUserById(this.connectedUser).subscribe((data) => {
      this.numbers = data.user.studentNumber
      for (let i = 0; i < this.numbers.length; i++) {
        this.userService.getUserByPhone(this.numbers[i].studentPhone).subscribe((student) => {
          for (let j = 0; j < this.applyedToCourses.length; j++) {
            if (student.user[0]._id == this.applyedToCourses[j].userId) {
              this.teachersCourses.push(this.applyedToCourses[j]) 
            }
          }
        })
      }
    });
  }

}
