import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadStripe();
  }

  
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
}

  pay(amount) {    
 
  var handler = (<any>window).StripeCheckout.configure({
    key: "pk_test_51He61ZCIJStw0TfUavdgaagOU0HkIFp8fcrM1BzvVu6o8OtwXlIsyin6l62zLDPbpkNLJMPbECs9x7TXRwV3OW1T00rs3UY7CT",
    locale: 'auto',
    token: function (token: any, router: Router) {
      console.log(token)
     
    //  alert('Token Created!!');
    
    }
     
  });

  handler.open({
    name: 'GitHelp',
    description: 'Project',
    amount: amount * 100
  });

 

}

gohome(){

  return this.router.navigate(['/home']);
}

}
