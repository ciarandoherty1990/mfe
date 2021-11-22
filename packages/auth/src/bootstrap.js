import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createMemoryHistory, createBrowserHistory} from 'history';

const mount = (el, {onSignIn, onNavigate, defaultHistory, initialPath}) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(
        <App onSignIn={onSignIn} history={history}/>,
        el
    );

    return {
        onParentNavigate({pathname: nextPathname}) {
            const {pathname} = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

//if we are in development and in isolation,
//call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    //provide default history if running in isolation
    if (devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()});
    }
}

//we are running through a container
// and we should export the mount function
export {mount};