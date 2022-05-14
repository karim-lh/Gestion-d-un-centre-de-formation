import { Component, OnInit } from '@angular/core';
import { SessionsformationsService } from '@services/sessionsformations.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganismeService } from '@services/organisme.service';
import { FormateurService } from '@services/formateur.service';
import { ParticipantService } from '@services/participant.service';




@Component({
  selector: 'app-sessionsformations',
  templateUrl: './sessionsformations.component.html',
  styleUrls: ['./sessionsformations.component.scss'],
})
export class SessionsformationsComponent implements OnInit {
  Sformations: any;  
  organismes: any;
  formateurs: any; 
  participants: any; 
  closeResult = '';
  lieu : String; 
  nb_participant : Number;
  dateDebut : Date;
  dateFin : Date;
  index : Number;
  id:Number;
   
  SFormationForm = new FormGroup({
    lieu: new FormControl('',Validators.required),
    nb_participant: new FormControl('',Validators.required),
    dateDebut: new FormControl('',Validators.required),
    dateFin: new FormControl('',Validators.required),
    organisme: new FormControl('',Validators.required),
    formateur: new FormControl('',Validators.required),
    participantList: new FormControl('',Validators.required),
    
  });
  constructor(private os:OrganismeService, private ps:ParticipantService,private sfs: SessionsformationsService, private modalService: NgbModal, private fs : FormateurService) { }

  ngOnInit(): void {
    this.retrieveSFormation();
    this.retrieveOrganismes();
    this.retrieveFormateurs();
    this.retrieveParticipants();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  getoneFormateur(formateurid){
    this.fs.get(formateurid)
    .subscribe(data => {
      this.formateurs = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
}
getoneParticipant(participantid){
  this.ps.get(participantid)
  .subscribe(data => {
    this.participants = data;
    console.log(data);
  },
  error => {
    console.log(error);
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
 //
  open2(content2,i) {
    this.index = i ;
    console.log(i);
    this.modalService.open(content2, {ariaLabelledBy: 'modal2-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  retrieveSFormation() {

    this.sfs.getAll()
      .subscribe(

        data => {
          console.log(data);
          this.Sformations = data;
          console.log(this.Sformations);
        },
        error => {
          console.log(error);
        });
  }
  retrieveFormateurs() {
    this.fs.getAll()
      .subscribe(
        data => {
          this.formateurs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  retrieveParticipants() {
    this.ps.getAll()
      .subscribe(
        data => {
          this.participants = data;
          console.log(data);
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
ResetData(){
  this.SFormationForm.reset();
  console.log(this.SFormationForm.value);
}
  add(){

  //  console.log(this.organismes.organisme_id ) ;
  //  console.log(this.formateurs.formateur_id ) ;
  //  console.log(this.participants.participant_id ) ;
   // this.FormationForm.value.domaine_id = this.dom.idDomaine;
    console.log(this.SFormationForm.value);
    //this.FormationForm.setValue({domaine_id:})
    this.sfs.create(this.SFormationForm.value)
    .subscribe(response => {
      this.SFormationForm.reset();
      console.log(response);
      this.retrieveSFormation() 
    },
    error => {
      console.log(error);
    });
  }
  update(i){
    console.log(this.SFormationForm.value);
    this.sfs.update(i,this.SFormationForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveSFormation() 
    },
    error => {
      console.log(error);
    });
    
  }
  del(id){

    if(window.confirm('Confirmer Choix')) {
      this.sfs.delete(id)
        .subscribe(
          response => {
            console.log(response);
            this.retrieveSFormation() ;
    
          },
          error => {
            console.log(error);
          });
    }
    
  }
}
