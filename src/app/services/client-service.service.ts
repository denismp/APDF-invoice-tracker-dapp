import { Injectable } from '@angular/core';
//import { from } from 'rxjs';
import { Web3Service } from './web3.service';
import { Client } from '../reports/client-list/client';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  //constructor(private http: HttpClient) { }
  constructor(private web3Service: Web3Service) { }

  public async createClient(clientID: string, clientName: string): Promise<any> {
    console.log("DEBUG");
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      //let owner: string = "0x81E0ABF825FA3DF39E2EF2B063504C344B9702D3A".toUpperCase();
      return await this.web3Service.contract.methods.addClient(clientID, clientName).send({ from: window.web3.eth.defaultAccount, gas: 3000000 });
    } catch (err) {
      console.log('ClientServiceService.createClient(): failed:', err);
      alert('ClientServiceService.createClient(): failed:' + err);
      return err;
    }
  }

  public async getClientCount(): Promise<number> {
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      return await this.web3Service.contract.methods.getClientCount().call({ from: window.web3.eth.defaultAccount, gas: 3000000 });
    } catch (err) {
      console.log('ClientServiceService.getClientCount(): failed:', err);
      alert('ClientServiceService.getClientCount(): failed:' + err);
    }
  }

  public async getClient(index: number): Promise<Client> {
    try {
      //let owner: string = await this.web3Service.contract.methods.getCurrentOwner().call();
      return await this.web3Service.contract.methods.getClientByIndex(index).call({ from: window.web3.eth.defaultAccount, gas: 3000000 });
    } catch (err) {
      console.log('ClientServiceService.getClientByIndex(): failed:', err);
      alert('ClientServiceService.getClientIndex(): failed:' + err);
    }
  }
}
