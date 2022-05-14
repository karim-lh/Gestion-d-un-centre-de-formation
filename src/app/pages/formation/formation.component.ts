import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormationService } from '@services/formation.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomaineService } from '@services/domaine.service';
import { SessionsformationsService } from '@services/sessionsformations.service';



@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent implements OnInit {
  
  formations: any;  
  domaines: any;  
  closeResult = '';
  titre : String; 
  type_formation : String;
  nb_session : Number;
  duree : Number;
  budget : Number;
  index : Number;
  id:Number;
  dom: any;
  onedomaine : any; 
  sessions : any; 
  FormationForm = new FormGroup({
    titre: new FormControl('',Validators.required),
    type_formation: new FormControl('',Validators.required),
    nb_session: new FormControl('',Validators.required),
    duree: new FormControl('',Validators.required),
    budget: new FormControl('',Validators.required),
   domaine: new FormControl('',Validators.required),
   sessionformations: new FormControl('',Validators.required),
    
  });
  
    constructor(private sf:SessionsformationsService, private fs: FormationService, private modalService: NgbModal, private ds : DomaineService) { }
  
    ngOnInit(): void {
      this.retrieveFormation();
      this.retrieveSession();
      this.retrieveDomaines();
    }
    open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
    }
    
    getoneDomaine(domaineid){
      this.ds.get(domaineid)
      .subscribe(data => {
        this.onedomaine = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}
    changeDomaineId(domaine_id){
      console.log("here bb");
      console.log(domaine_id);
      this.FormationForm.setValue({
        domaine_id : domaine_id
      
      })
      console.log(this.FormationForm.value);

    }
    open2(content2,i) {
      this.index = i ;
      console.log(i);
      this.modalService.open(content2, {ariaLabelledBy: 'modal2-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      });
    }
  
    retrieveFormation() {
      this.fs.getAll()
        .subscribe(
          data => {
            this.formations = data;
            console.log(this.formations);
          },
          error => {
            console.log(error);
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
    retrieveSession() {
      this.sf.getAll()
        .subscribe(
          data => {
            this.sessions = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }

    add(){

      console.log(this.domaines.domaine_id +"dhia ghafass") ;
     // this.FormationForm.value.domaine_id = this.dom.idDomaine;
      console.log(this.FormationForm.value);
      //this.FormationForm.setValue({domaine_id:})
      this.fs.create(this.FormationForm.value)
      .subscribe(response => {
        console.log(response);
        this.retrieveFormation() 
      },
      error => {
        console.log(error);
      });
    }
    update(i){
      console.log(this.FormationForm.value);
      this.fs.update(i,this.FormationForm.value)
      .subscribe(response => {
        console.log(response);
        this.retrieveFormation() 
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
              this.retrieveFormation() ;
      
            },
            error => {
              console.log(error);
            });
      }
      
    }
  }
  
