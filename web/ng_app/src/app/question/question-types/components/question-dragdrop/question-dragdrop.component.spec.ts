import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDragdropComponent } from './question-dragdrop.component';
import { DragulaService, DragulaModule } from 'ng-dragula/ng-dragula';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionDragdropComponent', () => {
  let component: QuestionDragdropComponent;
  let fixture: ComponentFixture<QuestionDragdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DragulaModule,
        BrowserAnimationsModule
      ],
      declarations: [ QuestionDragdropComponent ],
      providers: [
        // DragulaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDragdropComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.question = {
        options: [],
        answers: [],
        component: QuestionDragdropComponent,
        questionLabel: '',
        answersLimit: 3,
        answersFlag: false
      };
    });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
