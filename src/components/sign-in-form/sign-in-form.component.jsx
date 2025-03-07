import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
  } from '../../utils/firebase/firebase.utils';
import { useState, useContext } from 'react';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import './sign-in-form.styles.scss';
import { UserContext } from '../../contexts/user.context';
  
  const SignInForm = () => {
    const [formFields, setFormFields] = useState({ email: "", password: "" });
    const { email, password } = formFields;
    
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const user = await signInAuthUserWithEmailAndPassword(email, password);
        setFormFields({ email: "", password: "" });
      } catch (error) {
          switch (error.code) {
              case 'auth/wrong-password':
                  alert('Incorrect password. Please try again.');
                  break;
              case 'auth/user-not-found':
                  alert('No user found with this email.');
                  break;
              default:
                  console.error('Error signing in', error);
          }
      }
    }
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
    };
  
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup();
      createUserDocumentFromAuth(user);
    };
  
    return (
      <div className="sign-in-container">
          <h2>I already have an account</h2>
          <span>Sign in with your email and password</span>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <div className="sign-in-buttons-container">
            <Button type="submit" buttonType="submit" onClick={handleSubmit}>Sign in</Button>
            <Button type="button" buttonType="google" onClick={logGoogleUser}>
              Sign in with Google
            </Button>
          </div>
      </div>
    );
  };
  
  export default SignInForm;
  