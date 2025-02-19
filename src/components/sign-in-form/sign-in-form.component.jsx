import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
  } from '../../utils/firebase/firebase.utils';
import { useState } from 'react';
import Button from '../../components/button/button.component';
import FormInput from '../../components/form-input/form-input.component';
import './sign-in-form.styles.scss';
  
  
  const SignInForm = () => {
    const [formFields, setFormFields] = useState({ email: "", password: "" });
    const { email, password } = formFields;
  
    console.log(formFields);
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const user = await signInAuthUserWithEmailAndPassword(email, password);
        console.log("user",user);
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log("userDocRef",userDocRef);
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
      const userDocRef = await createUserDocumentFromAuth(user);
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
  