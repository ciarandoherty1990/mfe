import React, {lazy, Suspense, useEffect, useState} from 'react';
import Header from "./components/Header";
import { Route, Router, Switch, Redirect} from "react-router-dom";
import {createGenerateClassName, StylesProvider} from "@material-ui/core/styles";
import Progress from "./components/Progress";
import {createBrowserHistory} from "history";

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});
const history = createBrowserHistory();
export default () => {
    const [isSignedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setSignedIn(false)} isSignedIn={isSignedIn}/>
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth" >
                                <AuthLazy onSignIn={() => setSignedIn(true)} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/" />}
                                <DashboardLazy />
                            </Route>
                            <Route path="/" component={MarketingLazy}/>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};