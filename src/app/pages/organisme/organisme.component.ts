import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreRootModule } from '@ngrx/store';
import { OrganismeService } from '@services/organisme.service';
@Component({
  selector: 'app-organisme',
  templateUrl: './organisme.component.html',
  styleUrls: ['./organisme.component.scss']
})
export class OrganismeComponent implements OnInit {

  organismes: any; 
closeResult = '';
libelle : String; 
index : Number;
id:Number;
OrganismeForm = new FormGroup({libelle: new FormControl('',Validators.required)
});
  constructor(private os: OrganismeService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.retrieveOrganismes();
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

  retrieveOrganismes() {
    this.os.getAll()
      .subscribe(
        data => {
          this.organismes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  add(){
    console.log(this.OrganismeForm.value);
    this.os.create(this.OrganismeForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveOrganismes() 
    },
    error => {
      console.log(error);
    });
    
  }
  update(i){
    console.log(this.OrganismeForm.value);
    this.os.update(i,this.OrganismeForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveOrganismes() 
    },
    error => {
      console.log(error);
    });
    
  }
  del(id){

    if(window.confirm('Confirmer Choix')) {
      this.os.delete(id)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveOrganismes() ;
    
          },
          error => {
            console.log(error);
          });
    }
    
  }
}

