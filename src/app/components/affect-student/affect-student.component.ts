import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-affect-student',
  templateUrl: './affect-student.component.html',
  styleUrls: ['./affect-student.component.css']
})
export class AffectStudentComponent implements OnInit {

  constructor(private userService: UserService, private activateRoute: ActivatedRoute) { }
  teachers: any = []
  id: any;
  user: any = {}
  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data.user;
    })

    // get all users
    this.userService.getAllUsers().subscribe((data) => {
      for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].role == "teacher") {
          this.teachers.push(data.users[i])
        }
      }
    })

    this.userService.getTeachertByAffectation(this.id).subscribe((data)=>{
      console.log("get Teachert By Affectation",data.teachers) 

    })
  }
  affectation(teacherId) {
    this.userService.affectation(this.user, teacherId).subscribe((data) => {
      console.log("affectation",data.message) 
    })
  }


}
