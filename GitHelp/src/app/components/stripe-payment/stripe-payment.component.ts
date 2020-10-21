import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {
  projectId: string;
  cost: number;
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
    key: 'pk_live_51He61ZCIJStw0TfUvCbQYRsa3aPZ6QNTxFqnwu4IkTTah3WgQl72s8xZCkngOoSRU8XGDFXPU4aTpPabl8XIr57500SdTxxbkF',
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
