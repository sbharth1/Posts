
import { Component, OnInit, Inject, PLATFORM_ID, AfterViewChecked } from '@angular/core';
import { Item } from '../item.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ModalComponent } from "../../components/modal/modal.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, ModalComponent, MatIconModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  token: string | null = null;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  items: Item[] = [
    { like: 3,comment:5, content: 'fake text' },
    { like: 9,comment:2, content: 'fake text' },
    { like: 2,comment:6, content: 'fake text' },
    { like: 8,comment:9, content: 'fake text' },
    { like: 3,comment:7, content: 'fake text' },
  ];

  allItems: Item[] = [];

  ngOnInit(): void {
    this.allItems = this.items.map((item) => ({ ...item }));

    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
  }

  navigateToSignIn() {
    this.router.navigate(['login']);
  }
  
  onLogOut(){
    localStorage.removeItem("token");
    this.token = null;
  }

}

