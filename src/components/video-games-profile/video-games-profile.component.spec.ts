import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGamesProfileComponent } from './video-games-profile.component';

describe('VideoGamesProfileComponent', () => {
  let component: VideoGamesProfileComponent;
  let fixture: ComponentFixture<VideoGamesProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGamesProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGamesProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
