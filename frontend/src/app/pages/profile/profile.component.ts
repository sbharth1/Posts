import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Users } from '../users.model';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { enviroment } from '../../enviroments/enviroment.development';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  http = inject(HttpClient);
  token: string | null = null;
  user: Users | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private toastr:ToastrService,
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

  toggleDescription(post: any): void {
    post.isDescriptionExpanded = !post.isDescriptionExpanded;
  }

  toGetUserPosts() {
    const headers = { Authorization: `Bearer ${this.token}` };

    this.http
      .get<Users>(`${enviroment.apiUrl}/userpost`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error fetching user posts:', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.user = {
            ...response,
            posts: response.posts.map((post: any) => ({
              ...post,
              isDescriptionExpanded: false,
            })),
          };
        }
      });
  }
  else(error: any) {
    console.log(error);
  }

  // deletePosts -----------------------------

  onDeletePost(id: string): void {
    const headers = { Authorization: `Bearer ${this.token}` };

    this.http
      .delete(`${enviroment.apiUrl}/userpost/${id}/delete`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error while deleting user posts:', error);
          return of(null);
        })
      )
      .subscribe((response:any) => {
        if (response) {
          this.toGetUserPosts();
         this.toastr.success(response.msg)
        }
      });
  }
}
