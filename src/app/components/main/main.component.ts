import { Component, OnInit } from '@angular/core';
import { DropboxService } from '../../services/dropbox.service';

@Component({
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  constructor(public dropboxService: DropboxService) {}

  public ngOnInit(): void {}

  public login() {
    this.dropboxService.login().subscribe();
  }

  public logout() {
    this.dropboxService.logout();
  }
}
