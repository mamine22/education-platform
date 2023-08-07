import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
  @Input() inputCourse: any;
  user: any = {}
  connectedUser = localStorage.getItem("userId")
  constructor(private userService: UserService,private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserById(this.inputCourse.userId).subscribe((data) => {
      this.user = data.user;
    })
  }

  goToCourseDetails() {
    this.router.navigate([`course-details/${this.inputCourse._id}`]);
  }
  deleteCourse() {
    this.courseService.deleteCourse(this.inputCourse._id).subscribe((data)=>{
    })
  }

}
