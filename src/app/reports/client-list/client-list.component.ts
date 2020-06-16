import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from 'src/app/services/client-service.service';
import { Client } from './client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  public model = new Client();
  public loadedClients: Client[] = [];
  public isFetching: boolean = false;

  constructor(private clientService: ClientServiceService) { }

  public ngOnInit(): void {
    this.loadClients();
  }

  public loadClients(): void {
    this.loadedClients = [];
    this.clientService.getClientCount()
      .then(count => {
        for (let i = 0; i < count; i++) {
          console.log('ClientListComponent.loadClients(): count=',count);
          this.clientService.getClient(i)
            .then(client => {
              console.log('ClientListComponent.loadClients(): client=',client);
              this.loadedClients.push(client);
            })
            .catch(err => {
              console.log('ClientListComponent.loadClients(): getClient() failed with err=', err);
            });
        }
      })
      .catch(err => {
        console.log('ClientListComponent.loadClients(): getClientCount() failed with err=', err);
      });
  }
}
