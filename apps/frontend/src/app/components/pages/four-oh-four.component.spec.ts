import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FourOhFourComponent } from './four-oh-four.component';

describe('FourOhFourComponent', () => {
  let component: FourOhFourComponent;
  let fixture: ComponentFixture<FourOhFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FourOhFourComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FourOhFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('404');
    expect(compiled.querySelector('p')?.textContent).toContain('Page not found');
  });
});
