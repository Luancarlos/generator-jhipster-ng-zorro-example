import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NgzorroTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { AnimalTipoDeAlteracaoDeleteDialogComponent } from 'app/entities/animal-tipo-de-alteracao/animal-tipo-de-alteracao-delete-dialog.component';
import { AnimalTipoDeAlteracaoService } from 'app/entities/animal-tipo-de-alteracao/animal-tipo-de-alteracao.service';

describe('Component Tests', () => {
  describe('AnimalTipoDeAlteracao Management Delete Component', () => {
    let comp: AnimalTipoDeAlteracaoDeleteDialogComponent;
    let fixture: ComponentFixture<AnimalTipoDeAlteracaoDeleteDialogComponent>;
    let service: AnimalTipoDeAlteracaoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgzorroTestModule],
        declarations: [AnimalTipoDeAlteracaoDeleteDialogComponent]
      })
        .overrideTemplate(AnimalTipoDeAlteracaoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnimalTipoDeAlteracaoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnimalTipoDeAlteracaoService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.clear();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
