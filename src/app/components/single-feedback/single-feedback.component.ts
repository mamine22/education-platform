import { Component, EventEmitter,Input, OnInit, Output } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-single-feedback',
  templateUrl: './single-feedback.component.html',
  styleUrls: ['./single-feedback.component.css']
})
export class SingleFeedbackComponent implements OnInit {
  @Input() inputFeedback:any;
  @Output() feedbackEmitter:EventEmitter<any> = new EventEmitter();

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAllFeedbacks().subscribe((data) => {
      this.feedbackEmitter.emit(data.feedbacks)
    })
  }

}
