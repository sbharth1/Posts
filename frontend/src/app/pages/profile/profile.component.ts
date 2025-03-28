import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    bio: 'A passionate web developer with experience in Angular, React, and Node.js.',
    profileImage: 'https://imgs.search.brave.com/48WZ-vtUsJQmBsNQiFHFwjaVoYUBa1JiCSRx1uXhL0c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLVBORy1DbGlw/YXJ0LnBuZw' ,
    title:"this is title",
    content:"this is content",
    imageUrl:"https://imgs.search.brave.com/IZjbwlMrIp_xIfdBjK17aeTY3knLcsJEx8x83NjNI8k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLUZlbWFsZS1Q/TkcucG5n"
  };

 

  constructor() { }

  ngOnInit(): void {

  }
}
