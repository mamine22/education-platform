import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // user Obj 
  user: any = {};
  userIsAuthenticated = false;

  exist: boolean = false;
  connectedUser = localStorage.getItem("userId");
  private authListenerSubs: Subscription;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userService.getUserById(this.connectedUser).subscribe((data) => {
          this.user = data.user
        })

      }
    )


    console.log("user data:", this.user)

  }

  goToDashboardProfile() {
    this.router.navigate([`dashboard-profil/${this.connectedUser}`])
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  // Methode Logout
  logout() {
    this.userService.logout();
  }

}
