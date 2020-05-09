import { Injectable } from '@angular/core';
// import {
//   HttpClient,
//   HttpHeaders,
//   HttpParams,
//   HttpEventType
// } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs'
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { ethers } from 'ethers';
import { Client } from '../client/new-client/client';
import { from } from 'rxjs';

//import Web3 from 'web3'; // keeping this for future reference.  You would need to run npm install web3.
// For metamask do the following npm commands.
// npm install --save ethers
// npm install crypto-j

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  //mweb3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // keeping this for future reference.
  // Attempting to use the example from MI4-exercise7 to use metamask
  provider = new ethers.providers.EtherscanProvider('ropsten')
  contractAddress = "0x28fcf7997e56f1fadd4fa39fd834e5b96cb13b2b";
  contractABI = [
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
        },
        {
          "internalType": "uint256",
          "name": "_datePmtReceived",
          "type": "uint256"
        }
      ],
      "name": "addInvoice",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
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
    }
  ];
  contract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);

  //constructor(private http: HttpClient) { }
  constructor() { }

  // getInvoiceTracker(): ethers.Contract {
  //   return this.contract.new();
  // }

  createClient(clientID: string, clientName: string): Observable<any> {
    return from(this.contract.addClient(clientID, clientName));
  }
}
