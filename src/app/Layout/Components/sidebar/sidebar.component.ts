import { Component, HostListener, OnInit } from "@angular/core";
import { ThemeOptions } from "../../../theme-options";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data-service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;

  constructor(
    public globals: ThemeOptions,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  @select("config") public config$: Observable<any>;

  private newInnerWidth: number;
  private innerWidth: number;
  activeId = "dashboardsMenu";
  userId = null;
  isPatient = false; // show patients list

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });

    this.extraParameter =
      this.activatedRoute.snapshot.firstChild.data.extraParameter;
    this.dataService.onUserInfoUpdate$.subscribe((da) => {
      this.userId = this.dataService.userID;
      if (this.dataService.userRole) {
        this.isPatient = !this.dataService.userRole
          .toLocaleLowerCase()
          .includes("admin");
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }
  }
}
