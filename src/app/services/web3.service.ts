import { Injectable } from '@angular/core';
import Web3 from 'web3';


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private INVOICE_TRACKER_ARTIFACTS = require('../../../build/contracts/InvoiceTracker.json');
  private web3: Web3;
  private contractAddress = "0x7B6Dff6794777362cA752286473e79674A67a740";

  private contractABI = this.INVOICE_TRACKER_ARTIFACTS;
  public contract: any;
  // public owner: string = '0xc2A0f1646c32d526931752E6388F50F5fC123b31';

  constructor() { this.initContract() }

  private initContract() {
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); // keeping this for future reference.
    this.contract = new this.web3.eth.Contract(
      this.contractABI.abi,
      this.contractAddress
    );
    // this.web3.eth.getBalance(this.owner, (err, wei) => {
    //   let balance = this.web3.utils.fromWei(wei, 'ether');
    //   console.log('balance=',balance);
    // });
  }
}
