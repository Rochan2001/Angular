import { async, ComponentFixture, TestBed } from "@angular/core/testing";

// must import these modules before right now it is doing isolated testing
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser"; // DOM element selector like jQuery
import { DebugElement } from "@angular/core"; // fetech DOM element
import { MenuComponent } from "./menu.component";

// isolated modules
import { FlexLayoutModule } from "@angular/flex-layout";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { DISHES } from "../shared/dishes";
import { baseURL } from "../shared/baseURL";
import { Observable,of } from "rxjs";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// describe a Jasmine TestBed
describe("MenuComponent", () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  // stub of get dishes function
  const dishServiceStub = {
    getDishes: function (): Observable<Dish[]> {
      return of(DISHES);
    },
  };

  beforeEach(async(() => {
    // make the preparation async
    // configure testing environment
    TestBed.configureTestingModule({
      // just like importing ng modules
      imports: [
        MatProgressSpinnerModule,
        MatGridListModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([
          { path: "menu", component: MenuComponent },
        ]),
      ],
      declarations: [MenuComponent],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: "BaseURL", useValue: baseURL },
      ],
    }).compileComponents(); // compile the component

    const dishService = TestBed.get(DishService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // trigger detected changes
  });

  it("should be created", () => {
    // test component should be created
    expect(component).toBeTruthy();
  });

  it("dishes items should be 4", () => {
    // test the contents of dishes items
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe("Zucchipakoda");
    expect(component.dishes[3].featured).toBeFalsy();
  });

  it("should use dishes in the template", () => {
    // test DOM elements
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;

    de = fixture.debugElement.query(By.css("h1"));
    el = de.nativeElement;

    expect(el.textContent).toContain(DISHES[0].name.toUpperCase()); // if contain specific value
  });
});
