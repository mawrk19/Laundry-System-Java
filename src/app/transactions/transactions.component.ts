import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  invoices: any[] = [];
  selectedInvoices: any[] = [];

  constructor(private invoiceService: InvoiceService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(data => {
      this.invoices = data;
      console.log('Invoices loaded:', this.invoices);
    });
  }

  ngAfterViewInit(): void {
    this.setupModalHandlers();
  }

  setupModalHandlers(): void {
    const modal = document.getElementById('receiptModal');
    const closeModal = document.getElementById('closeModal');
    const printButton = document.getElementById('printReceipt');
    const cancelButton = document.getElementById('cancelReceipt');

    if (closeModal) {
      this.renderer.listen(closeModal, 'click', () => this.closeModal(modal));
    }

    if (cancelButton) {
      this.renderer.listen(cancelButton, 'click', () => this.closeModal(modal));
    }

    if (printButton) {
      this.renderer.listen(printButton, 'click', () => this.printModalContent());
    }

    this.renderer.listen(window, 'click', (event: Event) => {
      if (modal && event.target === modal) {
        this.closeModal(modal);
      }
    });
  }

  closeModal(modal: HTMLElement | null): void {
    if (modal) {
      modal.style.display = 'none';
    }
  }

  reprintSelected(): void {
    console.log('Invoices before filtering:', this.invoices);
    this.selectedInvoices = this.invoices.filter(invoice => invoice.selected);
    console.log('Selected invoices for reprint:', this.selectedInvoices);
    if (this.selectedInvoices.length > 0) {
      this.showReceiptModal();
    } else {
      console.warn('No invoices selected for reprint.');
    }
  }

  showReceiptModal(): void {
    const modal = document.getElementById('receiptModal');
    if (modal) {
      modal.style.display = 'block';
    } else {
      console.error('Receipt modal not found.');
    }
  }

  printModalContent(): void {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>@media print { .modal-buttons, .close { display: none; } }</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(modalContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  }
}