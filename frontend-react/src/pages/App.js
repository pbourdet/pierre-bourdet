import React, { useState } from 'react';
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import NavigationBar from '../components/NavigationBar';
import About from './About';
import Resume from './Resume';
import Home from './Home';
import Profile from './Profile';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import translations from '../translations';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';

function App () {
    const [locale, setLocale] = useState('en');

    return (
        <IntlProvider locale={locale} messages={translations[locale]}>
            <Router>
                <div className="App">
                    <AuthProvider>
                        <NavigationBar locale={locale} setLocale={setLocale} />
                        <ToastContainer
                            position="top-center"
                            autoClose={4000}
                            pauseOnFocusLoss={false}
                            pauseOnHover={false}
                        />
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/resume" component={Resume}/>
                            <Route path="/me" component={Profile}/>
                        </Switch>
                    </AuthProvider>
                </div>
            </Router>
        </IntlProvider>
    );
}

export default App;
