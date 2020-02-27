import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVendaConsumo } from 'app/shared/model/venda-consumo.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { VendaConsumoService } from './venda-consumo.service';
import { VendaConsumoDeleteDialogComponent } from './venda-consumo-delete-dialog.component';

@Component({
  selector: 'jhi-venda-consumo',
  templateUrl: './venda-consumo.component.html'
})
export class VendaConsumoComponent implements OnInit, OnDestroy {
  vendaConsumos: IVendaConsumo[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    protected vendaConsumoService: VendaConsumoService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.vendaConsumoService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IVendaConsumo[]>) => this.paginateVendaConsumos(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/venda-consumo'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/venda-consumo',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInVendaConsumos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IVendaConsumo) {
    return item.id;
  }

  registerChangeInVendaConsumos() {
    this.eventSubscriber = this.eventManager.subscribe('vendaConsumoListModification', () => this.loadAll());
  }

  delete(vendaConsumo: IVendaConsumo) {
    const modalRef = this.modalService.open(VendaConsumoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vendaConsumo = vendaConsumo;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateVendaConsumos(data: IVendaConsumo[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.vendaConsumos = data;
  }
}
