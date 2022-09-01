import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersDialogComponent } from './players-dialog.component';

describe('PlayersDialogComponent', () => {
  let component: PlayersDialogComponent;
  let fixture: ComponentFixture<PlayersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
