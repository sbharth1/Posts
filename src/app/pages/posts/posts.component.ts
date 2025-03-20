import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  AfterViewChecked,
} from '@angular/core';
import { Item } from '../item.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, ModalComponent, MatIconModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  token: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  items: Item[] = [
    {
      like: 3,
      comment: 5,
      content:
        '“We’re so divided, we’re so tribalized,” says one nightlife habitué. But don’t pour one out for the social gathering yet.',
    },
    {
      like: 9,
      comment: 2,
      content:
        'The information belongs to more than 200 former congressional staffers and others with connections to decades-old probes.',
    },
    {
      like: 2,
      comment: 6,
      content:
        'Electric vehicles are facing an uncertain future under the Trump administration, with plans to scrap EV tax credits and slash funding for charging stations.',
    },
    {
      like: 8,
      comment: 9,
      content:
        'In the scorching opal mining town of Coober Pedy, White people live in cool “dugouts” while their Aboriginal neighbors suffer above, often without air conditioning.',
    },
    {
      like: 3,
      comment: 7,
      content:
        'The Post analyzed the careers of 10,000 college basketball players to see how transfers are increasingly shaping the sport while their Aboriginal neighbors suffer above.',
    },
    {
      like: 3,
      comment: 7,
      content:
        'The Post analyzed the careers of 10,000 college basketball players to see how transfers are increasingly shaping the sport while their Aboriginal neighbors suffer above.',
    },
    {
      like: 3,
      comment: 7,
      content:
        'The Post analyzed the careers of 10,000 college basketball players to see how transfers are increasingly shaping the sport while their Aboriginal neighbors suffer above.',
    },
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

  onLogOut() {
    localStorage.removeItem('token');
    this.token = null;
  }
}
