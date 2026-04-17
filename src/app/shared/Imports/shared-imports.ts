import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayModule } from 'primeng/overlay';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MenubarModule} from 'primeng/menubar';

export const sharedImports = [
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    OverlayModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    RouterModule,
    MenubarModule
]