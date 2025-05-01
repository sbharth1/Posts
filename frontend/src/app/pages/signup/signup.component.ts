import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment.development';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  http = inject(HttpClient);  
  myForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router,private toastr:ToastrService) {}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
      if (this.myForm.valid) {
        this.isLoading = true;
        const formData = this.myForm.value;
        this.http
          .post(`${enviroment.apiUrl}/signup`,formData)
          .pipe(
            catchError((error) => {
              this.isLoading = false;
              this.toastr.error('Signup failed');
              console.error('Signup error', error);
              return error;
            })
          )
          .subscribe((res: any) => {
            this.isLoading = false;
            if (res) {
              console.log(res);
              this.myForm.reset();
              this.toastr.success('Signup success');
              this.router.navigate(['/login'])

            } else {
              this.toastr.error('Signup failed');
              console.log('err in post api');
            }
          });
      } else {
        this.isLoading = false;
        this.toastr.warning('All fields are required');
      }
    } 


    navigateToLogin() {
    this.router.navigate(['/login']);
  }


}
