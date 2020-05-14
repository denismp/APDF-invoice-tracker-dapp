import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {
  //mweb3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // keeping this for future reference.
  // Attempting to use the example from MI4-exercise7 to use metamask
  private provider = new ethers.providers.EtherscanProvider('ropsten')
  //private contractAddress = "0xe6482f6554074c666593b5f38fe5357828a1fbd7";
  private contractAddress = "0x637ec349b9a3ab3b0df279a270510102c868d9b3";
  private contractABI = [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_clientID",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addClientEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_clientName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_invoiceNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_netTerms",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_numberHours",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_amount",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_timesheetEndDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_invoiceSentDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_due30DaysDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_due60DaysDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_due90DaysDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_due120DaysDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_datePmtReceived",
          "type": "uint256"
        }
      ],
      "name": "addInvoiceEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "_clientName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_invoiceNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_datePmtReceived",
          "type": "uint256"
        }
      ],
      "name": "updateInvoiceEvent",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_clientID",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addClient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_clientName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_invoiceNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_netTerms",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_numberHours",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_amount",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_timesheetEndDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_invoiceSentDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_due30DaysDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_due60DaysDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_due90DaysDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_due120DaysDate",
          "type": "uint256"
        }
      ],
      "name": "addInvoice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "changeOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCurrentOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_clientName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_invoiceNumber",
          "type": "uint256"
        }
      ],
      "name": "getInvoice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "invoiceNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "netTerms",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "numberHours",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "amount",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timesheetEndDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "invoiceSentDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "due30DaysDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "due60DaysDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "due90DaysDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "due120DaysDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "datePmtReceived",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_clientName",
          "type": "string"
        }
      ],
      "name": "getInvoiceCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "count",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_clientName",
          "type": "string"
        }
      ],
      "name": "getInvoiceNumbers",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_clientName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_invoiceNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_invoicePmtDate",
          "type": "uint256"
        }
      ],
      "name": "updateInvoice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  private wallet: ethers.Wallet;
  private contract: ethers.Contract

  constructor() { }

  private initContract(privateKey: string) {
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(
      this.contractAddress,
      this.contractABI,
      this.wallet);
  }

  addInvoice(
    privateKey: string,
    clientName: string,
    invoiceNumber: number,
    netTerms: number,
    numberHours: number,
    amount: string,
    timesheetEndDate: number,
    invoiceSentDate: number,
    due30DaysDate: number,
    due60DaysDate: number,
    due90DaysDate: number,
    due120DaysDate: number
  ): Observable<any> {
    this.initContract(privateKey);
    console.log('clientName=' + clientName);
    console.log('invoiceNumber=' + invoiceNumber);
    console.log('netTerms=' + netTerms);
    console.log('numberHours=' + numberHours);
    console.log('amount=' + amount);
    console.log('timesheetEndDate=' + timesheetEndDate);
    console.log('invoiceSentDate=' + invoiceSentDate);
    console.log('due30DaysDate=' + due30DaysDate);
    console.log('due60DaysDate=' + due60DaysDate);
    console.log('due90DaysDate=' + due90DaysDate);
    console.log('due120DaysDate=' + due120DaysDate);
    return from(this.contract.addInvoice(
      clientName,
      invoiceNumber,
      netTerms,
      numberHours,
      amount,
      timesheetEndDate,
      invoiceSentDate,
      due30DaysDate,
      due60DaysDate,
      due90DaysDate,
      due120DaysDate
    ));
  }
}
