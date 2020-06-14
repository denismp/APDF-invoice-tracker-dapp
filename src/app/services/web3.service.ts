import { Injectable } from '@angular/core';
import Web3 from 'web3';

declare let require: any
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private INVOICE_TRACKER_ARTIFACTS = require('../../../build/contracts/InvoiceTracker.json');
  private web3: Web3;
  //private contractAddress = "0xeE736518D1f6F1F7f31F1FcdF30d3A3778747d39";
  //private contractAddress = "0x996f1718e0DB756A92DD6FdBd9cD9F7bdcbe067f";
  private contractAddress = "0x25c5c5666a79446f8e9f3ef4ebe2c85a5ab66d06";

  private contractABI = this.INVOICE_TRACKER_ARTIFACTS;
  public contract: any;

  constructor() { this.initContract() }

  private initContract() {
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    //this.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545')); // this allows for the allEvents to work.
    //this.web3 = new Web3(new Web3.providers.HttpProvider('https://api.infura.io/v1/jsonrpc/ropsten')); // this allows for the allEvents to work.
    //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // keeping this for future reference.
    this.initWeb3();
  }

  private initWeb3() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.ethereum.enable().then(async () => {
        this.web3 = new Web3(window.ethereum);
        this.contract = new this.web3.eth.Contract(
          this.contractABI.abi,
          this.contractAddress
        );
        this.initEventSubscriptions();
      });
    } else {
      alert('No web3? You should consider trying MetaMask!');
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      this.web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545')); // this allows for the allEvents to work.
    }
  }

  private initEventSubscriptions(): void {
    this.contract.events.allEvents({ fromBlock: 'latest' }, async (error, event) => {
      console.log('event=', event);
      console.log('error=', error);
      // if (event.returnValues._deliveryHash) {
      //   const deliveryHash = event.returnValues._deliveryHash;
      //   const delivery = await this.getDelivery(deliveryHash);
      //   this.deliveryStream.next(delivery);
      // }
    });
  }
}
