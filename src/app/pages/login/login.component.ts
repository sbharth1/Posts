import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  http = inject(HttpClient);
  myForm!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  onSubmit(): void {
    try {
      if (this.myForm.valid) {
        const formData = this.myForm.value;
        this.http
          .post('http://localhost:3500/login', formData)
          .subscribe((res: any) => {
            if (res) {
             localStorage.setItem('token', res.token);
              this.myForm.reset();
              this.router.navigate(['/posts']);
            } else {
              console.log('err in post api');
            }
          });
      } else {
        alert('fill all fields...');
      }
    } catch (err) {
      console.log(err + 'frontend interanl server error');
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
  logintoseeposts() {
    this.router.navigate(['/posts']);
  }
}
