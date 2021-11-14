import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("setAddress", () => {
    it("should format valid address", () => {
      const address = {
        line1: "Nelson Mandela House",
        line2: "",
        line3: "",
        city: "Peckham",
        county: "London",
        postcode: "SE15",
      };

      component["setAddress"](address);

      expect(component.address).toBe(
        "Nelson Mandela House, Peckham, London, SE15"
      );

      address.line2 = "Lorem";

      component["setAddress"](address);

      expect(component.address).toBe(
        "Nelson Mandela House, Lorem, Peckham, London, SE15"
      );

      address.line3 = "Ipsum";

      component["setAddress"](address);

      expect(component.address).toBe(
        "Nelson Mandela House, Lorem, Ipsum, Peckham, London, SE15"
      );
    });
  });
});
