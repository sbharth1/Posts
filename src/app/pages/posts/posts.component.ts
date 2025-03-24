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
  selectedImage:File | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService
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
    });

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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file, '---- image file');
      this.selectedImage = file;
    }
  }

  onAddPost() {
    if (this.modalForm.valid && this.selectedImage) {
      const formData = this.modalForm.value;
      console.log(formData);
      console.log('Selected Image:', this.selectedImage);
      this.modalForm.reset();
      this.selectedImage = null;
      this.modalService.dismissAll()
      this.toastr.success('Post added successfully');
    } else {
      this.toastr.error('Both fields are required..');
    }
  }

  // modal open & close code ----------------------------------------

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
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

  // end modal code
}
