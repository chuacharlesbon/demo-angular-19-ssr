import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatcardComponent } from './chatcard.component';

describe('ChatcardComponent', () => {
  let component: ChatcardComponent;
  let fixture: ComponentFixture<ChatcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
