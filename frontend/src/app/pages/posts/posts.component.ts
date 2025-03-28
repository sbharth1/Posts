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
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Item } from '../item.model';

@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    MatIconModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
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
          this.allItems = res;
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
        },
        (reason: any) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
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

  //  modal add post code ----------------------------------------

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file, '---- image file');
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
      this.modalService.dismissAll();
    } else {
      this.toastr.error('Both fields are required..');
    }
  }

  // end modal code ----------------------------------------


  // delete user ------------------------------------------


  // navigation code----------------------------------------

  navigateToSignIn() {
    this.router.navigate(['login']);
  }

  navigateProfile(){
    this.router.navigate(['profile'])
  }

  // LogOut----------------------------------------

  onLogOut() {
    localStorage.removeItem('token');
    this.token = null;
  }
}
