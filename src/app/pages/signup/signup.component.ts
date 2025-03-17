import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  imports:[ReactiveFormsModule,CommonModule],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,private router:Router) {}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // rememberMe: [false],
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
  navigateToLogin(){
    this.router.navigate(['/login'])
  }
}
