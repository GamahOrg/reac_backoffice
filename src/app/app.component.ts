import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./core/components/loader/loader.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoaderComponent]
})
export class AppComponent {

    constructor(
    ) {
        document.title = 'المركز السعودي للتحكيم العقاري'
    }
}
