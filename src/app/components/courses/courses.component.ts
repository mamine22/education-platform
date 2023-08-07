import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private courseService: CourseService) { }
  //new variable
  signupForm:FormGroup
  courses: any=[];
  ngOnInit() {
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data.courses
      console.log(data.courses)
    });
  }

  searshCourse(searsh){
    this.courseService.searsh(searsh).subscribe((data)=>{
      console.log(data.course)
      this.courses = data.course
    });
  }

}
