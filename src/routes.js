import React from 'react';
// import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';




const Routes = (props) => {
    <Switch>
        <PrivateRoute  {...props} path='/admin_exercise/add_exercise' exact component={AddEditExercise} />
        <PrivateRoute {...props} path='/admin_exercise/add_exercise/:id' exact component={AddEditPlayers} />
        <PrivateRoute {...props} path='/admin_exercise' exact component={AdminExercise} />
        <PrivateRoute {...props} path='/dashboard' exact component={Dashboard} />
        <PrivateRoute {...props} path='/analitycs' exact component={Analitycs} />
        <PrivateRoute {...props} path='/exercise_history' exact component={ExerciseHistory} />
        <PublicRoute {...props} restricted={true} path='/sign_in' exact component={SignIn} />
        <PublicRoute {...props} restricted={false} path='/' exact component={Home} />
        <PublicRoute {...props} restricted={false} component={NotFound} />








    </Switch>
}

export default Routes;
