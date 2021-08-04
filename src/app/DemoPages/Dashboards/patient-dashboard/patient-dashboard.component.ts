import { Component, OnInit } from "@angular/core";
import { Color } from "ng2-charts/ng2-charts";
import {
  faTh,
  faCheck,
  faTrash,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/app/services/data-service";
import { ToastService } from "src/app/toast-container/toast.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-patient-dashboard",
  templateUrl: "./patient-dashboard.component.html",
  styleUrls: ["./patient-dashboard.component.sass"],
})
export class PatientDashboardComponent implements OnInit {
  formatedData = {};
  faTh = faTh;
  faCheck = faCheck;
  faTrash = faTrash;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  patientData;
  patientVitalsHistory;
  heading = "Analytics Dashboard";
  subheading =
    "This is an example dashboard created using build-in elements and components.";
  icon = "pe-7s-graph2 icon-gradient bg-tempting-azure";
  patientId;
  admin = true;
  file;
  slideConfig6 = {
    className: "center",
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };
  chartOptionsDetails = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.params["id"];
    this.getData(this.patientId);
    // this.chartDetails();
  }

  getData(id) {
    // TODO: call API to fetch medical history
    this.dataService.getPatientDetails(id).subscribe(
      (data) => {
        if (!data) {
          alert("No record available for the providied patient id");
          this.router.navigateByUrl("/patient");
        }
        this.patientData = data;
        debugger;
        //TODO: FOrmat the data and display accordingly
      },
      (error) => {
        alert("Failed to load details");
      }
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

    this.dataService.uploadFile("api/v1/uploadReport", this.file).subscribe(
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
}
