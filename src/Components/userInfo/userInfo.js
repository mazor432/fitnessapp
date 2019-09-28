import React, { Component } from 'react';
import FormField from '../ui/formFields';
import { validate } from '../ui/helpers';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import User from '../dashboard/User/User';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { firebase, firebaseDB } from '../../firebase';
import style from './userinfo.sass';

class UserInfo extends Component {
    state = {
        isExists: false,
        userId: '',
        last_update: null,
        userDetail: null,
        formError: '',
        formSucess: '',
        formdata: {
            weight: {
                element: 'input',
                value: '',
                config: {
                    label: 'Add you weight (kg)',
                    name: 'weight_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                    email: false,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            height: {
                element: 'input',
                value: '',
                config: {
                    label: 'Add you height (cm)',
                    name: 'height_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                    email: false,

                },
                valid: false,
                validationMessage: '',
                showlabel: true
            }
        }
    }

    componentDidMount() {
        let userId = firebase.auth().currentUser.uid;
        firebaseDB.ref(`user_detail/${userId}`).once('value').then(snapshot => {
            if (snapshot.exists()) {
                const userData = snapshot.val()
                let dates = Object.keys(userData)
                let last_update_key = dates[dates.length - 1]
                let last_update = last_update_key.replace(/\_/g, '.')
                let userDetail = userData[last_update_key]

                this.setState({
                    isExists: true,
                    userId,
                    userDetail,
                    last_update
                })
            } else {
                this.setState({
                    userId,
                })
            }
        })

    }

    today = () => {
        let todayDate = new Date().toLocaleDateString()
        return todayDate

    }
    successForm = (message, userDetail) => {
        let newFormdata = { ...this.state.formdata };
        newFormdata['height'].value = '';
        newFormdata['height'].valid = false;
        newFormdata['weight'].value = '';
        newFormdata['weight'].valid = false;


        this.setState({
            formSuccess: message,
            userDetail,
            formdata: newFormdata

        });
        setTimeout(() => {
            this.setState({ formSuccess: '' });
        }, 2000)


    }
    updateForm(element) {
        const newFormdata = { ...this.state.formdata }
        const newElement = { ...newFormdata[element.id] }
        newElement.value = element.event.target.value;
        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        for (let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid

        }
        let userId = this.state.userId
        let date = this.today().replace(/\./g, '_')


        if (formIsValid) {
            firebaseDB.ref(`user_detail/${userId}/${date}`).set(dataToSubmit).then(() => {
                this.successForm('Update correctly', dataToSubmit)
            }).catch(e => {
                this.setState({
                    formError: true
                })
            })
        }
    }

    render() {

        return (
            <div className={style.container}>
                <User />
                <div className={style.wrapper}>
                    <Card className={style.card}>
                        <CardContent >
                            <div >
                                <p className={style.item_center}><b>LAST MEASUREMENT:</b>  {this.state.last_update}</p>
                                {this.state.userDetail ?
                                    <>
                                        <p className={style.item_center}><b>HEIGHT:</b> {this.state.userDetail.height} cm</p>
                                        <p className={style.item_center}><b>WEIGHT:</b> {this.state.userDetail.weight} kg</p>

                                    </> :
                                    <p className={style.item_center}>ADD INFORMATION ABOUT YOU</p>}
                            </div>
                        </CardContent >

                    </Card >
                    <Card className={style.card}>
                        <CardContent >
                            {this.state.isExists ? <h2 className={style.item_center}>UPDATE INFORMATION</h2> : <h2 className={style.item_center}>ADD INFORMATION</h2>}
                            <form className={style.form} onSubmit={(event) => this.submitForm(event)}>

                                <FormField
                                    id={'height'}
                                    formdata={this.state.formdata.height}
                                    change={(element) => this.updateForm(element)}
                                />  <FormField
                                    id={'weight'}
                                    formdata={this.state.formdata.weight}
                                    change={(element) => this.updateForm(element)}
                                />
                                <br></br>
                                <div className="success_label">{this.state.formSuccess}</div>
                                {this.state.formError ?
                                    <div className="error_label">
                                        Something is wrong
                                </div>
                                    : ''
                                }

                                <Button variant="contained" fullWidth color="primary" onClick={(event) => this.submitForm(event)}>
                                    ADD
                    </Button>

                            </form>
                        </CardContent >

                    </Card >
                </div>
            </div>
        );
    }
}

export default UserInfo;