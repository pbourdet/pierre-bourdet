import React, { Suspense } from 'react';
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import NavigationBar from '../components/NavigationBar';
import { Switch, Route, useLocation } from 'react-router-dom';
import AuthProvider from '../contexts/AuthContext/index';
import { ToastContainer } from 'react-toastify';
import LocaleProvider from '../contexts/LocaleContext/index';
import { Spinner } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';

function App () {
    const location = useLocation();
    const Home = React.lazy(() => import('./Home/index'));
    const Resume = React.lazy(() => import('./Resume/index'));
    const Profile = React.lazy(() => import('./Profile/index'));
    const Todos = React.lazy(() => import('./Todos/index'));
    const ResetPassword = React.lazy(() => import('./ResetPassword/index'));
    const Snake = React.lazy(() => import('./Snake/index'));

    return (
        <LocaleProvider>
            <div className="App">
                <AuthProvider>
                    <NavigationBar/>
                    <ToastContainer
                        position="top-center"
                        autoClose={4000}
                        pauseOnFocusLoss={false}
                        pauseOnHover={false}
                    />
                    <Suspense fallback={<div className="mt-5"><Spinner animation="border"/></div>}>
                        <AnimatePresence exitBeforeEnter>
                            <Switch location={location} key={location.key}>
                                <Route path="/" exact component={Home}/>
                                <Route path="/resume" component={Resume}/>
                                <Route path="/me" component={Profile}/>
                                <Route path="/todo" component={Todos}/>
                                <Route path="/snake" component={Snake}/>
                                <Route path="/reset-password/:token" component={ResetPassword}/>
                            </Switch>
                        </AnimatePresence>
                    </Suspense>
                </AuthProvider>
            </div>
        </LocaleProvider>
    );
}

export default App;
