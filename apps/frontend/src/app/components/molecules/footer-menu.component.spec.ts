import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NbButtonGroupModule, NbButtonModule, NbCardModule, NbIconModule, NbThemeModule } from '@nebular/theme';
import { FooterMenuComponent } from './footer-menu.component';

describe(FooterMenuComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NbCardModule,
        NbIconModule,
        NbButtonModule,
        NbButtonGroupModule,
        NbThemeModule.forRoot(),
        FooterMenuComponent
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FooterMenuComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
