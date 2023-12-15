import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavigationService } from './navigation.service';

describe(NavigationService.name, () => {
  let service: NavigationService;
  let navigateByUrlMock: jest.Mock;
  let mockUrl: string;

  beforeEach(() => {
    mockUrl = '/';
    navigateByUrlMock = jest.fn();

    TestBed.configureTestingModule({
      providers: [
        NavigationService,
        {
          provide: Router,
          useValue: {
            navigateByUrl: navigateByUrlMock,
            get url() {
              return mockUrl;
            },
          },
        },
      ],
    });

    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(NavigationService.prototype.back.name, () => {
    it('should navigate to /events from an event plan page', () => {
      mockUrl = '/plan-event';
      service.back();
      expect(navigateByUrlMock).toHaveBeenCalledWith('/events');
    });

    it('should navigate to /events from an event view page', () => {
      mockUrl = '/view-event';
      service.back();
      expect(navigateByUrlMock).toHaveBeenCalledWith('/events');
    });

    it('should navigate to /collection from add to collection page', () => {
      mockUrl = '/add-to-collection';
      service.back();
      expect(navigateByUrlMock).toHaveBeenCalledWith('/collection');
    });

    it('should navigate to root for pages without a specific parent', () => {
      mockUrl = '/some/other/page';
      service.back();
      expect(navigateByUrlMock).toHaveBeenCalledWith('/');
    });
  });

  describe(NavigationService.prototype.showBackButton.name, () => {
    it('should return false if the url is a main feature page', () => {
      mockUrl = '/events';
      expect(service.showBackButton()).toBeFalsy();
    });

    it('should return true if the url is not a main feature page', () => {
      mockUrl = '/some/other/page';
      expect(service.showBackButton()).toBeTruthy();
    });
  });
});
