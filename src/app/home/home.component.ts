import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customer: string = '';
  service: string = '';
  option: string = '';
  quantity: number = 0;
  kilo: number = 0; // Added kilo property
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  updateSummary() {
    // Logic to update the summary based on user inputs
    console.log(`Customer: ${this.customer}, Service: ${this.service}, Option: ${this.option}, Quantity: ${this.quantity}, Kilo: ${this.kilo}`);
  }

  resetForm() {
    this.customer = '';
    this.service = '';
    this.option = '';
    this.quantity = 0;
    this.kilo = 0; // Reset kilo property
    this.successMessage = '';
    this.errorMessage = '';
  }

  calculatePrice(): number {
    const kiloPrice = 63;
    let basePrice = 0;
    switch (this.service) {
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
    switch (this.option) {
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

    return (basePrice + optionPrice + kiloPrice * this.kilo); // Use kilo property
  }

  submitForm() {
    const orderData = {
      customer: this.customer,
      service: this.service,
      option: this.option,
      quantity: this.quantity,
      kilo: this.kilo, // Include kilo property
      price: this.calculatePrice()
    };
  
    console.log('Order Data:', orderData); // Log the data to verify
  
    this.http.post('http://localhost:8080/api/v1/invoices', orderData)
      .subscribe(
        response => {
          this.successMessage = 'Order submitted successfully';
          this.errorMessage = '';
          console.log('Order submitted successfully', response);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Error submitting order: ' + (error.error.message || error.message || 'Unknown error');
          this.successMessage = '';
          console.error('Error submitting order', error);
        }
      );
  
    // Additional logging to ensure the function is called
    console.log('submitForm function executed');
  }
}