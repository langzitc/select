import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import AutosizeInput from 'react-input-autosize'
import styles from '../style.scss'
class Input extends Component {
	constructor (props) {
		super(props);
    }
    static defaultProps = {
        autoFocus: true,
        inputStyle: {
            border: "none"
        }
    }
	state = {
		inputValue: '',
	};    
	updateInputValue = (event) => {
		const value = event.target.value;
		this.setState(state=>{
			state.inputValue = value;
			return state;
		})
	};
	render () {
		return (
            <AutosizeInput
                {...this.props}
                className={styles.input}
                value={this.state.inputValue}
                onChange={this.updateInputValue.bind(this)}
            />
		);
	}
}
export default Input;