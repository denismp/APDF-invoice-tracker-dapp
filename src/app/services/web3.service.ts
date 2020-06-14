import { Injectable } from '@angular/core';
import Web3 from 'web3';


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private INVOICE_TRACKER_ARTIFACTS = require('../../../build/contracts/InvoiceTracker.json');
  private web3: Web3;
  //private contractAddress = "0xeE736518D1f6F1F7f31F1FcdF30d3A3778747d39";
  private contractAddress = "0x996f1718e0DB756A92DD6FdBd9cD9F7bdcbe067f";

  private contractABI = this.INVOICE_TRACKER_ARTIFACTS;
  public contract: any;

  constructor() { this.initContract() }

  private initContract() {
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    this.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545')); // this allows for the allEvents to work.
    //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // keeping this for future reference.
    this.contract = new this.web3.eth.Contract(
      this.contractABI.abi,
      this.contractAddress
    );
    this.initEventSubscriptions();
    // this.web3.eth.getBalance(this.owner, (err, wei) => {
    //   let balance = this.web3.utils.fromWei(wei, 'ether');
    //   console.log('balance=',balance);
    // });
  }

  private initEventSubscriptions(): void {
    this.contract.events.allEvents({ fromBlock: 'latest' }, async (error, event) => {
      console.log('event=',event);
      console.log('error=',error);
      // if (event.returnValues._deliveryHash) {
      //   const deliveryHash = event.returnValues._deliveryHash;
      //   const delivery = await this.getDelivery(deliveryHash);
      //   this.deliveryStream.next(delivery);
      // }
    });
  }
}
