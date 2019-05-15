import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import '../icon/iconfont.css'
import styles from './style.module.scss'
import { SelectContext } from '../context'
import Menu from './menu'
import { TreeListItem, Placeholder, ClearButton, CheckButton, DownButton } from '../components'
import { format, filter } from '../util'
const cx = classnames.bind(styles);
export default class TreeSelect extends Component {
    constructor (props){
		super(props);
    }
    static propTypes = {
        allowClear: PropTypes.bool,
        autoClearSearchValue: PropTypes.bool,
        defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.array
        ]),
        disabled: PropTypes.bool,
        isFilter: PropTypes.bool,
        filter: PropTypes.func,
        loadData: PropTypes.func,
        multiple: PropTypes.bool,
        placeholder: PropTypes.string,
        searchPlaceholder: PropTypes.string,
        searchValue: PropTypes.string,
		data: PropTypes.array,
		noSearchResultText: PropTypes.string,
		isShowCheckAll: PropTypes.bool,
		onChange: PropTypes.func,
		onCheckAll: PropTypes.func,
    }
    static defaultProps = {
        allowClear: false,
        autoClearSearchValue: true,
        defaultValue: '',
        disabled: false,
        isFilter: false,
        multiple: false,
        placeholder: '请选择',
        searchPlaceholder: '请输入',
        searchValue: '',
		data: [],
		noSearchResultText: '没有匹配记录',
		isShowCheckAll: false,
		onChange: ()=>{},
		onCheckAll: ()=>{},
	}
	// static getDerivedStateFromProps (nextProps,prevState) {
	// 	if(JSON.stringify(nextProps.data)===JSON.stringify(prevState.data)){
	// 		return null;
	// 	}
	// 	return {
	// 		...prevState,
	// 		data: format(nextProps.data)
	// 	}
	// }	
	// componentWillReceiveProps () {
	// 	console.log(23)
	// }
    state = {
        show: false,
        loading: false,
        selectValues: [],
		selectList: [],
		data: format(Array.from(this.props.data)||[]),
		isCheckAll: false,
		searchKeyword: ''
	}
	clearRef = React.createRef();
	downRef = React.createRef();	
	SelectRef = React.createRef();
	MenuRef = React.createRef(); 
	checkRef = React.createRef();
    handleClick = ()=>{
		this.setState(state=>{
			return {
				...state,
				show: !state.show
			}
		})
	}
	handleCheckAll = ()=>{
		const selectList = [],selectValues = [];
		let fn = (arr)=>{
			return arr.map(({label,value,children,...other})=>{
				if(!this.state.isCheckAll){
					selectList.push({
						label,
						value
					})
					selectValues.push(value);					
				}
				if(children&&children.length){
					children = fn(children);
				}
				return {
					...other,
					label,
					value,
					children,
					selected: !this.state.isCheckAll
				}
			})
		}
		let data = fn(this.state.data);
		this.setState({
			...this.state,
			isCheckAll: !this.state.isCheckAll,
			selectValues,
			selectList,
			data
		},()=>{
			this.triggerChange();
			this.triggerCheckAll();
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
			this.handleClick();
		}
		this.props.onChange(values,list);
	}
	triggerCheckAll = ()=>{
		this.props.onCheckAll(this.selectList);
	}
	handleRemoveAll = ()=>{
		this.setState({
			...this.state,
			isCheckAll: true
		},()=>{
			this.handleCheckAll();
		})
	}
	handleCheckChange = (value,option)=>{
		option.show = this.props.multiple ? this.state.show : false;
		this.handleChange(value,option);
	} 
	handleChange = (value,option,item=null)=>{
		let fn = arr=>{
			return arr.map(e=>{
				let obj = {...e};
				if(obj.value === value){
					Object.assign(obj,option);
				}else{
					obj.selected = this.props.multiple ? obj.selected : (option.hasOwnProperty('selected') ? false : obj.selected);
				} 
				if(obj.children&&obj.children.length){
					obj.children = fn(obj.children);
				}
				return obj;
			})
		}
		let selectValues,selectList;
		if(option.hasOwnProperty('selected')){
			if(this.props.multiple){
				selectValues = Array.from(this.state.selectValues);
				selectList = Array.from(this.state.selectList);
				if(option.selected){
					selectValues.push(value);
					selectList.push(item);
				}else{
					selectValues = selectValues.filter(e=>e!==value);
					selectList = selectList.filter(e=>e.value!==value);
				}
			}else{
				selectValues = [];
				selectList = [];
				if(option.selected){
					selectValues.push(value);
					selectList.push(item);					
				}
			}			
		}else{
			selectValues = this.state.selectValues;
			selectList = this.state.selectList;
		}
		this.setState(state=>{
			return {
				...state,
				selectList,
				selectValues,
				data: fn(this.state.data)				
			}
		},()=>{
			if(item){
				this.triggerChange();
			}
		})
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
			}			
		}
	}	
	onInputChange = event=>{
		let searchKeyword = event.target.value;
		if(this.loadData){

		}else{
			this.setState(state=>{
				return {
					...state,
					searchKeyword,
					data: filter(state.data,searchKeyword)
				}
			});			
		}
	}
	componentDidMount () {
		if(this.props.defaultValue){
			let selectValues = Array.isArray(this.props.defaultValue) ? this.props.defaultValue : [this.props.defaultValue];
			let selectList = this.state.data.filter(e=>selectValues.includes(e.value));
			let fn = (data)=>{
				return data.map(e=>{
					let obj = {
						...e,
						selected: selectValues.includes(e.value)						
					};
					if(obj.children&&obj.children.length){
						obj.children = fn(obj.children);
					}
					return obj;
				})
			}
			this.setState(state=>{
				return {
					...state,
					selectList,
					selectValues,
					data: fn(this.state.data)
				}
			});
		}			
		document.body.addEventListener('click',event=>{
			let el = event.target;
			if(this.SelectRef.current&&!this.SelectRef.current.contains(el)){
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
			show: this.state.show,
			data: this.state.data,
			noSearchResultText: this.props.noSearchResultText,
			MenuRef: this.MenuRef,
			multiple: this.props.multiple,
			handleChange: this.handleChange,
			isFilter: this.props.isFilter,
			searchPlaceholder: this.props.searchPlaceholder,
			onInputChange: this.onInputChange,
			searchKeyword: this.state.searchKeyword
        }
        return (
			<div className={classnames(styles.wrap)} ref={this.SelectRef}>
					<div className={cx({wrapinner: true,showclear: this.state.selectList.length !== 0})} onClick={this.handleWrapClick}>
						<div className={styles.checkwrap}>
						{
							this.state.selectList.map(({label,value})=>{
								return <TreeListItem 
									key={value}
									single={!this.props.multiple}
									handleCheckChange={this.handleCheckChange}
									label={label}
									value={value}
								/>
							})
						}						
						</div>
						{
							this.state.selectList.length === 0 ? <Placeholder placeholder={this.props.placeholder} /> : null
						}
						{
							this.state.selectList.length === 0 ? null : 
							<ClearButton ref={this.clearRef} handleRemoveAll={this.handleRemoveAll}></ClearButton>								
						}	
						{
							this.props.isShowCheckAll&&this.state.show&&this.props.multiple ? 
							(	
								<CheckButton ref={this.checkRef} handleCheckAll={this.handleCheckAll} />						
							) : (
								<DownButton ref={this.downRef} />									
							)							
						}																
					</div>
					<SelectContext.Provider value={provider}>
						<Menu></Menu>
					</SelectContext.Provider>
			</div>            
        )
    }
}