import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGamesAvailableComponent } from './video-games-available.component';

describe('VideoGamesAvailableComponent', () => {
  let component: VideoGamesAvailableComponent;
  let fixture: ComponentFixture<VideoGamesAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGamesAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGamesAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
