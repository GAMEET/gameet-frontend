import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGameNewsComponent } from './video-game-news.component';

describe('VideoGameNewsComponent', () => {
  let component: VideoGameNewsComponent;
  let fixture: ComponentFixture<VideoGameNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGameNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoGameNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
