import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  constructor() {}

  @Input() PanelTitle: string;
  @Input() PanelSubtitle: string;

  ngOnInit(): void {}
}
