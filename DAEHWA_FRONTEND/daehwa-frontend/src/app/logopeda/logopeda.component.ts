import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logopeda',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './logopeda.component.html',
  styleUrl: './logopeda.component.css',
})
export class ComponenteLogopeda {}
export default ComponenteLogopeda;
