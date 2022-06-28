import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Counter extends Component {
    state = {
        counter: 0
    }

    incrimentCounter = () =>{
        this.setState({
            counter: this.state.counter + 1,
        })
    }
    descrementCounter = () =>{
        this.setState({
            counter: this.state.counter - 1,
        })
    }
    render() {
        return (
            <div>
                <div className="container mt-5">
                    <h2>Count:  {this.state.counter}</h2>
                    <p>
                        <button className='btn btn-success mr-2' onClick={this.incrimentCounter}>
                            +
                        </button>
                        <button className='btn btn-danger' onClick={this.descrementCounter}>
                            -
                        </button>
                    </p>
                </div>    
            </div>

        )
    }
}
export default Counter;

if (document.getElementById('app')) {
    ReactDOM.render(<Counter />, document.getElementById('app'));
}
