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
  admin = false;
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
  allVital = [];
  patientVitalsList:any;
  allVitalList:any;

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
    this.dataService.getUserMedicalHistory(id).subscribe(
      (data) => {
        console.log(data);
        if (!data) {
          alert("No vitals record found");
        }
        if(data ) {
          this.patientVitalsHistoryManage(data);
        };
        
        debugger;
        //TODO: FOrmat the data and display accordingly
      },
      (error) => {
        alert("Failed to load vitals data");
      }
    );
    this.dataService.getVitalsHistory(id).subscribe(
      (data) => {
        if (!data) {
          alert("No vitals record found");
        }
        this.patientVitalsList= data;
        this.dataFormater();
        console.log("this.patientVitalsHistory", this.patientVitalsHistory)
        // debugger;
      },
      (error) => {
        alert("Failed to load vitals data");
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

    this.dataService.uploadFile("api/v1/uploadVitals", this.file).subscribe(
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

  patientVitalsHistoryManage(data){
    this.patientVitalsHistory = [];
    data.forEach((element, index) => {
      if(index == 1){
        this.patientVitalsHistory.push(element.date  )
      } else {
        this.patientVitalsHistory.push(element.date )
      }
      this.patientVitalsHistory.push(element.data.comments + "- Dr: " + element.doctorName)
      // this.patientVitalsHistory.push({date: element.date, comments:element.data.comments, doctorName: element.doctorName})
    });
  }

  dataFormater() {
    const data =  this.patientVitalsList;
    console.log("data >>>> ",data);
    if(!data){
      return;
    }

    const formatedData = {};
    // const keys = ["BP_SYS","HEART_RATE","SUGAR","O2SUPPORT","TEMP","BP_DIA","SPO2"]

    // keys.forEach(element => {
    data.forEach((element) => {
      if (["BP_SYS", "BP_DIA"].includes(element["vitalName"])) {
        if (formatedData && formatedData["BP"] && formatedData["BP"].length) {
          formatedData["BP"].push(element);
        } else {
          formatedData["BP"] = [element];
        }
      } else if (
        formatedData &&
        formatedData[element["vitalName"]] &&
        formatedData[element["vitalName"]].length
      ) {
        formatedData[element["vitalName"]].push(element);
      } else {
        formatedData[element["vitalName"]] = [element];
      }
    });

    console.log("formatedData", formatedData);
    // this.formatedData = formatedData;
    this.allVital = [];
    this.allVitalList = [];
    for (const property in formatedData) {
      this.allVital.push(property);
    }
    for (const property in formatedData) {
      
      let array = formatedData[property] 
      let info = "" 
      
      if(this.allVitalList && this.allVitalList.length == 0){
        this.allVitalList.push(array[0]['updatedTS']); 
      }

      if(array && array.length == 2 ){
        info += (array[0]['vitalName'] == "BP_SYS") ? "BP SYS"  : "BP DIA" + ' - ' + array[0]['vitalValue'] + 
        (array[1]['vitalName'] == "BP_SYS") ? "BP SYS" : "BP DIA" + ' - ' + array[1]['vitalValue'] 
      } else {
        info = property + ' - ' + array[0]['vitalValue'];
      }
      if(info !== ""){
        this.allVitalList.push(info);
      }
    }
    // console.log(this.allVital);
    console.log("this.allVital", this.allVital);
  }


}
