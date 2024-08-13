import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customerName: string = '';
  selectedService: string = '';
  selectedOption: string = '';
  quantity: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  updateSummary() {
    // Logic to update the summary based on user inputs
    console.log(`Customer: ${this.customerName}, Service: ${this.selectedService}, Option: ${this.selectedOption}, Quantity: ${this.quantity}`);
  }

  resetForm() {
    this.customerName = '';
    this.selectedService = '';
    this.selectedOption = '';
    this.quantity = 0;
    this.successMessage = '';
    this.errorMessage = '';
  }

  calculatePrice(): number {
    let basePrice = 0;
    switch (this.selectedService) {
      case 'Dry Clean':
        basePrice = 10;
        break;
      case 'Self Service':
        basePrice = 5;
        break;
      case 'Fluff and Fold Service':
        basePrice = 15;
        break;
      case 'Blanket/Comforter':
        basePrice = 20;
        break;
    }

    let optionPrice = 0;
    switch (this.selectedOption) {
      case 'Ironing':
        optionPrice = 2;
        break;
      case 'Laundry and Ironing':
        optionPrice = 5;
        break;
      case 'Sun Dry':
        optionPrice = 1;
        break;
    }

    return (basePrice + optionPrice) * this.quantity;
  }

  submitForm() {
    const orderData = {
      customerName: this.customerName,
      selectedService: this.selectedService,
      selectedOption: this.selectedOption,
      quantity: this.quantity,
      price: this.calculatePrice()
    };

    this.http.post('http://your-backend-url/api/orders', orderData)
      .subscribe(response => {
        this.successMessage = 'Order submitted successfully';
        this.errorMessage = '';
        console.log('Order submitted successfully', response);
      }, error => {
        this.errorMessage = 'Error submitting order';
        this.successMessage = '';
        console.error('Error submitting order', error);
      });
  }
}