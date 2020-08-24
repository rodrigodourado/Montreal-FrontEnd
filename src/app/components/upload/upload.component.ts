import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
  constructor(private http: HttpClient, private configService: ConfigService) {}
  ngOnInit() {}
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http
      .post(`${this.configService.urlApi}/v1/upload`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((100 * event.loaded) / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload realizado com sucesso.';
          this.onUploadFinished.emit(event.body);
        }
      });
  };
}
