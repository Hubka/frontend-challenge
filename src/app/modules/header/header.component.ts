import { Component, Input } from "@angular/core";
import { IAddress, IUserData } from "@app/interfaces";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  fullName?: string;
  address?: string;
  initials?: string;

  @Input() set user(user: IUserData | undefined) {
    if (!user) return;

    this.setFullname(user);
    this.setInitials(user);
    this.setAddress(user.address);
  }

  private setFullname({ firstName, lastName }: IUserData): void {
    this.fullName = `${firstName} ${lastName}`;
  }

  private setInitials({ firstName, lastName }: IUserData): void {
    this.initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  private setAddress(address: IAddress): void {
    if (!address) return;

    const addressParts = [address.city, address.county, address.postcode];

    if (address.line3) {
      addressParts.unshift(address.line3);
    }

    if (address.line2) {
      addressParts.unshift(address.line2);
    }

    addressParts.unshift(address.line1);

    this.address = addressParts.join(", ");
  }
}
