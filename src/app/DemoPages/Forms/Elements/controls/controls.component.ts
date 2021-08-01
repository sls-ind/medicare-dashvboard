import {Component, OnInit} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styles: []
})
export class ControlsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  heading = '';
  subheading = '';
  icon = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          
          firstName: ['', Validators.required],

          gender:  ['', Validators.required],
          age:  ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          contact: ['', [Validators.required, Validators.minLength(10)]],
          address: ['', [Validators.required]],
          city:  ['', Validators.required],
          pin : ['', [Validators.required, Validators.minLength(6)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
          acceptTerms: [false, Validators.requiredTrue]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}
