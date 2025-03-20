import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  http = inject(HttpClient);  
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}


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
    try {
      if (this.myForm.valid) {
        const formData = this.myForm.value;
        this.http
          .post('http://localhost:3500/signup',formData)
          .subscribe((res: any) => {
            if (res) {
              console.log(res);
              this.myForm.reset()
              this.router.navigate(['/login'])

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
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
