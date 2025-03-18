import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,Validators,FormBuilder,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  
  myForm! : FormGroup;
  constructor(private router: Router,private fb:FormBuilder) {}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      console.log('Form submitted successfully!', this.myForm.value);
      this.myForm.reset();

    } else {
      alert("fill all fields...")
    }
  }
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
