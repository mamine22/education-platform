import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-course-area',
  templateUrl: './course-area.component.html',
  styleUrls: ['./course-area.component.css']
})
export class CourseAreaComponent implements OnInit {

  constructor(private router: Router, private courseService: CourseService) { }

  // New Var
  courses: any;
  ngOnInit() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data.courses
    })
    // this.courseService.googleMap().subscribe((data) => {
     
    // })
  }

  goToCourseDetails(id) {
    this.router.navigate([`course-details/${id}`])
  }

}
