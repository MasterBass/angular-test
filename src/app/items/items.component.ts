import { Component, TemplateRef } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

import {SearchCriteria} from '../search-criteria';
import {ElementService} from '../element.service';
import {Element} from '../element';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  elements: Element[];
  searchCriteria: SearchCriteria = new SearchCriteria(20);
  modalRef: BsModalRef;
  selectedElement: Element;
  message: string;
  errorMessage: string;
  isLoading: boolean;


  constructor(
    private elementService: ElementService,
    private modalService: BsModalService,
    public authService: AuthService) {
    this.message = '';
    this.errorMessage = '';
    this.isLoading = false;
  }

  load(): void {
    this.message = '';

    if (this.searchCriteria.endDate && (this.searchCriteria.startDate >= this.searchCriteria.endDate)) {
        this.errorMessage = 'end Date in the filter should be bigger than start Date';
        return;
    } else {
        this.errorMessage = '';
    }
    this.isLoading = true;
    this.elementService.getElements(this.searchCriteria.rowLimit).
    subscribe(els => {
      this.elements = els;
      this.isLoading = false;
      if (this.searchCriteria.startDate) {
        this.elements = this.elements.filter(el => {
          const cDate = new Date(el.date);
          return cDate >= this.searchCriteria.startDate;
        });
      }

      if (this.searchCriteria.endDate) {
          this.elements = this.elements.filter(el => {
              const cDate = new Date(el.date);
              return cDate <= this.searchCriteria.endDate;
          });
      }

      this.message = `${this.elements.length} elements received`;

      this.elements.forEach(el => {
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

  openModal(template: TemplateRef<any>, objectId: string) {
      this.selectedElement = this.elements.filter(x => x.objectId === objectId)[0];
      this.selectedElement.data = this.selectedElement.data.sort((a, b) => {
          return (a.type > b.type) ? 1 : ((b.type > a.type) ? -1 : 0);
      });
      this.modalRef = this.modalService.show(template);
  }

  logout() {
      this.authService.logout();
  }
}
