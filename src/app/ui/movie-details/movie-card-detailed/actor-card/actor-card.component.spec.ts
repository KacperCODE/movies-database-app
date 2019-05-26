import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCardComponent } from './actor-card.component';

describe('ActorCardComponent', () => {
  let component: ActorCardComponent;
  let fixture: ComponentFixture<ActorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to IMBD actor page if clicked on his name', async(() => {
      spyOn(component, 'openImdbTab');

      let actorName = fixture.debugElement.nativeElement.querySelector('.actor-card__name');
      actorName.click();

      fixture.whenStable()
        .then(() => {
            expect(component.openImdbTab).toHaveBeenCalled();
        })
  }))
});
