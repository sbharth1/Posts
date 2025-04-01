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
import { Store } from '@ngrx/store';
import { login } from '../../features/user/state/user.action';
import { selectAuthError, selectAuthToken } from '../../features/user/state/user.selectors';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  http = inject(HttpClient);
  myForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,  
    private toastr: ToastrService,
    private store: Store,
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

      this.store.dispatch(login({ credentials: formData }));

      this.store.select(selectAuthToken).subscribe((token) => {
        if (token) {
          localStorage.setItem('token', token);
          this.toastr.success('Login successful');
          this.router.navigate(['/posts']);
        }
      });

      this.store.select(selectAuthError).subscribe((error) => {
        if (error) {
          this.isLoading = false;
          this.toastr.error(error);
          console.error('Login error', error);
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
