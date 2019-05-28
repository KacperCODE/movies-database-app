import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt, faStar, faSortAmountDown, faSortAmountUp, faFilter, faCaretDown, faCaretUp, faArrowLeft, faArrowRight, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

@NgModule({
    imports: [
      FontAwesomeModule
    ],
    exports: [
      FontAwesomeModule
    ]
  })
  export class FontAwesomeCustomModule { 
    constructor() {
      // Font Awesome 5.0 implementation
      library.add(faSignOutAlt, faStar, faSortAmountDown, faSortAmountUp, faFilter, faCaretDown, faCaretUp, faChevronRight, faChevronLeft );
    }
  }