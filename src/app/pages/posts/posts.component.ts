import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { CommonModule } from '@angular/common';
import {Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit{
  constructor(private router:Router){}
  items:Item[] = [
    { item: 1, content: 'fake text' },
    { item: 2, content: 'fake text' },
    { item: 3, content: 'fake text' },
    { item: 4, content: 'fake text' },
    { item: 5, content: 'fake text' },
  ];

  allItems:Item[] = [];

  ngOnInit():void{
    this.allItems = this.items.map((item)=> ({...item}))
  }

  navigateToSignIn(){
     this.router.navigate(['login'])
  }

}
