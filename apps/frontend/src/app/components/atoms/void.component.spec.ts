import { TestBed } from '@angular/core/testing';
import { VoidComponent } from './void.component';

describe(VoidComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoidComponent], // Import the standalone component
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(VoidComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display the input message', () => {
    const fixture = TestBed.createComponent(VoidComponent);
    const component = fixture.componentInstance;
    const testMessage = 'Test Message';
    component.message = testMessage;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(testMessage);
  });
});
