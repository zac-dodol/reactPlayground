import React from 'react';
import ReactDOM from 'react-dom';

const render = () => {

    ReactDOM.render(
        React.createElement(
            'div',
            null,
            'Hello React',
            // React.createElement('input',null),
            React.createElement('pre', null, (new Date()).toLocaleTimeString()),
        ),
        document.getElementById('time'),
    );

}

setInterval(render, 1000);
// 	currentTime: (new Date).toLocaleTimeString()
//  setInterval(fn, 1000);

