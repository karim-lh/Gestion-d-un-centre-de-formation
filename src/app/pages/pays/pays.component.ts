import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreRootModule } from '@ngrx/store';
import { PaysService } from '@services/pays.service';
@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit {
  payss: any; 
  closeResult = '';
  libelle : String; 
  index : Number;
  id:Number;
  PaysForm = new FormGroup({libelle: new FormControl('',Validators.required)
  });
  constructor(private ps: PaysService, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.retrievePays();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  open2(content2,i) {
    this.index = i ;
    console.log(i);
    this.modalService.open(content2, {ariaLabelledBy: 'modal2-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  retrievePays() {
    this.ps.getAll()
      .subscribe(
        data => {
          this.payss = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  add(){
    console.log(this.PaysForm.value);
    this.ps.create(this.PaysForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrievePays() 
    },
    error => {
      console.log(error);
    });
    
  }
  update(i){
    console.log(this.PaysForm.value);
    this.ps.update(i,this.PaysForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrievePays() 
    },
    error => {
      console.log(error);
    });
    
  }
  del(id){

    if(window.confirm('Confirmer Choix')) {
      this.ps.delete(id)
        .subscribe(
          response => {
            console.log(response);
            this.retrievePays() ;
    
          },
          error => {
            console.log(error);
          });
    }
    
  }
}

