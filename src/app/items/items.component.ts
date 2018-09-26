import { Component, TemplateRef } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

import {SearchCriteria} from '../search-criteria';
import {ElementService} from '../element.service';
import {Element} from '../element';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  elements: Element[];
  searchCriteria: SearchCriteria = new SearchCriteria(200);
  modalRef: BsModalRef;


    constructor(
        private elementService: ElementService,
        private modalService: BsModalService) {}

  load(): void {
    this.elementService.getElements(this.searchCriteria.rowLimit).
    subscribe(els => {
      this.elements = els;
      els.forEach(el => {
        let zero = 0;
        let one = 0;
        let two = 0;
        el.data.forEach(item => {
            if (item.type === 0) { zero++; }
            if (item.type === 1) { one++; }
            if (item.type === 2) { two++; }
        });
        el.typeZero = zero;
        el.typeOne = one;
        el.typeTwo = two;
        const dateObject = new Date(el.date);
        el.dateShortPresentation = dateObject.toLocaleDateString('en-US');
      });
    });
  }
  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }
}
