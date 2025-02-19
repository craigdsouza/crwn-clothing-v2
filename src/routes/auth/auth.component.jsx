
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import './auth.styles.scss';


const Authentication = () => {
  

  return (
    <div className="two-column-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
