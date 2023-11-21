import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { Model } from '../../models/model.type';
import { UserDto } from '../../models/user.dto';
import { InputComponent } from '../atoms/input.component';

@Component({
  selector: 'tg-update-user-form',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    JsonPipe,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    InputComponent,
  ],
  template: `
    <nb-card>
      <nb-card-body>
        <form #updateUserForm="ngForm">
          <tg-input
            [(ngModel)]="model.username"
            required
            minlength="3"
            maxlength="50"
            pattern="^[a-z0-9.]*$"
            id="username"
            name="username"
            label="Username"
            placeholder="johndoe"
          ></tg-input>

          <tg-input
            [(ngModel)]="model.firstName"
            required
            minlength="3"
            maxlength="255"
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="John"
          ></tg-input>

          <tg-input
            [(ngModel)]="model.lastName"
            required
            minlength="3"
            maxlength="255"
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Doe"
          ></tg-input>

          <div class="tg-flex-row tg-mt-2">
            <button
              nbButton
              fullWidth
              ghost
              status="primary"
              shape="semi-round"
              (click)="resetForm(updateUserForm)"
            >
              Reset
            </button>
            <div class="tg-m-1"></div>
            <button
              nbButton
              fullWidth
              status="primary"
              shape="semi-round"
              type="submit"
              [disabled]="updateUserForm.invalid"
              (click)="updateUser()"
            >
              Save
            </button>
          </div>
        </form>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateUserFormComponent implements OnChanges {
  @Input() public user!: Model<Omit<UserDto, 'email'>>;
  @Output() public userUpdated: EventEmitter<Model<Omit<UserDto, 'email'>>> =
    new EventEmitter<Model<Omit<UserDto, 'email'>>>();

  public readonly model: Model<Omit<UserDto, 'email'>> = {
    username: '',
    firstName: '',
    lastName: '',
  };

  public updateUser() {
    this.userUpdated.emit({
      username: this.model.username,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
    });
  }

  public resetForm(ngForm: NgForm) {
    this.resetModel();
    for (const control of Object.values(ngForm.controls)) {
      control.markAsPristine();
    }
  }

  public ngOnChanges() {
    if (this.user) {
      this.resetModel();
    }
  }

  private resetModel() {
    this.model.username = this.user.username;
    this.model.firstName = this.user.firstName;
    this.model.lastName = this.user.lastName;
  }
}
