import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { VideoGameNewsComponent } from './video-game-news.component';
import { VideoGameNewsService } from '../../services/video-game-news.service';
import { Game } from '../../models/video-game.model';

describe('VideoGameNewsComponent', () => {
  let component: VideoGameNewsComponent;
  let fixture: ComponentFixture<VideoGameNewsComponent>;
  let mockNewsService: jasmine.SpyObj<VideoGameNewsService>;

  const mockGames: Game[] = [
    {
      name: 'Game 1',
      background_image: '',
      released: '',
      platforms: [{ platform: { name: 'PC' } }],
      genres: [{ name: 'Action' }]
    },
    {
      name: 'Game 2',
      background_image: '',
      released: '',
      platforms: [{ platform: { name: 'Console' } }],
      genres: [{ name: 'Adventure' }]
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('VideoGameNewsService', ['getUpcomingGames']);

    await TestBed.configureTestingModule({
      declarations: [VideoGameNewsComponent],
      providers: [
        { provide: VideoGameNewsService, useValue: spy }
      ]
    }).compileComponents();

    mockNewsService = TestBed.inject(VideoGameNewsService) as jasmine.SpyObj<VideoGameNewsService>;
    fixture = TestBed.createComponent(VideoGameNewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display upcoming games on init', () => {
    mockNewsService.getUpcomingGames.and.returnValue(of({ results: mockGames }));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.games).toEqual(mockGames);
    expect(mockNewsService.getUpcomingGames.calls.any()).toBe(true, 'getUpcomingGames called');
  });

  it('should handle error when fetching upcoming games', () => {
    mockNewsService.getUpcomingGames.and.returnValue(throwError('Error fetching data'));

    fixture.detectChanges(); // triggers ngOnInit

    expect(component.games).toEqual([]);
    expect(mockNewsService.getUpcomingGames.calls.any()).toBe(true, 'getUpcomingGames called');
  });

  it('should return platform names', () => {
    const game = mockGames[0];
    const platformNames = component.getPlatformNames(game);

    expect(platformNames).toBe('PC');
  });

  it('should return genre names', () => {
    const game = mockGames[0];
    const genreNames = component.getGenreNames(game);

    expect(genreNames).toBe('Action');
  });
});
