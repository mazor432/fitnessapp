import React, { Component } from 'react';
import { firebaseExercises } from '../../../firebase';
import { firebaseLooper } from '../../ui/helpersFirebase';
import Exercise from '../Exercise/Exercise';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import style from './search.sass'

class Search extends Component {
    state = {
        query: '',
        exercises: [],
        filteredExercises: []
    }
    componentDidMount() {
        firebaseExercises.once('value').then(snapshot => {
            const exercises = firebaseLooper(snapshot);
            this.setState({
                exercises
            })
        });
    }

    updateForm = (element) => {
        let query = element.target.value
        this.setState({
            query
        })
        this.filterExercises(query)
    }

    filterExercises = (query) => {
        if (query) {
            let listExercises = this.state.exercises;
            let filteredExercises = listExercises.filter(exercise => exercise.exercise_name.toLowerCase().includes(query));
            this.setState({ filteredExercises })
        } else {
            this.setState({ filteredExercises: '' })
        }
    }

    render() {
        return (
            <div>
                <p>Search Exercises..</p>
                <TextField
                    id="outlined-name"
                    label="Search exercises..."
                    fullWidth={true}
                    value={this.state.query}
                    onChange={(element) => this.updateForm(element)}
                    margin="normal"
                    variant="outlined"
                />
                {this.state.filteredExercises ? this.state.filteredExercises.map(exercise => (
                    <ul className={style.cleaned_list}>
                        <li key={exercise.id}><Exercise data={exercise} /> </li ></ul>)) : null}

            </div>
        );
    }
}

export default Search;