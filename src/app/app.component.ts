import { Component, OnInit } from '@angular/core';

import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'profile-temp';
  
  
  imageSrc:any
  closeModal: string | undefined
  
  check:boolean = false //checking to see if image there 
  userName:any
  userPass:any
  confirmPass:any
  validatingForm:any
  passcheck:any

  ngOnInit(){

  
   
  }
  createForm(){

    this.validatingForm = this.fb.group({
      userName: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern("[a-zA-Z][a-zA-Z ]+$")]),
      userPh: new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]{10}$")]),
      userEmail: new FormControl('',[Validators.required,Validators.minLength(7),Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      userPass: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmPass:new FormControl('',[Validators.required,Validators.minLength(8)]), //ignore for now
      file: new FormControl(''),
      fileSource: new FormControl('')
  
     })
     


  }

 


  onFileChange(event:any) {

    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.validatingForm.patchValue({
        fileSource: reader.result
        
        });
        this.check = true
      };

    }

  }
  


  constructor(private modalService: NgbModal,private fb:FormBuilder) {

    this.createForm()
    this.confirmcheck()
  }
  confirmcheck(){
    
  }

    
  triggerModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  save(){
    console.log(this.validatingForm.value)  

    
  }
}
