import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


import style from './exercise.sass';

const Exercise = (props) => {
    return (
        <div>
            <Card >
                <CardContent >
                    <Typography color="primary" variant="h5" component="h2">
                        {props.data.exercise_name}
                    </Typography>
                    <Typography className={style.pos} color="textSecondary">
                        <p className={style.description}>{props.data.exercise_description} </p>
                    </Typography>
                    <Divider />
                    <Typography color="textSecondary">
                        MUSCLES: {props.data.exercise_muscles.join(', ')}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a target="_blank" className={style.link} href={props.data.exercise_video} >
                        <Button size="small" color="primary">
                            Video
                    </Button>
                    </a>
                    <Button size="small" color="primary">
                        Add to plan
                    </Button>
                </CardActions>
            </Card>
        </div >
    );
};

export default Exercise;