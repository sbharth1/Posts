import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  TemplateRef,
  WritableSignal,
  signal,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Item } from '../item.model';

@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    MatIconModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  modalForm!: FormGroup;
  token: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  closeResult: WritableSignal<string> = signal('');

  allItems: Item[] = [];
  commentingPostId: string | null = null;


  ngOnInit(): void {
    this.getAllPosts(); // to get all posts

    this.modalForm = this.fb.group({
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
  }

  // get all posts--------------------------------------
  toggleDescription(item: Item): void {
    item.isDescriptionExpanded = !item.isDescriptionExpanded;
  }

  getAllPosts() {
    this.http
      .get('http://localhost:3700/getposts')
      .pipe(
        catchError((error) => {
          console.error('Error fetching posts', error);
          return [];
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.allItems = res.map((post: any) => ({
            ...post,
            isDescriptionExpanded: false,
          }));
        } else {
          console.log('Error: No response data');
        }
      });
  }

  // modal open & close code ----------------------------------------

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result: any) => {
          this.closeResult.set(`Closed with: ${result}`);
          this.clearFileInput();
        },
        (reason: any) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
          this.clearFileInput();
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  clearFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    this.modalForm.reset();
    this.modalForm.patchValue({
      description: null,
      image: null,
    });
  }

  //  modal add post code ----------------------------------------

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.modalForm.patchValue({
        image: file,
      });
    }
  }

  onAddPost(): void {
    if (this.modalForm.valid) {
      const formData = new FormData();
      formData.append('description', this.modalForm.get('description')?.value);
      formData.append('image', this.modalForm.get('image')?.value);
      const headers = { Authorization: `Bearer ${this.token}` };

      this.http
        .post('http://localhost:3700/posts', formData, { headers })
        .pipe(
          catchError((error) => {
            this.toastr.error('Post failed pls login user...');
            console.error('Post error', error);
            return error;
          })
        )
        .subscribe((res: any) => {
          if (res) {
            this.toastr.success('Post created successfully');
            this.getAllPosts();
          } else {
            console.log('Error: No response data');
          }
        });

      this.modalForm.reset();
      this.clearFileInput();
      this.modalService.dismissAll();
    } else {
      this.toastr.error('Both fields are required..');
    }
  }
  // end modal code ----------------------------------------


  // like and comment -------------------------
  onAddLike(id: string) {
    const headers = { Authorization: `Bearer ${this.token}` };
    this.http
      .post(`http://localhost:3700/userpost/${id}/like`, {},{ headers })
      .pipe(
        catchError((err) => {
          return of(null);
        })
      )
      .subscribe((res) => {
        console.log(res, '--res from like api');
        this.getAllPosts();
      });
  }


    // commmet section  --------------------

    onAddComment(id:string):void{
      this.commentingPostId = id;
    }

    submitComment(id: string, comment: string): void {
      if (!comment || !comment.trim()) {
        this.toastr.error('Comment cannot be empty');
        return;
      }
    
      const headers = { Authorization: `Bearer ${this.token}` };
      this.http
        .post(`http://localhost:3700/userpost/${id}/comment`, { comment }, { headers })
        .pipe(
          catchError((err) => {
            this.toastr.error('Failed to add comment');
            console.error(err);
            return [];
          })
        )
        .subscribe((res: any) => {
          this.toastr.success('Comment added successfully');
          this.getAllPosts();
          this.commentingPostId = null;
        });
    }
    
    cancelComment(): void {
      this.commentingPostId = null;
    }


  // navigation code----------------------------------------

  navigateToSignIn() {
    this.router.navigate(['login']);
  }

  navigateProfile() {
    this.router.navigate(['profile']);
  }

  // LogOut----------------------------------------

  onLogOut() {
    localStorage.removeItem('token');
    this.token = null;
  }
}
