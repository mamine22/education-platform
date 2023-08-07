import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-teacher',
  templateUrl: './single-teacher.component.html',
  styleUrls: ['./single-teacher.component.css']
})
export class SingleTeacherComponent implements OnInit {
  @Input() inputTeacher:any;

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goToTeacher(id){
    this.router.navigate([`teacher-details/${id}`])
  }

}
