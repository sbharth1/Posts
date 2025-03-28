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
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  http = inject(HttpClient);
  myForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  onSubmit(): void {
    if (this.myForm.valid) {
      this.isLoading = true;
      const formData = this.myForm.value;

      this.http
        .post('http://localhost:3700/login', formData)
        .pipe(
          catchError((error: any) => {
            this.isLoading = false;
            const errorMessage = error?.error?.message || 'An error occurred';
            this.toastr.error(errorMessage);
            console.error('Login error', error);
            return [];
          })
        )
        .subscribe((res: any) => {
          this.isLoading = false;

          if (res) {
            localStorage.setItem('token', res.token);
            this.myForm.reset();
            this.toastr.success('Login successful');
            this.router.navigate(['/posts']);
          } else {
            this.toastr.error('Login failed');
            console.log('Error: No response data');
          }
        });
    } else {
      this.isLoading = false;
      this.toastr.warning('Please fill in all required fields');
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  logintoseeposts() {
    this.router.navigate(['/posts']);
  }
}
