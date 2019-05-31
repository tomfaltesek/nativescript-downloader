import { Observable } from 'tns-core-modules/data/observable';
import {
  Downloader,
  ProgressEventData,
  DownloadEventData,
  DownloadEventError
} from 'nativescript-downloader';
import * as fs from 'tns-core-modules/file-system';
export class HelloWorldModel extends Observable {
  public downloadManager: Downloader;
  fileDownloaderId: string;
  imageDownloaderId: string;
  constructor() {
    super();
    this.set('fileSpeed', 0);
    this.set('imageSpeed', 0);
    this.set('image', fs.knownFolders.documents().path + 'beach.jpg');
  }

  generateDownloads() {
    this.downloadManager = new Downloader();
    this.set('fileProgress', 0);
    this.set('imageProgress', 0);
    this.imageDownloaderId = this.downloadManager.createDownload({
      path: fs.knownFolders.documents().path,
      fileName: 'beach.jpg',
      url:
        'https://images.unsplash.com/photo-1530559423894-148fad85faf7?ixlib=rb-0.3.5&q=100&fm=jpg&crop=entropy&cs=srgb&dl=daria-kopylova-723534-unsplash.jpg&s=46720eb1ac5a8e23d6ee46e73b64246e'
    });
    console.log(`Image Id :${this.imageDownloaderId} `);

    this.fileDownloaderId = this.downloadManager.createDownload({
      url: 'https://cartographicperspectives.org/index.php/journal/article/download/cp43-complete-issue/pdf/'
    });
    console.log(`File Id :${this.fileDownloaderId} `);
  }

  generateAndStart() {
    this.generateDownloads();
    this.downloadFile();
    this.downloadImage();
  }

  downloadFile() {
    this.downloadManager
      .start(this.fileDownloaderId, (progressData: ProgressEventData) => {
        this.set('fileProgress', progressData.value);
        this.set('fileSpeed', progressData.speed);
      })
      .then(completed => {
        console.log(`File : ${completed.path}`);
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  pauseFile() {
    this.downloadManager.pause(this.fileDownloaderId);
  }

  resumeFile() {
    this.downloadManager.resume(this.fileDownloaderId);
  }

  downloadImage() {
    this.downloadManager
      .start(this.imageDownloaderId, (progressData: ProgressEventData) => {
        this.set('imageProgress', progressData.value);
        this.set('imageSpeed', progressData.speed);
      })
      .then((completed: DownloadEventData) => {
        console.log(`Image : ${completed.path}`);
        this.set('image', completed.path);
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}
