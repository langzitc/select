import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import '../icon/iconfont.css'
import styles from './style.scss'
import Input from './components/input'
import Menu from './components/menu'
let cx = classnames.bind(styles);
class Select extends Component {
	constructor (props) {
		super(props);
	}
	static propTypes = {
		isFilter: PropTypes.bool,
		placeholder: PropTypes.string,
		isMultiple: PropTypes.bool,
		isAsync: PropTypes.bool,
		isShowCheckAll: PropTypes.bool,
		isFilterAutoSelect: PropTypes.bool,
		isSelectClose: PropTypes.bool,
		action: PropTypes.instanceOf(Promise),
		data: PropTypes.array,
		defaultValue: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
			PropTypes.array
		]),
		onInputChange: PropTypes.func,
		onChange: PropTypes.func,
		onHideModal: PropTypes.func,
		onSelectAll: PropTypes.func,
		onClear: PropTypes.func

	}
	static defaultProps = {
		isFilter: false,
		isMultiple: false,
		isAsync: false,
		isShowCheckAll: false,
		isFilterAutoSelect: false,
		action: null,
		data: [],
		defaultValue: '',
		placeholder: '请选择',
		isSelectClose: true
	}
	state = {
		show: false,
		selectList: []
	}
	handleClick = (event)=>{
		this.setState(state=>{
			return {
				...state,
				show: !state.show
			}
		})
	}
	handleCheckChange = data=>{
		this.setState(state=>{
			return {
				...state,
				selectList: this.props.data.filter(e=>data.includes(e.value))
			}
		})		
	}
	render () {
		return (
			<div className={classnames(styles.wrap)}>
					<div className={styles.wrapinner}>
						{
							this.state.selectList.map((e,index)=>{
								return <span key={index} className={cx({
									checkItem: true,
									disabled: false
								})}>
								{e.label}
								<i className={cx({
									iconfont: true,
									'icon-clear': true
								})}></i>
								</span>
							})
						}
						<Input placeholder="请选择"/>
						<span className={styles.checkall}>
							<i className={classnames('iconfont','icon-quanxuan')}></i>
						</span>
						<span className={styles.clear}>
							<i className={classnames('iconfont','icon-clear')}></i>
						</span>										
						<span onClick={this.handleClick} className={classnames(styles.icon,styles.iconl)}>
							<i className={classnames('iconfont','icon-down')}></i>
						</span>					
					</div>
					<Menu handleCheckChange={this.handleCheckChange} toggleMenu={this.handleClick} isSelectClose={this.props.isSelectClose} data={this.props.data} show={this.state.show}></Menu>
			</div>
		);
	}
}
export default Select;