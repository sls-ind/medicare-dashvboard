import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-patients-list",
  templateUrl: "./patients-list.component.html",
  styleUrls: ["./patients-list.component.sass"],
})
export class PatientsListComponent implements OnInit {
  patientDetails = [];
  constructor() {}

  ngOnInit(): void {
    this.getPatientDetails();
  }

  getPatientDetails() {
    this.patientDetails = [
      {
        id: 32,
        avatar: "./assets/images/avatars/1.jpg",
        name: "patient A",
        diseaseTypes: "Dengue",
        status: "Recovering ",
        admitDate: "31 July",
        recovered: 40,
        recoveredCode: "bg-danger",
        discharge: "N",
      },
      {
        id: 35,
        avatar: "./assets/images/avatars/2.jpg",
        name: "patient B",
        diseaseTypes: "Dermatophyte Infection",
        status: "Recovering ",
        admitDate: "29 July",
        recovered: 71,
        recoveredCode: "bg-warning",
        discharge: "N",
      },
      {
        id: 36,
        avatar: "./assets/images/avatars/3.jpg",
        name: "patient C",
        diseaseTypes: "Dermatophyte Infection",
        status: "Recovering ",
        admitDate: "29 July",
        recovered: 71,
        recoveredCode: "bg-warning",
        discharge: "N",
      },
      {
        id: 36,
        avatar: "./assets/images/avatars/4.jpg",
        name: "patient D",
        diseaseTypes: "Dermatophyte Infection",
        status: "Recovering ",
        admitDate: "29 July",
        recovered: 95,
        recoveredCode: "bg-success",
        discharge: "N",
      },
    ];
  }
}
