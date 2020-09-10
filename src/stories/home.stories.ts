import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Meta, Story } from '@storybook/angular';
import { HomeComponent } from '../app/home/home.component';

export default {
  title: 'Home Component',
  component: HomeComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;
const Template: Story<HomeComponent> = (args: HomeComponent) => ({
  component: HomeComponent,
  templateUrl: '../app/home/home.component.html',
  styleUrls: ['../app/home/home.component.scss'],
  moduleMetadata: {
    imports: [
      RouterTestingModule.withRoutes([]),
      FormsModule,
      ReactiveFormsModule,
    ],
    declarations: [HomeComponent],
    providers: [provideMockStore()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
  props: args,
});
export const Home = Template.bind({});
