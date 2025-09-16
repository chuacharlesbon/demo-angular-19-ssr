import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatthreadComponent } from './chatthread.component';

describe('ChatthreadComponent', () => {
  let component: ChatthreadComponent;
  let fixture: ComponentFixture<ChatthreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatthreadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatthreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
