import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';

@Component({
  selector: 'tabletop-gather-sample-typography',
  standalone: true,
  imports: [CommonModule, NbCardModule],
  template: `
    <nb-card>
      <nb-card-header>Typography</nb-card-header>
      <nb-card-body>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p class="subtitle">Subtitle 1</p>
        <p class="subtitle-2">Subtitle 2</p>
        <p>
          Paragraph 1 Text ... <strong>Bold Text</strong> ...
          <i>Italic Text</i> ... <a href="#">Link</a>
        </p>
        <p class="paragraph-2">
          Paragraph 2 Text ... <strong>Bold Text</strong> ...
          <i>Italic Text</i> ... <a href="#">Link</a>
        </p>
        <p class="caption">Caption 1</p>
        <p class="caption-2">Caption 2</p>
        <p class="label">Label</p>
      </nb-card-body>
    </nb-card>
  `,
  styles: [],
})
export class SampleTypographyComponent {}
