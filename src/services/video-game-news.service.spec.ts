import { TestBed } from '@angular/core/testing';

import { VideoGameNewsService } from './video-game-news.service';

describe('VideoGameNewsService', () => {
  let service: VideoGameNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoGameNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
