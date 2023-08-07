import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { LoginComponent } from './components/login/login.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardProfilComponent } from './components/dashboard-profil/dashboard-profil.component';
import { ConfirmSMSComponent } from './components/confirm-sms/confirm-sms.component';
import { DashboardSubmitCourseComponent } from './components/dashboard-submit-course/dashboard-submit-course.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SingleCourseComponent } from './components/single-course/single-course.component';
import { HeroAreaComponent } from './components/hero-area/hero-area.component';
import { FeatureComponent } from './components/feature/feature.component';
import { CategoryAreaComponent } from './components/category-area/category-area.component';
import { FunFactComponent } from './components/fun-fact/fun-fact.component';
import { CourseAreaComponent } from './components/course-area/course-area.component';
import { StartedAreaComponent } from './components/started-area/started-area.component';
import { TestimonialAreaComponent } from './components/testimonial-area/testimonial-area.component';
import { AboutAreaComponent } from './components/about-area/about-area.component';
import { SingleCourseAreaComponent } from './components/single-course-area/single-course-area.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleFeedbackComponent } from './components/single-feedback/single-feedback.component';
import { DashboardCoursesComponent } from './components/dashboard-courses/dashboard-courses.component';
import { DashboardAccountsComponent } from './components/dashboard-accounts/dashboard-accounts.component';
import { DashboardSettingsComponent } from './components/dashboard-settings/dashboard-settings.component';
import { JwtHelperService } from './service/jwt-helper.service';
import { JwtInterceptor } from './http-interceptors/auth-interceptor';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SignupStudentComponent,
    SignupTeacherComponent,
    SignupParentComponent,
    SignupAdminComponent,
    LoginComponent,
    DashboardProfilComponent,
    ConfirmSMSComponent,
    DashboardSubmitCourseComponent,
    CourseDetailsComponent,
    CoursesComponent,
    SingleCourseComponent,
    HeroAreaComponent,
    FeatureComponent,
    CategoryAreaComponent,
    FunFactComponent,
    CourseAreaComponent,
    StartedAreaComponent,
    TestimonialAreaComponent,
    AboutAreaComponent,
    SingleCourseAreaComponent,
    SignupComponent,
    SingleFeedbackComponent,
    DashboardCoursesComponent,
    DashboardAccountsComponent,
    DashboardSettingsComponent,
    TeachersComponent,
    SingleTeacherComponent,
    TeacherDetailsComponent,
    BlogsComponent,
    AboutComponent,
    QuizComponent,
    AffectStudentComponent,
    DashboardClassComponent,
    DashboardChildComponent,
    DashboardQuizComponent,
    DashboardComponent,
    ConfirmEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [   
   { provide: HTTP_INTERCEPTORS, useClass: JwtHelperService, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
