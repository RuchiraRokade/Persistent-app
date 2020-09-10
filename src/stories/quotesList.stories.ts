import { AppState } from './../app/sign-up/store/app.state';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Meta, Story } from '@storybook/angular';
import { QuotesListComponent } from './../app/quote/quotes-list/quotes-list.component';
export default {
  title: 'List Component',
  component: QuotesListComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<QuotesListComponent> = (args: QuotesListComponent) => ({
  component: QuotesListComponent,
  templateUrl: '../app/quote/quotes-list/quotes-list.component.html',
  styleUrls: ['../app/quote/quotes-list/quotes-list.component.scss'],
  moduleMetadata: {
    imports: [
      RouterTestingModule.withRoutes([]),
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [QuotesListComponent],
    providers: [provideMockStore({})],
  },
  props: args,
});
export const List = Template.bind({});
