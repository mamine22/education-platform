import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Backend Server Address
  userURL: string = "http://localhost:3000/users";

  public token: string;
  private authStatusListener = new Subject<boolean>();
  private errorMsg = true;
  private isUserAuthenticated = false;
  private user: any = {};

  // HttpClient
  constructor(private httpClient: HttpClient, private router: Router) { }

  // Signup Form For student
  signupStudent(user: any) {
    return this.httpClient.post<{ message: boolean }>(this.userURL + "/signup-student", user)
  }

  // Signup Form For teacher
  signupTeacher(user: any, file: File) {
    let formData = new FormData()

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phone", user.phone);
    formData.append("role", user.role);
    formData.append("speciality", user.speciality);
    formData.append("status", user.status);
    formData.append("bio", user.bio);
    formData.append("cv", file);

    return this.httpClient.post<{ message: boolean }>(this.userURL + "/signup-teacher", formData)
  }

  // Signup Form For admin
  signupAdmin(user: any) {
    return this.httpClient.post<{ message: boolean }>(this.userURL + "/signup-admin", user)
  }

  // Signup Form For parent
  signupParent(user: any) {
    return this.httpClient.post<{ message: boolean, errMessage: any }>(this.userURL + "/signup-parent", user)
  }

  // Upload Photo
  uploadPhoto(id: any, file: any) {
    return this.httpClient.put<{ message: boolean }>(`${this.userURL}/dashboard-profil/${id}`, file)
  }

  // Login
  login(user) {

    return this.httpClient.post<{ user: any, message: any }>(this.userURL + "/login", user).subscribe((res) => {
      if (res.message == '1') {
        this.errorMsg = false;
      }

      const token = res.user.jwt;
      this.token = token;

      if (res.user.access.includes('@')) {

        if (token && res.user.status == 'valid') {
          this.isUserAuthenticated = true;
          this.authStatusListener.next(true);
          localStorage.setItem('token', token);
          localStorage.setItem('userId', res.user.id);
          localStorage.setItem('role', res.user.role);
          this.router.navigate([`/dashboard-profil/${res.user.id}`]);
        } else {
          this.router.navigate([`/confirm-email/${res.user.id}`])
        }
      } else {
        if (res.user.status == 'valid') {
          if (token) {
            this.isUserAuthenticated = true;
            this.authStatusListener.next(true);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', res.user.id);
            localStorage.setItem('role', res.user.role);
            this.router.navigate([`/dashboard-profil/${res.user.id}`]);
          }
        }
        else {
          this.router.navigate([`/confirm-SMS/${res.user.id}`])
        }
      }
    })
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.isUserAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  // Response : all Users
  getAllUsers() {
    return this.httpClient.get<{ users: any }>(this.userURL)
  }
  // Response : all Users
  getApplyedStudent() {
    return this.httpClient.get<{ applyed: any }>(`${this.userURL}/applyedStudent/all`)
  }
  // Response : all Users
  getApplyedStudentById(id) {
    return this.httpClient.get<{ applyed: any }>(`${this.userURL}/applyedToCourse/${id}`)
  }

  // Response : one object
  getUserById(id) {
    return this.httpClient.get<{ user: any }>(`${this.userURL}/${id}`)
  }
  // Response : one object
  getUserByPhone(phone) {
    return this.httpClient.get<{ user: any }>(`${this.userURL}/phone/${phone}`)
  }

  // Response : one object
  getUserByRole(role) {
    return this.httpClient.get<{ users: any }>(`${this.userURL}/byRole/${role}`)
  }

  // Response : Boolean
  deleteUser(id) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.userURL}/${id}`)
  }

  // Response : Message/Boolean
  editUser(obj) {
    return this.httpClient.put<{ isUpdated: boolean }>(this.userURL, obj)
  }
  // Response : Message/Boolean
  validUser(obj, id) {
    return this.httpClient.put<{ isUpdated: boolean }>(`${this.userURL}/${id}`, obj)
  }

  // Affect Student
  affectation(user, teacherId) {
    return this.httpClient.post<{ message: string }>(`${this.userURL}/affect-student/${teacherId}`, user)
  }

  // GET Affectation By teacher
  getTeachertByAffectation(studentId) {
    return this.httpClient.get<{ teachers: string }>(`${this.userURL}/affect-teacher/${studentId}`)
  }
  // GET Affectation By student
  getAllAffectedStudent(teacherId) {
    return this.httpClient.get<{ teachers: string }>(`${this.userURL}/getAllAffectedStudent/${teacherId}`)
  }

  // Response : Message/Boolean
  confirmSMS(id, obj) {
    return this.httpClient.put<{ isConfirmed: any }>(this.userURL + "/confirm-SMS/" + id, obj)
  }

  // Response : Message/Boolean
  randomCode(id, obj) {
    return this.httpClient.put<{ isUpdated: boolean }>(this.userURL + "/confirm-SMS/code/" + id, obj)
  }

  // Response : Message/Boolean
  emailCode(id, obj) {
    return this.httpClient.put<{ isUpdated: boolean }>(this.userURL + "/nodeMailer-code/" + id, obj)
  }

  getToken() {
    return this.token;
  }
  getErrorMsg() {
    return this.errorMsg;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  isUserAuth() {
    return this.isUserAuthenticated;
  }
  getName() {
    return this.user;
  }
}
