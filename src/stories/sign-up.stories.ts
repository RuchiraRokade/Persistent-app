import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Meta, Story } from '@storybook/angular';
import { SignUpComponent } from '../app/sign-up/sign-up.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../app/sign-up/store/app.state';
export default {
  title: 'Sign up component',
  component: SignUpComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;
const Template: Story<SignUpComponent> = (args: SignUpComponent) => ({
  component: SignUpComponent,
  template: `<app-sign-up></app-sign-up>`,
  styles: ['../app/sign-up/sign-up.component.scss'],
  moduleMetadata: {
    imports: [
      RouterTestingModule.withRoutes([]),
      FormsModule,
      ReactiveFormsModule,
      StoreModule.forRoot(reducers, {}),
    ],
    declarations: [SignUpComponent],
    providers: [],
  },
  props: args,
});
export const SignUp = Template.bind({});

// export const Login = Template.bind({});
// Login.args = {
//   displayLogin: true,
// };
