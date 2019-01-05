import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// import React from 'react'
// import ReactDOM from 'react-dom'
// import './style/index.css'
// import App from './components/App'
// import * as serviceWorker from './serviceWorker'
// import { BrowserRouter, Route, Switch } from 'react-router-dom'
// import Main from './components/AllMovie'
// import AddMovie from './components/AddMovie'

// ReactDOM.render(
//     <BrowserRouter>
//         <div>
//             <Switch>
//                 <Route path='/movies/new' component={AddForm} />
//                 <Route path='/' component={Main} />
//             </Switch>
//         </div>
//     </BrowserRouter>, document.getElementById('root'))
// serviceWorker.unregister()


// module.exports = {
//     //...
//     resolve: {
//       extensions: ['.js', '.jsx']
//     }
//   };
