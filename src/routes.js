import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';
import Layout from './Hoc/Layout/';
import Home from './Components/Home';
import Dashboard from './Components/dashboard/';
import SignIn from './Components/auth/signIn';
import AdminExercises from './Components/admin/exercises';
import AddEditExercise from './Components/admin/exercises/addEditExercise';
import UserInfo from './Components/userInfo/userInfo';
import Intro from './Components/intro/intro';
import Analitycs from './Components/analitycs/analitycs';


const Routes = (props) => {
    return (
        <Layout user={props.user}>
            <Switch>
                <PublicRoute {...props} restricted={true} path='/sign_in' exact component={SignIn} />
                <PrivateRoute {...props} restricted={false} path='/dashboard' exact component={Dashboard} />
                <PrivateRoute {...props} path='/user_info' exact component={UserInfo} />
                <PrivateRoute {...props} path='/analitycs' exact component={Analitycs} />
                <PrivateRoute {...props} path='/admin_exercises/add_exercise' exact component={AddEditExercise} />
                <PrivateRoute {...props} path='/admin_exercises/edit_exercise/:id' exact component={AddEditExercise} />
                <PrivateRoute {...props} path='/admin_exercises' exact component={AdminExercises} />
                <PublicRoute {...props} path='/' exact component={Intro} />
                <PublicRoute {...props} restricted={false} component={Home} />
            </Switch>
        </Layout>)
}

export default Routes;
