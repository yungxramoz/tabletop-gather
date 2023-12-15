import { TestBed } from '@angular/core/testing';
import { LabelComponent } from './label.component';

describe(LabelComponent.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelComponent]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LabelComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    const fixture = TestBed.createComponent(LabelComponent);
    fixture.componentInstance.label = 'Test Label';
    fixture.componentInstance.id = 'test-id';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
