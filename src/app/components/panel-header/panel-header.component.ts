import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css'],
})
export class PanelHeaderComponent implements OnInit {
  constructor() {}

  @Input() PanelTitle: string;
  @Input() PanelSubtitle: string;

  ngOnInit(): void {}
}
