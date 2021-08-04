import { Component, OnInit } from "@angular/core";
import { Color } from "ng2-charts/ng2-charts";
import {
  faTh,
  faCheck,
  faTrash,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

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

  heading = "Analytics Dashboard";
  subheading =
    "This is an example dashboard created using build-in elements and components.";
  icon = "pe-7s-graph2 icon-gradient bg-tempting-azure";

  admin = true;

  slideConfig6 = {
    className: "center",
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    adaptiveHeight: true,
    dots: true,
  };
  chartOptionsDetails = [];

  public datasets = [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 46, 55, 38, 59, 80],
      datalabels: {
        display: false,
      },
    },
  ];

  public datasets2 = [
    {
      label: "My First dataset",
      data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
      datalabels: {
        display: false,
      },
    },
  ];

  public datasets3 = [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
      datalabels: {
        display: false,
      },
    },
  ];
  public lineChartColors: Color[] = [
    {
      // dark grey
      backgroundColor: "rgba(247, 185, 36, 0.2)",
      borderColor: "#f7b924",
      borderCapStyle: "round",
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: "round",
      pointBorderColor: "#f7b924",
      pointBackgroundColor: "#fff",
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#f7b924",
    },
  ];

  public lineChartColors2: Color[] = [
    {
      // dark grey
      backgroundColor: "rgba(48, 177, 255, 0.2)",
      borderColor: "#30b1ff",
      borderCapStyle: "round",
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: "round",
      pointBorderColor: "#30b1ff",
      pointBackgroundColor: "#ffffff",
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: "#ffffff",
      pointHoverBorderColor: "#30b1ff",
    },
  ];

  public lineChartColors3: Color[] = [
    {
      // dark grey
      backgroundColor: "rgba(86, 196, 121, 0.2)",
      borderColor: "#56c479",
      borderCapStyle: "round",
      borderDash: [],
      borderWidth: 4,
      borderDashOffset: 0.0,
      borderJoinStyle: "round",
      pointBorderColor: "#56c479",
      pointBackgroundColor: "#fff",
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#56c479",
    },
  ];

  public labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
  ];

  public options = {
    layout: {
      padding: {
        left: 0,
        right: 8,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  ngOnInit() {
    this.dataFormater();
    // this.chartDetails();
  }

  dataFormater() {
    const data = [
      {
        patientID: 65,
        vitalName: "BP_SYS",
        vitalValue: "120",
        updatedTS: "28/07/2021 02:37 PM",
      },
      {
        patientID: 65,
        vitalName: "HEART_RATE",
        vitalValue: "120",
        updatedTS: "28/07/2021 02:37 PM",
      },
      {
        patientID: 65,
        vitalName: "SUGAR",
        vitalValue: "140",
        updatedTS: "28/07/2021 02:37 PM",
      },
      {
        patientID: 65,
        vitalName: "O2SUPPORT",
        vitalValue: "2",
        updatedTS: "28/07/2021 02:37 PM",
      },
      {
        patientID: 65,
        vitalName: "TEMP",
        vitalValue: "37.1",
        updatedTS: "28/07/2021 02:37 PM",
      },
      {
        patientID: 65,
        vitalName: "BP_DIA",
        vitalValue: "80",
        updatedTS: "28/07/2021 02:37 PM",
      },
      {
        patientID: 65,
        vitalName: "SPO2",
        vitalValue: "95",
        updatedTS: "28/07/2021 02:37 PM",
      },

      {
        patientID: 65,
        vitalName: "BP_SYS",
        vitalValue: "110",
        updatedTS: "29/07/2021 06:40 AM",
      },
      {
        patientID: 65,
        vitalName: "HEART_RATE",
        vitalValue: "110",
        updatedTS: "29/07/2021 06:40 AM",
      },
      {
        patientID: 65,
        vitalName: "SUGAR",
        vitalValue: "145",
        updatedTS: "29/07/2021 06:40 AM",
      },
      {
        patientID: 65,
        vitalName: "O2SUPPORT",
        vitalValue: "3",
        updatedTS: "29/07/2021 06:40 AM",
      },
      {
        patientID: 65,
        vitalName: "TEMP",
        vitalValue: "35",
        updatedTS: "29/07/2021 06:40 AM",
      },
      {
        patientID: 65,
        vitalName: "BP_DIA",
        vitalValue: "70",
        updatedTS: "29/07/2021 06:40 AM",
      },
      {
        patientID: 65,
        vitalName: "SPO2",
        vitalValue: "95",
        updatedTS: "29/07/2021 06:40 AM",
      },

      {
        patientID: 65,
        vitalName: "BP_SYS",
        vitalValue: "130",
        updatedTS: "29/07/2021 04:15 PM",
      },
      {
        patientID: 65,
        vitalName: "HEART_RATE",
        vitalValue: "140",
        updatedTS: "29/07/2021 04:15 PM",
      },
      {
        patientID: 65,
        vitalName: "SUGAR",
        vitalValue: "110",
        updatedTS: "29/07/2021 04:15 PM",
      },
      {
        patientID: 65,
        vitalName: "O2SUPPORT",
        vitalValue: "5",
        updatedTS: "29/07/2021 04:15 PM",
      },
      {
        patientID: 65,
        vitalName: "TEMP",
        vitalValue: "36.1",
        updatedTS: "29/07/2021 04:15 PM",
      },
      {
        patientID: 65,
        vitalName: "BP_DIA",
        vitalValue: "80.1",
        updatedTS: "29/07/2021 04:15 PM",
      },
      {
        patientID: 65,
        vitalName: "SPO2",
        vitalValue: "95.2",
        updatedTS: "29/07/2021 04:15 PM",
      },
    ];

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
    for (const property in formatedData) {
      this.chartDetails(formatedData[property]);
    }
  }

  chartDetails(property) {
    // this.chartOptionsDetails = {
    //   barChartLabels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'],
    //   barChartType: 'bar',
    //   barChartLegend: true,
    //   barChartData: [
    //     {data: [65, 59, 80, 81, 56, 55, 40], label: 'SIS'},
    //     {data: [28, 48, 40, 19, 86, 27, 90], label: 'DIA'}
    //   ]
    // }
    let obj = {
      barChartType: "bar",
      barChartLegend: true,
    };
    let barChartLabels = [];
    let barChartData = {};

    property.forEach((element) => {
      if (barChartLabels && !barChartLabels.includes(element.updatedTS)) {
        barChartLabels.push(element.updatedTS);
      }
      barChartData[element["vitalName"]] &&
      barChartData[element["vitalName"]].length
        ? barChartData[element["vitalName"]].push(element["vitalValue"])
        : (barChartData[element["vitalName"]] = [element["vitalValue"]]);

      // const keys = ["BP_SYS","HEART_RATE","SUGAR","O2SUPPORT","TEMP","BP_DIA","SPO2"]

      // default value
      // if( element['vitalName']) {

      // }
    });

    let finalChartOptionsDetails = obj;
    finalChartOptionsDetails["barChartData"] = [];

    finalChartOptionsDetails["barChartLabels"] = barChartLabels;
    for (const label in barChartData) {
      finalChartOptionsDetails["barChartData"].push({
        label: label,
        data: barChartData[label],
      });
    }
    console.log("finalChartOptionsDetails", finalChartOptionsDetails);
    this.chartOptionsDetails.push(finalChartOptionsDetails);
    // this.chartOptionsDetails = {
    //   barChartLabels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'],
    //   barChartType: 'bar',
    //   barChartLegend: true,
    //   barChartData: [
    //     {data: [65, 59, 80, 81, 56, 55, 40], label: 'SIS'},
    //     {data: [28, 48, 40, 19, 86, 27, 90], label: 'DIA'}
    //   ]
    // }
  }
}
