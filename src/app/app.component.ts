import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [MessageService, ConfirmationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ProductManagement-Frontend';

  //  make protected so child can use
  protected messageService: MessageService;
  protected confirmationService: ConfirmationService;

  constructor(protected injector: Injector) {
    //  use injector to resolve services
    this.messageService = this.injector.get(MessageService);
    this.confirmationService = this.injector.get(ConfirmationService);
  }

  //  optional helper methods
  protected showMessage(
    summary: string,
    detail: string,
    severity: 'success' | 'info' | 'warn' | 'error' = 'info',
  ) {
    this.messageService.add({ severity, summary, detail });
  }

  protected confirmAction(config: {
    message: string;
    header?: string;
    accept: () => void;
    reject?: () => void;
  }) {
    this.confirmationService.confirm(config);
  }
}
