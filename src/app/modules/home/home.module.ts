import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { UserDataService } from "@app/services";
import { ComponentsModule } from "src/app/components/components.module";
import { HeaderModule } from "../header/header.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    ComponentsModule,
  ],
})
export class HomeModule {
  constructor(userDataService: UserDataService) {
    userDataService.getCurrentUser().subscribe();
  }
}
