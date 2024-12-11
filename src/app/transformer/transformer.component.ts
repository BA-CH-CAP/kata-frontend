import { Component, Inject, TemplateRef  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TransformService } from '../transform.service';

@Component({
  selector: 'app-transformer',
  standalone: false,
  providers: [NgbModal],
  templateUrl: './transformer.component.html',
  styleUrl: './transformer.component.css'
})
export class TransformerComponent {
  result = '';
  closeResult = '';
  isLoading = false;
  isShowError = false;
  isResultReceived = false;

  numValue = new FormControl<number | null>(null, [ Validators.min(0),
                                          Validators.max(100),
                                          Validators.pattern(/^\d*$/),
                                          Validators.required ]);

  constructor(private transformService: TransformService, private config: NgbModalConfig, private modalService: NgbModal, ) {
      config.backdrop = 'static';
      config.keyboard = false;
  }

  open(content: TemplateRef<any>) {
      this.modalService.open(content).result.then(
          (result) => { this.onSubmit()},
          (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
      );
    }

   private getDismissReason(reason: any): string {
   		switch (reason) {
   			case ModalDismissReasons.ESC:
   				return 'by pressing ESC';
   			case ModalDismissReasons.BACKDROP_CLICK:
   				return 'by clicking on a backdrop';
   			default:
   				return `with: ${reason}`;
   		}
   	}

  onSubmit() {
    this.isLoading = true;
    this.isShowError = false;
    this.isResultReceived = false;

    let val = this.numValue.value;

    if(val !== undefined && val !== null)
      this.transformService.getResult(val)
      .subscribe(
        data => {
          this.result = <string>data;
          this.isLoading = false;
          this.isResultReceived = true;
        },
        error  => {
          this.isLoading = false;
          this.isShowError = true;
        }
      );
  }

}
