import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  constructor(private userService: UserService) { }

  teachers: any = [];

  ngOnInit() {
    this.userService.getUserByRole('teacher').subscribe((data) => {
      this.teachers = data.users
    })
  }

}
