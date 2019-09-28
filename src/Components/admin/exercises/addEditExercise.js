import React, { Component } from 'react';
import { firebaseExercises, firebaseDB } from '../../../firebase';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/helpers';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';



class AddEditExercise extends Component {
    state = {
        exerciseId: '',
        formType: '',
        formError: '',
        formSucess: '',
        formdata: {
            exercise_name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Exercise name',
                    name: 'exercise_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            equipment_needed: {
                element: 'select',
                value: '',
                config: {
                    label: 'Equipment is needed to exercise',
                    name: 'equipment_input',
                    type: 'select',
                    options: [
                        { key: 'Yes', value: 'Yes' },
                        { key: 'No', value: 'No' }
                    ]

                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            exercise_description: {
                element: 'input_multiline',
                value: '',
                config: {
                    label: 'Exercise description',
                    name: 'description_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            exercise_muscles: {
                element: 'input',
                value: '',
                config: {
                    label: 'Exercise muscles',
                    name: 'muscles_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            exercise_video: {
                element: 'input',
                value: '',
                config: {
                    label: 'Exercise video',
                    name: 'video_input',
                    type: 'text'
                },
                validation: {
                    required: false
                },
                valid: true,
                validationMessage: '',
                showlabel: true
            },

        }
    }

    updateFields = (exercise, exerciseId, formType) => {
        const newFormdata = { ...this.state.formdata };
        for (let key in newFormdata) {
            newFormdata[key].value = exercise[key];
            newFormdata[key].valid = true;
        }
        this.setState({
            exerciseId,
            formType,
            formdata: newFormdata
        })
    }

    componentDidMount() {
        const exerciseId = this.props.match.params.id;

        if (!exerciseId) {
            this.setState({
                formType: 'Add Exercise'
            })
        }
        else {
            firebaseDB.ref(`exercises_list/${exerciseId}`).once('value')
                .then((snapshot) => {
                    const exerciseData = snapshot.val()
                    this.updateFields(exerciseData, exerciseId, 'Edit Exercise')
                })
        }
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
    successForm = (message) => {
        this.setState({ formSuccess: message });
        setTimeout(() => {
            this.setState({ formSuccess: '' });
        }, 2000)
    }

    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formdata) {
            if (key === 'exercise_muscles') {
                dataToSubmit[key] = (this.state.formdata[key].value + '').split(',')
            }
            else {
                dataToSubmit[key] = this.state.formdata[key].value;
            }

            formIsValid = this.state.formdata[key].valid && formIsValid

        }

        if (formIsValid) {
            if (this.state.formType === 'Edit Exercise') {
                firebaseDB.ref(`exercises_list/${this.state.exerciseId}`)
                    .update(dataToSubmit).then(() => {
                        this.successForm('Update correctly')
                    }).catch(e => {
                        this.setState({ formError: true })

                    })
            } else {
                firebaseExercises.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_exercises')
                }).catch(e => {
                    this.setState({
                        formError: true
                    })
                })
            }
        }
        else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <Container fixed>
                <h2>{this.state.formType}</h2>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField
                        id={'exercise_name'}
                        formdata={this.state.formdata.exercise_name}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'equipment_needed'}
                        formdata={this.state.formdata.equipment_needed}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'exercise_description'}
                        formdata={this.state.formdata.exercise_description}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'exercise_muscles'}
                        formdata={this.state.formdata.exercise_muscles}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'exercise_video'}
                        formdata={this.state.formdata.exercise_video}
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
                    <Button variant="contained" color="primary" onClick={(event) => this.submitForm(event)}>
                        {this.state.formType}
                    </Button>
                </form>
                <br></br>
            </Container>
        );
    }
}

export default AddEditExercise;