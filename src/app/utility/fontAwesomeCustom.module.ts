import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp, faChevronLeft, faChevronRight, faFilter, faSignOutAlt, faSortAmountDown, faSortAmountUp, faStar } from "@fortawesome/free-solid-svg-icons";

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class FontAwesomeCustomModule {
  constructor() {
    // Font Awesome 5.0 implementation
    library.add(
      faSignOutAlt,
      faStar,
      faSortAmountDown,
      faSortAmountUp,
      faFilter,
      faCaretDown,
      faCaretUp,
      faChevronRight,
      faChevronLeft
    );
  }
}
