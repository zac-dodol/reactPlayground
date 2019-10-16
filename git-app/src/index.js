import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Ex1 from './feature/examples/example1'
import * as e2 from './feature/examples/example2'
import * as e3 from './feature/examples/example3'
import * as e4 from './feature/examples/example4'
// import Inputfield from './feature/inputfield/inputfield';
// import * as Formlabel from './feature/formlabel/formlabel';
// import Form from './feature/form/form';
// import Demo from './feature/table/table';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Inputfield />, document.getElementById('inputfield'));
// ReactDOM.render(<Demo />, document.querySelector('#table'));

ReactDOM.render(
    <div>
        <Ex1 />
    </div>,

    document.getElementById('incrementCounter'),
    );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
