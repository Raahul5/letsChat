import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverPicDialogBoxComponent } from './cover-pic-dialog-box.component';

describe('CoverPicDialogBoxComponent', () => {
  let component: CoverPicDialogBoxComponent;
  let fixture: ComponentFixture<CoverPicDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoverPicDialogBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverPicDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
