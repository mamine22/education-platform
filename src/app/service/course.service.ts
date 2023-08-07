import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // Backend Server Address
  courseURL: string = "http://localhost:3000/courses";
  // HttpClient
  constructor(private httpClient: HttpClient) { }

  // GET all courses 
  getAllCourses() {
    return this.httpClient.get<{ courses: any }>(this.courseURL)
  }

  // Response : one Course
  getCourseById(id) {
    return this.httpClient.get<{ course: any }>(`${this.courseURL}/${id}`)
  }

  // Response : Boolean
  deleteCourse(id) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.courseURL}/${id}`)
  }

  // Response : Message
  submitCourse(id: any, course: any, file: File) {
    let formData = new FormData()

    formData.append("title", course.title);
    formData.append("level", course.level);
    formData.append("category", course.category);
    formData.append("hours", course.hours);
    formData.append("language", course.language);
    formData.append("day", course.day);
    formData.append("month", course.month);
    formData.append("year", course.year);
    formData.append("description", course.description);
    formData.append("videoTitle", course.videoTitle);
    formData.append("videoCategory", course.videoCategory);
    formData.append("userId", id);
    formData.append("video", file);

    return this.httpClient.post<{ message: boolean }>(`${this.courseURL}/${id}`, formData)
  }

  // Response : message
  applyedToCourse(course: any, applyed: any) {
    return this.httpClient.post<{ message: boolean }>(`${this.courseURL}/course-details/${applyed}`, course)
  }

  // GET Applyed to course by id
  getApplyedToCourseById(id) {
    return this.httpClient.get<{ applyed: any }>(`${this.courseURL}/myCourse/${id}`)
  }

  // Response : message
  feedback(obj: any, courseId: any, userId: any) {
    return this.httpClient.post<{ message: any }>(`${this.courseURL}/feedback/${courseId}/${userId}`, obj)
  }

  // Response : one object
  getFeedBackByCourse(id) {
    return this.httpClient.get<{ feedbacks: any }>(`${this.courseURL}/feedbacks/${id}`)
  }

  // GET all feedbacks 
  getAllFeedbacks() {
    return this.httpClient.get<{ feedbacks: any }>(this.courseURL + "/all-feedbacks/here")
  }

  // GET all feedbacks (id)
  getAllFeedback(id) {
    return this.httpClient.get<{ feedbacks: any }>(`${this.courseURL}/getfeedbacksById/${id}`)
  }

  // Searsh Course (id)
  searsh(id) {
    return this.httpClient.get<{ course: any }>(`${this.courseURL}/searsh/${id}`)
  }

  // QUIZ (id)
  quizAttempt(id, obj) {
    return this.httpClient.put<{ isConfirmed: any }>(this.courseURL + "/postNote/" + id, obj)
  }
}
