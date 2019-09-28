import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { firebaseLooper } from '../../ui/helpersFirebase';
import { Link } from 'react-router-dom';
import style from './exercises.sass'


import { firebaseExercises } from '../../../firebase';

class AdminExercises extends Component {
    state = {
        isLoading: true,
        exercises: []
    }

    componentDidMount() {
        firebaseExercises.once('value').then(snapshot => {
            const exercises = firebaseLooper(snapshot);
            this.setState({
                isLoading: false,
                exercises
            })
        })
    }


    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><p className={style.header}>Name</p></TableCell>
                            <TableCell><p className={style.header}>Muscles</p></TableCell>
                            <TableCell><p className={style.header}>Video</p></TableCell>
                            <TableCell><p className={style.header}>Equipment</p></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.exercises ?
                            this.state.exercises.map((exercise, i) => (
                                <TableRow key={i} >
                                    <TableCell>
                                        <Link className={style.link} to={`/admin_exercises/edit_exercise/${exercise.id}`} >
                                            {exercise.exercise_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {exercise.exercise_muscles.map(muscle => `${muscle} `)}
                                    </TableCell>
                                    <TableCell>
                                        {exercise.exercise_video ?
                                            <a className={style.link} href={exercise.exercise_video} target="_blank">
                                                {exercise.exercise_video}
                                            </a> :
                                            null}
                                    </TableCell>
                                    <TableCell>
                                        {exercise.equipment_needed}
                                    </TableCell>

                                </TableRow >
                            ))
                            : null}
                    </TableBody>
                </Table>

            </Paper>
        );
    }
}

export default AdminExercises;