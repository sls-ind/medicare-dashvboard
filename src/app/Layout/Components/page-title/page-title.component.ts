import { Router } from '@angular/router';
import {Component, Input} from '@angular/core';
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {

  faStar = faStar;
  faPlus = faPlus;
  constructor(private router : Router) {

  }

  @Input() heading;
  @Input() subheading;
  @Input() icon;

  createNewForm() {
    this.router.navigateByUrl('/newForm')
  }

}
