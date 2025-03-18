import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule ,Validators,FormBuilder,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router,private fb:FormBuilder) {}

  myForm! : FormBuilder;

  onSubmit(){
    console.log("submit form");
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
