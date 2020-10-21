import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaderResponse, HttpResponse, HttpRequest } from "@angular/common/http";
import { send } from 'process';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements OnInit {
  projectId: string;
  token : any;
  cost: number;
  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.loadStripe();
    
  }
private url = "https://githelp.azurewebsites.net/api/StripePayment"
  
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
}


takePayment(productName: string, amount: number, token: any) {
  let body = {
    tokenId: token.id,
    productName: productName,
    amount: amount
  };
  
  


  this.http
    .post( "https://localhost:5001/api/StripePayment", body)
    .toPromise()
    .then(res => {
      console.log("ok");
    })
    .catch(error => {
      console.log(error.message);
    });
}






  payment(productName: string, amount: number, tokenCallback) {    

      

  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_live_51He61ZCIJStw0TfUvCbQYRsa3aPZ6QNTxFqnwu4IkTTah3WgQl72s8xZCkngOoSRU8XGDFXPU4aTpPabl8XIr57500SdTxxbkF',
    locale: 'auto',
    amount: amount,
    currency: 'usd',
    token: tokenCallback,
    product: productName,
   
  });

  handler.open({
    name: 'GitHelp',
    description: 'Project',
    amount: amount
  });

    
}


pay(){
  this.payment("githelp", 50, (token: any) =>
      this.takePayment("githelp", 50, token)
  );
}

  

gohome(){

  return this.router.navigate(['/home']);
}

}