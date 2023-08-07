import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-course-area',
  templateUrl: './single-course-area.component.html',
  styleUrls: ['./single-course-area.component.css']
})
export class SingleCourseAreaComponent implements OnInit {
  @Input() inputCourse:any;

  constructor() { }

  ngOnInit() {
  }

}
