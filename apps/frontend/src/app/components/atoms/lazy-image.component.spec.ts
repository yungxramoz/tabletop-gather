import { TestBed } from '@angular/core/testing';
import { LazyImageComponent } from './lazy-image.component';

describe('LazyImageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyImageComponent]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(LazyImageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set default width and height', () => {
    const fixture = TestBed.createComponent(LazyImageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.width).toBe(30);
    expect(component.height).toBe(30);
  });

  it('should change src to fallback image on error', () => {
    const fixture = TestBed.createComponent(LazyImageComponent);
    const component = fixture.componentInstance;

    const mockImage = new Image();
    mockImage.src = 'initial-src';

    const errorEvent = new Event('error');
    Object.defineProperty(errorEvent, 'target', { writable: false, value: mockImage });

    component.fallbackImage(errorEvent);

    expect(mockImage.src.includes('assets/tg-image-outline.svg')).toBeTruthy();
  });

});
