import React from 'react';
import ReactDOM from 'react-dom';

class MyForm extends React.Component {
    render() {
        return (
            <form>
                <h1>Hello</h1>
                {/*TODO make as an input*/}
                    <p>Enter your name:
                        <input
                        type="text"
                    />
                </p>

            </form>
        );
    }
}
ReactDOM.render(<MyForm />, document.getElementById('form'));
