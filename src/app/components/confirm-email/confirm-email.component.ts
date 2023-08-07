import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UserService) { }

  //var 
  user: any = {};
  id: any;

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get("id");
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data.user;
    });
  }

  sendReqeust() {
    this.userService.emailCode(this.id, this.user).subscribe((data) => {
    })
  }

  confirmSMS() {
    this.userService.confirmSMS(this.id, this.user).subscribe((data) => {
      if (data.isConfirmed) {
        this.router.navigate([`/login`])
      }
    });
  }
}
