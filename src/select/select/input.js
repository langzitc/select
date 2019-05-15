import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from 'react-input-autosize'
import styles from '../style.module.scss'
class Input extends Component {
	constructor (props) {
		super(props);
	}
	static propTypes = {
		inputRef: PropTypes.func,
		autoFocus: PropTypes.bool,
		inputStyle: PropTypes.object,
		onChange: PropTypes.func,
		value: PropTypes.any
	}
    static defaultProps = {
		autoFocus: true,
		inputRef: React.createRef(),
        inputStyle: {
            border: "none"
		},
		onChange: ()=>{}
    }
	render () {
		return (
            <AutosizeInput
                {...this.props}
                className={styles.input}
                value={this.props.value}
                onChange={this.props.onChange.bind(this)}
            />
		);
	}
}
export default Input;