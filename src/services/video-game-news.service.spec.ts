import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VideoGameNewsService } from './video-game-news.service';
import { Game } from '../models/video-game.model';

describe('VideoGameNewsService', () => {
  let service: VideoGameNewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VideoGameNewsService],
    });
    service = TestBed.inject(VideoGameNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch upcoming games', () => {
    const mockGames: Game[] = [
      { name: 'Game 1', background_image: '', released: '', platforms: [], genres: [] },
      { name: 'Game 2', background_image: '', released: '', platforms: [], genres: [] },
    ];

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    const nextYearStr = `${year + 1}-${month}-${day}`;
    const url = `${service['apiUrl']}?key=${service['apiKey']}&dates=${todayStr},${nextYearStr}&ordering=-added`;

    service.getUpcomingGames().subscribe((data) => {
      expect(data.results).toEqual(mockGames);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush({ results: mockGames });
  });
});
