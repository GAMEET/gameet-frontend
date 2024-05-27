import { TestBed } from '@angular/core/testing';

import { VideoGamesProfileService } from './video-games-profile.service';

describe('VideoGamesProfileService', () => {
  let service: VideoGamesProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoGamesProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
