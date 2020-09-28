import React, { useState } from 'react';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import './App.css';
import Nav from '../components/Nav';
import About from './About';
import Resume from './Resume';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import translations from '../translations';

function App () {
    const [locale, setLocale] = useState('en');

    return (
        <IntlProvider locale={locale} messages={translations[locale]}>
            <Router>
                <div className="App">
                    <Nav locale={locale} setLocale={setLocale} />
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/resume" component={Resume}/>
                    </Switch>
                </div>
            </Router>
        </IntlProvider>
    );
}

export default App;
