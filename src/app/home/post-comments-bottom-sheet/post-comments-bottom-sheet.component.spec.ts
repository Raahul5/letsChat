import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentsBottomSheetComponent } from './post-comments-bottom-sheet.component';

describe('PostCommentsBottomSheetComponent', () => {
  let component: PostCommentsBottomSheetComponent;
  let fixture: ComponentFixture<PostCommentsBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentsBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostCommentsBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
