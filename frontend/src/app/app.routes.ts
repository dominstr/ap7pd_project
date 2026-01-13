import { Routes } from '@angular/router';
import { BoardList } from './components/boards/board-list/board-list';
import { BoardDetails} from './components/boards/board-details/board-details';
import { McuList } from './components/microcontrollers/mcu-list/mcu-list';
import { McuDetails } from './components/microcontrollers/mcu-details/mcu-details';

export const routes: Routes = [
    { path: "", component: BoardList },
    { path: "boards/details/:id", component: BoardDetails},
    { path: "mcu", component: McuList },
    { path: "mcu/details/:id", component: McuDetails },
    { path: "**", redirectTo: ""}   // redirection to home from nonexisting path
];
