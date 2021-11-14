import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IUserData } from "@app/interfaces";
import { UserDataService } from "@app/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  form!: FormGroup;
  addressForm!: FormGroup;

  user?: IUserData;
  isLoading?: boolean;
  isSubmitted?: boolean;

  constructor(
    private userDataService: UserDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadCurrentUser();
  }

  save({ value, invalid }: FormGroup): void {
    if (invalid) {
      alert("Invalid data, please check the form");

      return;
    }

    this.user = value;
    this.isSubmitted = true;
  }

  private loadCurrentUser(): void {
    this.isLoading = true;

    this.userDataService
      .getCurrentUser()
      .subscribe((user) => this.loadUserData(user?.id));
  }

  private loadUserData(userId?: string): void {
    if (!userId) return;

    this.userDataService.getUserData(userId).subscribe((userData) => {
      if (!userData) return;
      this.isLoading = false;

      this.user = userData;
      this.form?.patchValue(userData);
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      address: this.formBuilder.group({
        line1: ["", Validators.required],
        line2: [""],
        line3: [""],
        city: ["", Validators.required],
        county: ["", Validators.required],
        postcode: ["", Validators.required],
      }),
    });

    this.addressForm = this.form.get("address") as FormGroup;
  }
}
