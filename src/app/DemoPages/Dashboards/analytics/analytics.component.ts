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
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
})
export class AnalyticsComponent implements OnInit {
  heading = "Patient Management Portal";
  subheading = "Welcome! Let's get started by logging in to the portal.";
  icon = "pe-7s-user icon-gradient bg-tempting-azure";
  constructor() {}

  ngOnInit() {}
}
