import React from 'react';
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import NavigationBar from '../components/NavigationBar';
import Resume from './Resume';
import Home from './Home';
import Profile from './Profile';
import Todos from './Todos';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from '../contexts/AuthContext/index';
import { ToastContainer } from 'react-toastify';
import LocaleProvider from '../contexts/LocaleContext/index';
import ResetPassword from './ResetPassword';

function App () {
    return (
        <LocaleProvider>
            <Router>
                <div className="App">
                    <AuthProvider>
                        <NavigationBar/>
                        <ToastContainer
                            position="top-center"
                            autoClose={4000}
                            pauseOnFocusLoss={false}
                            pauseOnHover={false}
                        />
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/resume" component={Resume}/>
                            <Route path="/me" component={Profile}/>
                            <Route path="/todo" component={Todos}/>
                            <Route path="/reset-password/:token" component={ResetPassword}/>
                        </Switch>
                    </AuthProvider>
                </div>
            </Router>
        </LocaleProvider>
    );
}

export default App;
