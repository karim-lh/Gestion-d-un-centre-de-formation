import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormateurService } from '@services/formateur.service';
import { OrganismeService } from '@services/organisme.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.scss']
})
export class FormateurComponent implements OnInit {
  formateurs: any;  
  organismes: any;  
  closeResult = '';
  nom : String; 
  prenom : String;
  email : String;
  tel : Number;
  type : String;
  index : Number;
  id:Number;
  
  FormateurForm = new FormGroup({
    nom: new FormControl('',Validators.required),
    prenom: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    tel: new FormControl('',Validators.required),
    type: new FormControl('',Validators.required),
   organisme: new FormControl('',Validators.required),
   
    
  });
  constructor(private os:OrganismeService, private fs: FormateurService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveFormateur();
      this.retrieveOrganismes();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  
  getoneOrganisme(organismeid){
    this.os.get(organismeid)
    .subscribe(data => {
      this.organismes = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
}
  changeOrganismeId(organisme_id){
    
    console.log(organisme_id);
    this.FormateurForm.setValue({
      organisme_id : organisme_id
    
    })
    console.log(this.FormateurForm.value);

  }
  open2(content2,i) {
    this.index = i ;
    console.log(i);
    this.modalService.open(content2, {ariaLabelledBy: 'modal2-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  retrieveFormateur() {
    this.fs.getAll()
      .subscribe(
        data => {
          this.formateurs = data;
          console.log(this.formateurs);
        },
        error => {
          console.log(error);
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

    console.log(this.organismes.organisme_id ) ;
   // this.FormationForm.value.domaine_id = this.dom.idDomaine;
    console.log(this.FormateurForm.value);
    //this.FormationForm.setValue({domaine_id:})
    this.fs.create(this.FormateurForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveFormateur() 
    },
    error => {
      console.log(error);
    });
  }
  update(i){
    console.log(this.FormateurForm.value);
    this.fs.update(i,this.FormateurForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveFormateur() 
    },
    error => {
      console.log(error);
    });
    
  }
  del(id){

    if(window.confirm('Confirmer Choix')) {
      this.fs.delete(id)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveFormateur() ;
    
          },
          error => {
            console.log(error);
          });
    }
    
  }
}