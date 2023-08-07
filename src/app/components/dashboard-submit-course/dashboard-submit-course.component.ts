import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-submit-course',
  templateUrl: './dashboard-submit-course.component.html',
  styleUrls: ['./dashboard-submit-course.component.css']
})
export class DashboardSubmitCourseComponent implements OnInit {
  user: any = {};
  course: any = {};
  courses: boolean = false;
  submitCourses: boolean = false;
  account: boolean = false;
  connectedUser = localStorage.getItem("userId")

  imagePreview: any;
  file:any

  courseForm: FormGroup;
  constructor(private router: Router, private userService: UserService,private courseService: CourseService) { }

  ngOnInit() {
    if (this.connectedUser) {
      this.userService.getUserById(this.connectedUser).subscribe(
        (data) => {
          this.user = data.user
          console.log("user data:", data.user)
          if (data.user.role == "admin") {
            this.account = true;
          }
          //Header 'submitCourse'
          if (data.user.role == "teacher") {
            this.submitCourses = true;
          }
          //Header 'my courses and message teacher'
          if (data.user.role == "teacher") {
            this.courses = true;
          }

          //Header 'my courses and message student'
          if (data.user.role == "student") {
            this.courses = true;
          }
        }
      )
    }
  }
  onImageSelected(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(this.file);
  }

  submitNewCourse(){
    console.log(this.connectedUser)
    this.courseService.submitCourse(this.connectedUser,this.course,this.file).subscribe((data)=>{
      console.log(data.message)   
    })
    this.router.navigate(['/dashboard-courses'])
  }

   // Methode Logout
   logout() {
    this.userService.logout();
  }

}
