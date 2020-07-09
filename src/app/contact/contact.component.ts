import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Feedback, ContactType} from '../shared/Feedback';
import {FeedbackService} from '../services/feedback.service';
import { delay } from 'rxjs/Operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType=ContactType;
  ErrMess:string;
  isDisplayed=false;
  viewfeedback=true;
  feedbackdisplay:Feedback;
  
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };
  constructor(private fb:FormBuilder,private feedbackservice: FeedbackService) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  
createForm(){
  this.feedbackForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
    telnum: ['0', [Validators.required, Validators.pattern] ],
    email: ['', [Validators.required, Validators.email] ],
    agree: false,
    contacttype: 'None',
    message: ''
  });
  this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
onSubmit(){
  this.feedback=this.feedbackForm.value;
  console.log(this.feedback);
  this.isDisplayed=true;
  this.viewfeedback=true;
  this.feedbackservice.submitFeedback(this.feedback).subscribe(feedback=>
    {console.log("the post is successful",feedback);
    this.feedbackdisplay=feedback;
    console.log(this.feedbackdisplay);
    this.viewfeedback=false;
    setTimeout(() => {
      this.isDisplayed=false;
      this.viewfeedback=true;    
    }, 5000);
  },
   errmess=>this.ErrMess=<any>errmess);
  this.feedbackForm.reset(
    {
      firstname: [''],
      lastname:[''],
      telnum: ['0'],
      email: [''],
      agree: false,
      contacttype: 'None',
      message: ''
    }
  );
  this.feedbackFormDirective.resetForm();
}
}
