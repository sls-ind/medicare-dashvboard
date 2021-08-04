import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from "./DemoPages/Dashboards/analytics/analytics.component";

// Pages

import { ControlsComponent } from "./DemoPages/Forms/Elements/controls/controls.component";
import { PatientFormComponent } from "./DemoPages/create-patientform/create-patientform.component";
import { PatientsListComponent } from "./DemoPages/Dashboards/patients-list/patients-list.component";
import { PatientDashboardComponent } from "./DemoPages/Dashboards/patient-dashboard/patient-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: AnalyticsComponent,
        data: { extraParameter: "dashboardsMenu" },
      },
      {
        path: "forms/controls",
        component: ControlsComponent,
        data: { extraParameter: "formElementsMenu" },
      },
      {
        path: "newForm",
        component: PatientFormComponent,
        data: { extraParameter: "formElementsMenu" },
      },
      {
        path: "patient",
        component: PatientsListComponent,
        data: { extraParameter: "patientsInfo" },
      },
      {
        path: "patient/:id",
        component: PatientDashboardComponent,
        data: { extraParameter: "patientsInfo" },
      },
    ],
  },

  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
