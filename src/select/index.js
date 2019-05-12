import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import '../icon/iconfont.css'
import styles from './style.scss'
import Input from './components/input'
import Menu from './components/menu'
import { SelectContext, SelectRef, MenuRef } from './context'
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
		selectList: [],
		selectValues: []
	}
	handleClick = ()=>{
		this.setState(state=>{
			return {
				...state,
				show: !state.show
			}
		})
	}
	handleCheckAll = ()=>{
		let is = this.state.selectList.length === this.props.data.length;
		let selectList = is ? [] : Array.from(this.props.data);
		let selectValues = selectList.map(e=>e.value);
		this.setState(state=>{
			return {
				...state,
				selectList,
				selectValues				
			}
		})
	}
	handleRemoveAll = ()=>{
		this.setState(state=>{
			return {
				...state,
				selectList: [],
				selectValues: []				
			}
		})
	}
	handleCheckChange = (value,event)=>{
		let selectValues;
		if(this.props.isMultiple){
			selectValues = Array.from(this.state.selectValues);
			if(selectValues.includes(value)){
				selectValues = selectValues.filter(el=>{
					return el !== value;
				})
			}else{
				selectValues.push(value);
			}			
		}else{
			selectValues = [];
			selectValues.push(value);
		}
        this.setState(state=>{
			let selectList = this.props.data.filter(e=>{
				return selectValues.includes(e.value);
			})
            return {
                ...state,
				selectValues,
				selectList
            }
        })
        if(this.props.isSelectClose&&event){
            this.handleClick();
		}		
	}
    getIsSelected = value =>{
        return this.state.selectValues.includes(value)
	}
	componentDidMount () {
		document.body.addEventListener('click',event=>{
			let el = event.target;
			if(!SelectRef.current.contains(el)){
				this.setState(state=>{
					return {
						...state,
						show: false
					}
				})
            }
		})
	}   		
	render () {
		const provider = {
			selectList: this.state.selectList,
			selectValues: this.state.selectValues,
			data: this.props.data,
			handleCheckChange: this.handleCheckChange,
			show: this.state.show,
			toggleMenu: this.handleClick,
			isSelectClose: this.props.isSelectClose,
			getIsSelected: this.getIsSelected
		}
		const arr = [];
		if(this.props.isFilter||this.props.isAsync){
			arr.push(<Input placeholder={this.props.placeholder}/>);
		}else if(!this.state.selectValues.length){
			arr.push(<span className={styles.placeholder}>{this.props.placeholder}</span>);
		}
		if(this.props.isShowCheckAll&&this.props.isMultiple){
			arr.push(
				<span className={styles.checkall} onClick={this.handleCheckAll}>
					<i className={classnames('iconfont','icon-quanxuan')}></i>
				</span>				
			)			
		}
		if(this.state.selectValues.length){
			arr.push(
				<span className={styles.clear} onClick={this.handleRemoveAll}>
					<i className={classnames('iconfont','icon-clear')}></i>
				</span>					
			)
		}
		return (
			<div className={classnames(styles.wrap)} ref={SelectRef}>
					<div className={styles.wrapinner} onClick={()=>{
						//this.handleClick()
					}}>
						{
							this.state.selectList.map((e,index)=>{
								return <span key={index} className={cx({
									checkItem: true,
									disabled: false,
									single: !this.props.isMultiple
								})}
								onClick={this.handleCheckChange.bind(this,e.value,false)}
								>
								{e.label}
								<i className={cx({
									iconfont: true,
									'icon-clear': true
								})}></i>
								</span>
							})
						}
						{arr}									
						<span onClick={this.handleClick} className={classnames(styles.icon,styles.iconl)}>
							<i className={classnames('iconfont','icon-down')}></i>
						</span>					
					</div>
					<SelectContext.Provider value={provider}>
						<Menu></Menu>
					</SelectContext.Provider>
			</div>
		);
	}
}
export default Select;