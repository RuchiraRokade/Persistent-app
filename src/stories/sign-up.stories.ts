import { provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../app/sign-up/sign-up.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { storiesOf, moduleMetadata } from '@storybook/angular';

export default {
  title: 'Sign up component',
  component: SignUpComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const modules = {
  imports: [FormsModule, ReactiveFormsModule],
  declarations: [SignUpComponent],
};

const Template: Story<SignUpComponent> = (args: SignUpComponent) => ({
  component: SignUpComponent,
  template: `<app-sign-up></app-sign-up>`,
  styles: ['../app/sign-up/sign-up.component.scss'],
  moduleMetadata: {
    imports: [FormsModule, ReactiveFormsModule],
    declarations: [SignUpComponent],
    providers: [provideMockStore()],
  },
  props: args,
});

export const SignUp = Template.bind({});
