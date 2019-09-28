import React, { Component } from 'react';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/helpers';
import { firebase, googleAuthProvider } from '../../../firebase';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import style from './signin.sass';


class SignIn extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    label: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    label: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            }
        }
    }



    updateForm = (element) => {
        const newFormdata = { ...this.state.formdata };
        const newElement = { ...newFormdata[element.id] };
        newElement.value = element.event.target.value;
        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
        newFormdata[element.id] = newElement;
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSumbit = {};
        let formIsValid = true;
        for (let key in this.state.formdata) {
            dataToSumbit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if (formIsValid) {
            firebase.auth()
                .signInWithEmailAndPassword(
                    dataToSumbit.email,
                    dataToSumbit.password
                ).then(() => {
                    this.props.history.push('/dashboard')
                }).catch(erorr => {
                    this.setState({
                        formError: true
                    })
                });
        }
        else {
            this.setState({
                formError: true
            })
        }

        return null
    }

    startLogin() {
        return firebase.auth().signInWithRedirect(googleAuthProvider)
    }
    render() {
        return (
            <div>
                <Card >
                    <CardContent >
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <h2>Please Login</h2>
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element) => this.updateForm(element)} />

                            <FormField
                                id={'password'}
                                formdata={this.state.formdata.password}
                                change={(element) => this.updateForm(element)} />

                            {this.state.formError ? <div>Something is wrong, try again</div>
                                : null}
                            <div className={style.button_wrapper}>
                                <Button variant="contained" color="primary" onClick={(event) => this.submitForm(event)}>Log in</Button>
                                <Button variant="contained" color="primary" onClick={this.startLogin}>Login with Google</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default SignIn;