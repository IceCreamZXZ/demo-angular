import {Component, OnInit} from '@angular/core';
import {AngestellteService} from "./angestellte.service";
import {Angestellter} from "./angestellter";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  public angestellte: Angestellter[] = [];
  public closeResult: string = '';

  constructor(private service: AngestellteService, private modal:NgbModal) {}

  public ngOnInit() {
    this.getAngestellte();
  }

  public getAngestellte(): void {
    this.service.getAngestellte().subscribe(
      (response: Angestellter[]) => {
        this.angestellte = response;
      },
      (error: HttpErrorResponse) => {
        console.log('Http request error');
      }
    )
  }

  public deleteAngestellter(angestellter: Angestellter): void {
    this.service.deleteAngestellter(angestellter.id ?? 0).subscribe(
      (response) => {
        console.log(angestellter.vorname + " was deleted");
        this.getAngestellte();
      },
      (error: HttpErrorResponse) => {
        alert("Failed to delete " + angestellter.vorname + angestellter.nachname);
      }
    );
  }

  public submit(add: NgForm): void {
    var newAngestellter: Angestellter = {
      id: undefined,
      vorname: add.value.vorname,
      nachname: add.value.nachname,
      gehalt: add.value.gehalt,
    }

    this.service.addAngestellter(newAngestellter).subscribe(
      (response) => {
        this.getAngestellte();
        add.resetForm();
      },
      (error: HttpErrorResponse) => {
        console.log("Something went wrong while adding new Angestellter")
        add.resetForm();
      }
    )

  }

}
