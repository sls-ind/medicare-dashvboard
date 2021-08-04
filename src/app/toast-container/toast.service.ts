import { Injectable, TemplateRef } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ToastService {
  toasts: any[] = [];

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
  showStandard(message: string, delay = 4000) {
    // blue
    this.show(message, { delay: delay });
  }

  showSuccess(message: string, delay = 4000) {
    // green notif
    this.show(message, { classname: "bg-success text-light", delay: delay });
  }

  showDanger(message: string, delay = 4000) {
    // red notif
    this.show(message, { classname: "bg-danger text-light", delay: delay });
  }
}
