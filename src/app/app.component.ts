// import { Component, Injector } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { MessageService, ConfirmationService } from 'primeng/api';
// import { ToastModule } from 'primeng/toast';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, ToastModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'ProductManagement-Frontend';
//   public messageService: MessageService;
//   public confirmationService: ConfirmationService;
//   injector: any;
//   constructor(injector: Injector,

//   ) {
//     this.messageService = this.injector.get(MessageService);
//     this.confirmationService = this.injector.get(ConfirmationService);
//   }
// }

import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ProductManagement-Frontend';

  // 🔹 make protected so child can use
  protected messageService: MessageService;
  protected confirmationService: ConfirmationService;

  constructor(protected injector: Injector) {
    // 🔹 use injector to resolve services
    this.messageService = this.injector.get(MessageService);
    this.confirmationService = this.injector.get(ConfirmationService);
  }

  // 🔹 optional helper methods
  protected showMessage(summary: string, detail: string, severity: 'success' | 'info' | 'warn' | 'error' = 'info') {
    this.messageService.add({ severity, summary, detail });
  }

  protected confirmAction(message: string, accept: () => void) {
    this.confirmationService.confirm({ message, accept });
  }
}