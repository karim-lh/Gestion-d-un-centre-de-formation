import { Component, OnInit } from '@angular/core';
import { DomaineService } from '@services/domaine.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreRootModule } from '@ngrx/store';


@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.scss']
})
export class DomaineComponent implements OnInit {
domaines: any; 
fomations: any; 
closeResult = '';
libelle : String; 
index : Number;
id:Number;
DomaineForm = new FormGroup({
  libelle: new FormControl('',Validators.required)
});

  constructor( private ds: DomaineService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveDomaines();
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

  retrieveDomaines() {
    this.ds.getAll()
      .subscribe(
        data => {
          this.domaines = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  add(){
    console.log(this.DomaineForm.value);
    this.ds.create(this.DomaineForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveDomaines() 
    },
    error => {
      console.log(error);
    });
    
  }
  update(i){
    console.log(this.DomaineForm.value);
    this.ds.update(i,this.DomaineForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveDomaines() 
    },
    error => {
      console.log(error);
    });
    
  }
  del(id){

    if(window.confirm('Confirmer Choix')) {
      this.ds.delete(id)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveDomaines() ;
    
          },
          error => {
            console.log(error);
          });
    }
    
  }
}
