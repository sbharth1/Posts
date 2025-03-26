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
import { Item } from '../item.model';
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
        'Electric vehicles are facing an uncertain future under the Trump administration, with plans to scrap EV tax.',
    },
    {
      like: 8,
      comment: 9,
      content:
        'In the scorching opal mining town of Coober Pedy, White people live in cool “dugouts” while their Aboriginal neighbors.',
    },
    {
      like: 3,
      comment: 7,
      content:
        'The Post analyzed the careers of 10,000 college basketball players to see how transfers are increasingly shaping the sport.',
    },
    {
      like: 3,
      comment: 7,
      content:
        'The Post analyzed the careers of 10,000 college basketball players to see how transfers are increasingly shaping.',
    },
    {
      like: 3,
      comment: 7,
      content:
        'The Post analyzed the careers of 10,000 college basketball players to see how transfers are increasingly shaping.',
    },
  ];

  ngOnInit(): void {
    this.allItems = this.items.map((item) => ({ ...item }));

    this.modalForm = this.fb.group({
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
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
            
            this.http
            .post('http://localhost:3700/posts', formData)
            .pipe(
              catchError((error) => {
                this.toastr.error('Post failed');
                console.error('Post error', error);
                return error;
              })
            )
              .subscribe((res: any) => {
                if (res) {
                  console.log(res);
                  this.toastr.success('Post added successfully');
                } else {
                  this.toastr.error('Post failed');
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
          
          
          
          // navigation code----------------------------------------

  navigateToSignIn() {
    this.router.navigate(['login']);
  }

  // LogOut----------------------------------------

  onLogOut() {
    localStorage.removeItem('token');
    this.token = null;
  }

}
