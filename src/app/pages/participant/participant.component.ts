import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ParticipantService } from '@services/participant.service';
import { ProfilService } from '@services/profil.service';
import { PaysService } from '@services/pays.service';
import { OrganismeService } from '@services/organisme.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {
  participants: any;  
  profils: any; 
  payss: any;
  organismes: any; 
  closeResult = '';
  nom : String; 
  prenom : String;
  email : String;
  tel : Number;
  index : Number;
  id:Number;
  ParticipantForm = new FormGroup({
    nom: new FormControl('',Validators.required),
    prenom: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    tel: new FormControl('',Validators.required),
   profil: new FormControl('',Validators.required), 
   pays: new FormControl('',Validators.required),
   organisme: new FormControl('',Validators.required),
   
  });
  constructor(private ps:ProfilService,private pss:PaysService,private os:OrganismeService, private fs: ParticipantService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.retrieveParticipant();
      this.retrieveProfils();
      this.retrievePays();
      this.retrieveOrganismes();
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  
  getoneProfil(profilid){
    this.ps.get(profilid)
    .subscribe(data => {
      this.profils = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
}
  changeProfilId(profil_id){
    
    console.log(profil_id);
    this.ParticipantForm.setValue({
      profil_id : profil_id
    
    })
    console.log(this.ParticipantForm.value);

  }
  getonePays(paysid){
    this.pss.get(paysid)
    .subscribe(data => {
      this.payss = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
}
  changePaysId(pays_id){
    
    console.log(pays_id);
    this.ParticipantForm.setValue({
      pays_id : pays_id
    
    })
    console.log(this.ParticipantForm.value);

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
    this.ParticipantForm.setValue({
      organisme_id : organisme_id
    
    })
    console.log(this.ParticipantForm.value);

  }
  open2(content2,i) {
    this.index = i ;
    console.log(i);
    this.modalService.open(content2, {ariaLabelledBy: 'modal2-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  retrieveParticipant() {
    this.fs.getAll()
      .subscribe(
        data => {
          this.participants = data;
          console.log(this.participants);
        },
        error => {
          console.log(error);
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
  retrievePays() {
    this.pss.getAll()
      .subscribe(
        data => {
          this.payss = data;
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
  

  add(){

    console.log(this.profils.profil_id ) ;
    console.log(this.organismes.organisme_id ) ;
    console.log(this.payss.pays_id ) ;
   // this.FormationForm.value.domaine_id = this.dom.idDomaine;
    console.log(this.ParticipantForm.value);
    //this.FormationForm.setValue({domaine_id:})
    this.fs.create(this.ParticipantForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveParticipant() 
    },
    error => {
      console.log(error);
    });
  }
  update(i){
    console.log(this.ParticipantForm.value);
    this.fs.update(i,this.ParticipantForm.value)
    .subscribe(response => {
      console.log(response);
      this.retrieveParticipant() 
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
            this.retrieveParticipant() ;
    
          },
          error => {
            console.log(error);
          });
    }
    
  }
}