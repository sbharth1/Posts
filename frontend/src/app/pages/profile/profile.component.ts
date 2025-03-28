import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { catchError } from 'rxjs';
import { Users } from '../users.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  http = inject(HttpClient);
  token: string | null = null;

  user: Users | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
    if (!this.token) {
      this.router.navigate(['/posts']);
    } else {
      this.toGetUserPosts();
    }
  }

  toGetUserPosts() {
    const headers = { Authorization: `Bearer ${this.token}` };

    this.http
      .get<Users>('http://localhost:3700/userpost', { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user posts:', error);
          return [];
        })
      )
      .subscribe((response) => {
        this.user = response;
        console.log('User posts:', response);
      });
  }
}
