import React, { useState } from 'react';
import 'bootswatch/dist/litera/bootstrap.min.css';
import NavigationBar from '../components/NavigationBar';
import About from './About';
import Resume from './Resume';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import translations from '../translations';
import {AuthProvider} from "../contexts/AuthContext";

function App () {
    const [locale, setLocale] = useState('en');

    return (
        <IntlProvider locale={locale} messages={translations[locale]}>
            <Router>
                <div className="App">
                    <AuthProvider>
                        <NavigationBar locale={locale} setLocale={setLocale} />
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/resume" component={Resume}/>
                        </Switch>
                    </AuthProvider>
                </div>
            </Router>
        </IntlProvider>
    );
}

export default App;
