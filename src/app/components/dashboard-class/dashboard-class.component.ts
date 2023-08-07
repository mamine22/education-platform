import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-class',
  templateUrl: './dashboard-class.component.html',
  styleUrls: ['./dashboard-class.component.css']
})
export class DashboardClassComponent implements OnInit {
  user: any = {};
  users: any = [];
  teachers: any = [];
  account: boolean;
  submitCourse: boolean;
  course: boolean;
  exist: boolean = false;
  affectStudent: any = [];
  affectTeachers: any = [];
  teacherCourses: any = [];
  quiz: any = {};
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
        }
      )
    }

    // display all student affected to connected teacher
    this.userService.getAllAffectedStudent(this.connectedUser).subscribe((data) => {
      this.affectTeachers = data.teachers
      this.userService.getAllUsers().subscribe((data) => {
        this.users = data.users;
        for (let i = 0; i < this.affectTeachers.length; i++) {
          for (let j = 0; j < this.users.length; j++) {
            if (this.affectTeachers[i].studentId == this.users[j]._id) {
              this.affectStudent.push(this.users[j]);
            }
          }
        };
      });
    });

    //display quiz attempts
    this.courseService.getAllCourses().subscribe((data) => {
      for (let i = 0; i < data.courses.length; i++) {
        for (let j = 0; j < data.courses[i].applyedStudent.length; j++) {
          if (data.courses[i].userId == this.connectedUser) {
            this.teacherCourses.push(data.courses[i].applyedStudent[j])

          }
        }
      }
    });
  }

  logout() {
    this.userService.logout();
  }

  goToCourseDetails(courseId) {
    this.router.navigate([`course-details/${courseId}`]);
  }
  studentNote(userId, course) {
    this.courseService.quizAttempt(userId, course).subscribe((data) => {
    })
  }
}
