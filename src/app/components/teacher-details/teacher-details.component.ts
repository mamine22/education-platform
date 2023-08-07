import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.css']
})
export class TeacherDetailsComponent implements OnInit {

  constructor(private userService: UserService, private courseService: CourseService, private activateRoute: ActivatedRoute, public sanitizer: DomSanitizer) { }
  id: any;
  user: any = {}
  courses: any = [];
  feedbacks: any = [];
  count: any = 0;
  students: any = 0;
  feedback: any = 0;
  url: string;
  urlSafe: SafeResourceUrl;
  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data.user;
      this.url = data.user.cv
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    })

    this.courseService.getAllCourses().subscribe((data) => {
      for (let j = 0; j < data.courses.length; j++) {
        if (data.courses[j].userId == this.id) {
          this.courses.push(data.courses[j]);
          this.count++
        }
      }
    })

    this.courseService.getAllCourses().subscribe((data) => {
      for (let i = 0; i < data.courses.length; i++) {
        for (let j = 0; j < data.courses[i].applyedStudent.length; j++) {
          this.students++
        }
      }
    });
    this.courseService.getAllFeedback(this.id).subscribe((data) => {
      this.feedbacks = data.feedbacks
      for (let i = 0; i < this.courses.length; i++) {
        for (let j = 0; j < data.feedbacks.length; j++) {
          if (this.feedbacks[j].courseId == this.courses[i]._id) {
            this.feedback++
          }
        }
      }
    });
  }



}
