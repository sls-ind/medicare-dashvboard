import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data-service";

@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.sass"],
})
export class PatientsListComponent implements OnInit {
  patientDetails = [];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getPatientDetails();
  }

  getPatientDetails() {
    this.dataService.getPatientsList().subscribe(
      (data) => {
        this.patientDetails = data;
      },
      (error) => alert("Failed to fetch patient's list.")
    );
    // {
    //   "patientId": 25,
    //   "emailID": "bishwajit.patel@gmail.com",
    //   "fullName": "Satyajit",
    //   "age": 32,
    //   "sex": "Male",
    //   "address": "Palasuni",
    //   "phoneNo": "+91 8792760410",
    //   "role": "User",
    //   "storageLink": null
    // }
    // this.patientDetails = [
    //   {
    //     id: 32,
    //     avatar: "./assets/images/avatars/1.jpg",
    //     name: "patient A",
    //     diseaseTypes: "Dengue",
    //     status: "Recovering ",
    //     admitDate: "31 July",
    //     recovered: 40,
    //     recoveredCode: "bg-danger",
    //     discharge: "N",
    //   },
    //   {
    //     id: 35,
    //     avatar: "./assets/images/avatars/2.jpg",
    //     name: "patient B",
    //     diseaseTypes: "Dermatophyte Infection",
    //     status: "Recovering ",
    //     admitDate: "29 July",
    //     recovered: 71,
    //     recoveredCode: "bg-warning",
    //     discharge: "N",
    //   },
    //   {
    //     id: 36,
    //     avatar: "./assets/images/avatars/3.jpg",
    //     name: "patient C",
    //     diseaseTypes: "Dermatophyte Infection",
    //     status: "Recovering ",
    //     admitDate: "29 July",
    //     recovered: 71,
    //     recoveredCode: "bg-warning",
    //     discharge: "N",
    //   },
    //   {
    //     id: 36,
    //     avatar: "./assets/images/avatars/4.jpg",
    //     name: "patient D",
    //     diseaseTypes: "Dermatophyte Infection",
    //     status: "Recovering ",
    //     admitDate: "29 July",
    //     recovered: 95,
    //     recoveredCode: "bg-success",
    //     discharge: "N",
    //   },
    // ];
  }
}
