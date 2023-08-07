import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardProfilComponent } from './components/dashboard-profil/dashboard-profil.component';
import { ConfirmSMSComponent } from './components/confirm-sms/confirm-sms.component';
import { DashboardSubmitCourseComponent } from './components/dashboard-submit-course/dashboard-submit-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleFeedbackComponent } from './components/single-feedback/single-feedback.component';
import { DashboardCoursesComponent } from './components/dashboard-courses/dashboard-courses.component';
import { DashboardAccountsComponent } from './components/dashboard-accounts/dashboard-accounts.component';
import { DashboardSettingsComponent } from './components/dashboard-settings/dashboard-settings.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SingleTeacherComponent } from './components/single-teacher/single-teacher.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AboutComponent } from './components/about/about.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { AffectStudentComponent } from './components/affect-student/affect-student.component';
import { DashboardClassComponent } from './components/dashboard-class/dashboard-class.component';
import { DashboardChildComponent } from './components/dashboard-child/dashboard-child.component';
import { DashboardQuizComponent } from './components/dashboard-quiz/dashboard-quiz.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';


const routes: Routes = [
  {path:"" ,component:HomeComponent},
  {path:"signup" ,component:SignupComponent},
  {path:"signup-student" ,component:SignupStudentComponent},
  {path:"signup-teacher" ,component:SignupTeacherComponent},
  {path:"signup-parent" ,component:SignupParentComponent},
  {path:"signup-admin" ,component:SignupAdminComponent},
  {path:"login" ,component:LoginComponent},
  {path:"affect-student/:id" ,component:AffectStudentComponent},
  {path:"dashboard" ,component:DashboardComponent},
  {path:"dashboard-profil/:id" ,component:DashboardProfilComponent},
  {path:"dashboard-submit-course" ,component:DashboardSubmitCourseComponent},
  {path:"dashboard-courses" ,component:DashboardCoursesComponent},
  {path:"dashboard-accounts" ,component:DashboardAccountsComponent},
  {path:"dashboard-settings" ,component:DashboardSettingsComponent},
  {path:"dashboard-class" ,component:DashboardClassComponent},
  {path:"dashboard-child" ,component:DashboardChildComponent},
  {path:"dashboard-quiz" ,component:DashboardQuizComponent},
  {path:"courses" ,component:CoursesComponent},
  {path:"teachers" ,component:TeachersComponent},
  {path:"blogs" ,component:BlogsComponent},
  {path:"about" ,component:AboutComponent},
  {path:"quiz/:courseId/:userId" ,component:QuizComponent},
  {path:"single-course" ,component:SingleCourseComponent},
  {path:"single-teacher" ,component:SingleTeacherComponent},
  {path:"teacher-details/:id" ,component:TeacherDetailsComponent},
  // {path:"single-feedback" ,component:SingleFeedbackComponent},
  {path:"course-details/:id" ,component:CourseDetailsComponent},
  {path:"confirm-SMS/:id" ,component:ConfirmSMSComponent},
  {path:"confirm-email/:id" ,component:ConfirmEmailComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
