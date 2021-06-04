import React, { Suspense } from 'react';
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import NavigationBar from '../components/NavigationBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthProvider from '../contexts/AuthContext/index';
import { ToastContainer } from 'react-toastify';
import LocaleProvider from '../contexts/LocaleContext/index';
import { Spinner } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App () {
    const Home = React.lazy(() => import('./Home/index'));
    const Resume = React.lazy(() => import('./Resume/index'));
    const Profile = React.lazy(() => import('./Profile/index'));
    const Todos = React.lazy(() => import('./Todos/index'));
    const ResetPassword = React.lazy(() => import('./ResetPassword/index'));

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
                        <Suspense fallback={<Spinner animation="border"/>}>
                            <Route render={({ location }) => (
                                <TransitionGroup>
                                    <CSSTransition key={location.key} timeout={450} classNames='fade'>
                                        <Switch location={location}>
                                            <Route path="/" exact component={Home}/>
                                            <Route path="/resume" component={Resume}/>
                                            <Route path="/me" component={Profile}/>
                                            <Route path="/todo" component={Todos}/>
                                            <Route path="/reset-password/:token" component={ResetPassword}/>
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            )}/>
                        </Suspense>
                    </AuthProvider>
                </div>
            </Router>
        </LocaleProvider>
    );
}

export default App;
