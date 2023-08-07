import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private courseService: CourseService, private userService: UserService, private router: Router, private activateRoute: ActivatedRoute) { }

  //new Variable
  connectedUser = localStorage.getItem("userId")
  courseId: any;
  course: any = {}
  user: any = {}
  feedBack: any = {}
  color: string = 'green';
  quizPass:boolean=false;

  applyMsg: string = " Apply to this course"

  feedBacks: any = []
  feedbackForm: FormGroup;

  ngOnInit() {
    this.courseId = this.activateRoute.snapshot.paramMap.get("id");
    console.log("here course", this.courseId)
    this.courseService.getCourseById(this.courseId).subscribe((data) => {
      this.course = data.course
      console.log("here course", data.course)
      this.userService.getUserById(data.course.userId).subscribe((data) => {
        this.user = data.user
      });
    });


    this.courseService.getAllCourses().subscribe((data) => {
      console.log("---------------------", data.courses)
      for (let i = 0; i < data.courses.length; i++) {
        for (let j = 0; j < data.courses[i].applyedStudent.length; j++) {
          if (data.courses[i].applyedStudent[j].userId == this.connectedUser && this.course._id == data.courses[i].applyedStudent[j].courseId) {
            this.applyMsg = "Already Applyed !";
            this.color = "red"
            this.quizPass=true;
          }

        }
      }
    })

    this.courseService.getFeedBackByCourse(this.courseId).subscribe((data) => {
      this.feedBacks = data.feedbacks;
    })
  }
  // Join to course 
  applyedCourse() {
    this.courseService.applyedToCourse(this.course, this.connectedUser).subscribe((data) => {
    })
  }

  sendFeedBack() {
    this.courseService.feedback(this.feedBack, this.courseId, this.connectedUser).subscribe((data) => {
      console.log(data.message)
    })
  }

  goToQuiz(courseId,userId) {
    this.router.navigate([`quiz/${courseId}/${userId}`])
  }

  // updatedFeedbacks(tab:any){
  //   this.feedBacks =tab;
  // }
}
