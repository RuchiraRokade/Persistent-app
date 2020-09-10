import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { QuotesService } from '../app/core/services/quotes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Meta, Story } from '@storybook/angular';
import { CreateQuoteComponent } from '../app/quote/create-quote/create-quote.component';
export default {
  title: 'Create',
  component: CreateQuoteComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;
const Template: Story<CreateQuoteComponent> = (args: CreateQuoteComponent) => ({
  component: CreateQuoteComponent,
  template: `<app-create-quote></app-create-quote>`,
  styleUrls: ['../app/quote/create-quote/create-quote.component.scss'],
  moduleMetadata: {
    imports: [
      RouterTestingModule.withRoutes([]),
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
    ],
    declarations: [CreateQuoteComponent],
    providers: [provideMockStore(), QuotesService],
  },
  props: args,
});
export const Create = Template.bind({});
