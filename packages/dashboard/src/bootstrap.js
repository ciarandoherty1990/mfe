import {createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
};

//if we are in development and in isolation,
//call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');

    //provide default history if running in isolation
    if (devRoot) {
        mount(devRoot);
    }
}

//we are running through a container
// and we should export the mount function
export {mount};