import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from '../style.module.scss'
import Input from './input'
import Menu from './menu'
import { SelectContext } from '../context'
import { throttle } from '../util'
import { Placeholder, CheckButton, DownButton, ClearButton, SelectListItem } from '../components'
const cx = classnames.bind(styles);
class Select extends Component {
	constructor (props) {
		super(props);	
		let selectValues = this.props.defaultValue ? (Array.isArray(this.props.defaultValue) ? this.props.defaultValue : [this.props.defaultValue]) : [];
		let selectList = props.data ? props.data.filter(e=>selectValues.includes(e.value)) : [];
		this.state = {
			show: false,
			searchKeyword: '',
			loading: false,
			tempData: props.data,
			selectValues,
			selectList,
			data: props.data			
		}			
	}
	static propTypes = {
		clear: PropTypes.bool,
		isFilter: PropTypes.bool,
		placeholder: PropTypes.string,
		multiple: PropTypes.bool,
		async: PropTypes.bool,
		isShowCheckAll: PropTypes.bool,
		isSearchAutoSelect: PropTypes.bool,
		isSelectClose: PropTypes.bool,
		action: PropTypes.func,
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
		onClear: PropTypes.func,
		noSearchResultText: PropTypes.string,
		loadingText: PropTypes.string

	}
	static defaultProps = {
		clear: true,
		isFilter: false,
		multiple: false,
		async: false,
		isShowCheckAll: false,
		isSearchAutoSelect: false,
		action: null,
		data: [],
		defaultValue: '',
		placeholder: '请选择',
		isSelectClose: true,
		noSearchResultText: '没有匹配的记录',
		loadingText: '加载中...',
		onChange: ()=>{}
	}
	checkRef = React.createRef();
	clearRef = React.createRef();
	downRef = React.createRef();	
	SelectRef = React.createRef();
	MenuRef = React.createRef();	
	input = null;
	filter = (data)=>{
		return data.filter(e=>{
			return e.label.includes(this.state.searchKeyword) || e.value.toString().includes(this.state.searchKeyword);
		})
	}
	triggerChange = ()=>{
		let values = [],list = [],state = this.state;
		if(this.props.multiple){
			values = state.selectValues;
			list = state.selectList;
		}else{
			values = state.selectValues.length ? state.selectValues[0] : '';
			list = state.selectList.length ? state.selectList[0] : '';
		}
		this.props.onChange(values,list);		
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
		let is = this.state.selectList.length === this.state.data.length;
		let selectList = is ? [] : Array.from(this.state.data);
		let selectValues = selectList.map(e=>e.value);
		this.setState(state=>{
			return {
				...state,
				searchKeyword: '',
				selectList,
				selectValues				
			}
		},()=>{
			this.triggerChange();
		})
	}
	handleRemoveAll = ()=>{
		this.setState(state=>{
			return {
				...state,
				searchKeyword: '',
				selectList: [],
				selectValues: []				
			}
		},()=>{
			this.triggerChange();
		})
	}
	handleCheckChange = (value,event)=>{
		let selectValues;
		if(this.props.multiple){
			selectValues = Array.from(this.state.selectValues);
			if(selectValues.includes(value)){
				let index = selectValues.findIndex(e=>e === value);
				selectValues.splice(index,1);
			}else{
				selectValues.push(value);
			}			
		}else{
			selectValues = [];
			selectValues.push(value);
		}
        this.setState(state=>{
			let selectList = [];
			selectValues.forEach(e=>{
				selectList.push(state.data.find(el=>el.value===e));
			})
            return {
                ...state,
				selectValues,
				selectList
            }
        },()=>{
			this.triggerChange();
		})
        if(this.props.isSelectClose&&event){
            this.handleClick();
		}	
		if(this.input){
			this.setState(state=>{
				return {
					...state,
					searchKeyword: ''
				}
			})
		}
	}
    getIsSelected = value=>{
        return this.state.selectValues.includes(value);
	}
	handleWrapClick = event=>{
		let el = event.target;
		if(this.SelectRef.current.contains(el)){
			if(
				this.clearRef.current&&this.clearRef.current.contains(el)||
				this.checkRef.current&&this.checkRef.current.contains(el)			
			){
				return;
			}else
			{
				this.handleClick();
				if(this.input){
					this.input.focus();
				}
			}			
		}
	}
	handleInputChange = event=>{
		let searchKeyword = event.target.value;
		let state = this.state;
		this.setState({
			...state,
			show: true,
			data: [],
			searchKeyword
		},()=>{
			if(this.props.async){
				throttle(this.loadData(),300);
			}
		});
	}
	loadData = ()=>{
		let state = this.state;
		this.setState({
			...state,
			loading: true
		});
		this.props.action(this.state.searchKeyword).then(data=>{
			let selectValues = [],selectList = Array.from(this.state.selectList);
			if(this.props.isSearchAutoSelect){
				selectValues = data.map(e=>e.value);
			}else{
				selectList = Array.from(this.state.selectList);
				selectValues = Array.from(this.state.selectValues);
			}
			this.setState({
				...state,
				selectValues,
				selectList,
				loading: false,
				data
			});		
		})
	}
	inputRef = element=>{
		this.input = element;
	}
	
