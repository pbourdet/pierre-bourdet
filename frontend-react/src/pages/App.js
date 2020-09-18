import React from 'react';
import './App.css';
import Nav from '../components/Nav';
import About from './About';
import Resume from './Resume';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import translations from '../translations';
import { useLocale } from '../contexts/LocaleContext';

function App () {
    const locale = useLocale();

    return (
        <IntlProvider locale={locale} messages={translations[locale]}>
            <Router>
                <div className="App">
                    <Nav/>
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
