import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl('Keshav Ruhela'),
    mobile: new FormControl('8979123929'),
  });
constructor(private router:Router) { }
  loginPass(){
    if(this.loginForm.value.mobile==null)
    {
      alert("Enter number Correctly !");
    }
    else{
      console.log('All is correct.');
      this.router.navigate(['complaint-data'])
    }
  }

  ngOnInit() {
  }

}