	static getDerivedStateFromProps (nextProps,prevState) {
		let tempData = prevState.tempData,
		isDataChange = JSON.stringify(tempData) !== JSON.stringify(nextProps.data);
		if(isDataChange){
			let data = nextProps.data;
			tempData = data;
			return {
				...prevState,
				data,
				tempData
			}			
		}
		return null;
	}	
	hideClick = event => {
		let el = event.target;
		if(this.SelectRef.current&&!this.SelectRef.current.contains(el)){
			this.setState(state=>{
				return {
					...state,
					show: false
				}
			})
		}		
	}
	componentDidMount () {	
		document.body.addEventListener('click',this.hideClick);
	}   		
	componentWillUnmount () {
		document.body.removeEventListener('click',this.hideClick);
	}
	render () {
		const provider = {
			selectList: this.state.selectList,
			selectValues: this.state.selectValues,
			data: this.props.isFilter ? this.filter(this.state.data) : this.state.data,
			handleCheckChange: this.handleCheckChange,
			show: this.state.show,
			toggleMenu: this.handleClick,
			isSelectClose: this.props.isSelectClose,
			getIsSelected: this.getIsSelected,
			noSearchResultText: this.props.noSearchResultText,
			MenuRef: this.MenuRef,
			loading: this.state.loading,
			loadingText: this.props.loadingText
		}
		const arr = [];
		if(this.props.isFilter||this.props.async){
			arr.push(<Input 
				value={this.state.searchKeyword} 
				onChange={this.handleInputChange} 
				inputRef={this.inputRef} 
				key={'input'} 
				placeholder={this.state.selectValues.length ? '' : this.props.placeholder}
			/>);
		}else if(!this.state.selectValues.length){
			arr.push(
				<Placeholder placeholder={this.props.placeholder} key={'placeholder'} />
			);
		}
		if(this.props.isShowCheckAll&&this.props.multiple&&this.state.show){
			arr.push(	
				<CheckButton ref={this.checkRef} handleCheckAll={this.handleCheckAll} key={'checkall'} />		
			);			
		}else{
			arr.push(
				<DownButton key={'down'} ref={this.downRef} />			
			)			
		}
		if(this.state.selectValues.length&&this.props.clear){
			arr.push(
				<ClearButton ref={this.clearRef} key={'clearall'} handleRemoveAll={this.handleRemoveAll} />	
			);
		}
		return (
			<div className={classnames(styles.wrap)} ref={this.SelectRef}>
					<div className={cx({wrapinner: true,showclear: this.props.clear&&this.state.selectList.length !== 0})} onClick={this.handleWrapClick}>
						<div className={styles.checkwrap}>
						{
							this.state.selectList.map((e,index)=>{
								return <SelectListItem 
									key={e.value}
									single={!this.props.multiple}
									handleCheckChange={this.handleCheckChange}
									label={e.label}
									value={e.value}
								/>
							})
						}					
						</div>
						{arr}												
					</div>
					<SelectContext.Provider value={provider}>
						<Menu></Menu>
					</SelectContext.Provider>
			</div>
		);
	}
}
export default Select;