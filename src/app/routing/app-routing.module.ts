import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "../ui/login/login.component";
import { MovieListComponent } from "../ui/movie-list/movie-list.component";
import { MovieDetailsComponent } from "./../ui/movie-details/movie-details.component";
import { AuthGuard } from "./route-guards/auth-guard.guard";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "list",
    component: MovieListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "movie",
    component: MovieDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
