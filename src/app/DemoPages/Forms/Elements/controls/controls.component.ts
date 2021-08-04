import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { DataService } from "src/app/services/data-service";
import { ToastService } from "src/app/toast-container/toast.service";

@Component({
  selector: "app-controls",
  templateUrl: "./controls.component.html",
  styles: [],
})
export class ControlsComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  heading = "";
  subheading = "";
  icon = "pe-7s-add-user icon-gradient bg-amy-crisp";
  file;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      gender: ["", Validators.required],
      age: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      contact: ["", [Validators.required, Validators.minLength(10)]],
      address: ["", [Validators.required]],
      city: ["", Validators.required],
      pin: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  fileChange(event) {
    this.file = null;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = event.target.files[0];
    }
  }

  submitFile() {
    if (!this.file) {
      this.toastService.showDanger("No file selected!", 2000);
      return;
    }

    this.dataService.uploadFile("api/v1/uploadRegForm", this.file).subscribe(
      (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          console.log(`File is ${percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          this.toastService.showStandard("File load complete!");
        }
      },
      (err) => {
        this.toastService.showDanger("Upload Error:" + err);
      },
      () => {
        this.toastService.showSuccess("File load complete!");
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
