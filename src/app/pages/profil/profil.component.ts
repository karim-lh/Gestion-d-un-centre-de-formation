import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreRootModule } from '@ngrx/store';
import { ProfilService } from '@services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  profils: any; 
fomations: any; 
closeResult = '';
libelle : String; 
index : Number;
id:Number;
ProfilForm = new FormGroup({
  libelle: new FormControl('',Validators.required)
});

  constructor( private ps: ProfilService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveProfils();
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

  retrieveProfils() {
    this.ps.getAll()
      .subscribe(
        data => {
          this.profils = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  add(){
    console.log(this.ProfilForm.value);
    this.ps.create(this.ProfilForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveProfils() 
    },
    error => {
      console.log(error);
    });
    
  }
  update(i){
    console.log(this.ProfilForm.value);
    this.ps.update(i,this.ProfilForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveProfils() 
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
            this.retrieveProfils() ;
    
          },
          error => {
            console.log(error);
          });
    }
    
  }
}
