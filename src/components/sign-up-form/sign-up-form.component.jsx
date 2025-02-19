import { useState } from "react";
import { 
    createUserDocumentFromAuth, 
    createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    console.log(formFields);

    const handleSubmit = async (event) => {
        console.log("submitting form");
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const user = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
                // setFormFields(defaultFormFields);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
                console.log('error signing up', error.message);
            } else if (error.code === 'auth/weak-password') {
                alert('Password is too weak. It must be > 8 characters');
                console.log('error signing up', error.message);
            }            
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit = {handleSubmit}>
                
                <FormInput
                    label="Display Name" 
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    onChange={handleChange} 
                    required 
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    required
                />

                <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;