import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

const cx = classnames.bind(styles);
function Item (props) {
    return (
        <div onClick={props.handleCheckChange.bind(this,props.value)} className={cx({selectitem: true,selected: props.selected})}>
            <span className={styles.itemLabel}>{props.label}</span>          
            <span className={cx({checkicon: true})}>
                <i className={classnames('iconfont','icon-CHECKMARK')}></i>
            </span>
        </div>   
    )
}
function Tips(props){
    return <div className={styles.tips}>{props.children}</div>;
}
function Loading(props){
    return <div className={styles.loading}>{props.children}</div>;
}
function Placeholder(props){
    return <span className={styles.placeholder}>{props.placeholder}</span>
}
const CheckButton = React.forwardRef((props,ref)=>{
    return (
        <span ref={ref} className={classnames(styles.icon,styles.checkall)} onClick={props.handleCheckAll}>
            <i className={classnames('iconfont','icon-quanxuan')}></i>
        </span>		        
    )
});
const DownButton = React.forwardRef((props,ref)=>{
    return (
        <span ref={ref} className={classnames(styles.icon,styles.iconl)}>
            <i className={classnames('iconfont','icon-down')}></i>
        </span>		        
    )
});
const ClearButton = React.forwardRef((props,ref)=>{
    return (
        <span onClick={props.handleRemoveAll} ref={ref} className={styles.clear}>
            <i className={classnames('iconfont','icon-clear')}></i>
        </span>	          
    )
});
function SelectListItem(props){
    return (
        <span className={cx({
            checkitem: true,
            disabled: false,
            single: props.single
        })}
        onClick={props.handleCheckChange.bind(this,props.value,false)}
        >
        {props.label}
        <i className={cx({
            iconfont: true,
            'icon-clear': true
        })}></i>
        </span>        
    )
}
function TreeListItem(props){
    return (
        <span className={cx({
            checkitem: true,
            disabled: false,
            single: props.single
        })}
        onClick={(event)=>{
            event.stopPropagation();
            props.handleCheckChange(props.value,{
                selected: false
            });
        }}
        >
        {props.label}
        <i className={cx({
            iconfont: true,
            'icon-clear': true
        })}></i>
        </span>        
    )
}
function CheckBox(props){
    return (
        <span className={cx({checkbox: true,show: props.show,selected: props.selected})}>
            <i className={cx({iconfont: true,'icon-CHECKMARK': true})}></i>
        </span>
    )
}
function Search(props){
    return (
        <div className={styles.search}>
            <input value={props.searchKeyword} onChange={props.onChange} type="text" placeholder={props.placeholder}/>
        </div>
    )
}
export {
    SelectListItem,
    ClearButton,
    DownButton,
    CheckButton,
    Placeholder,
    Loading,
    Tips,
    Item,
    TreeListItem,
    CheckBox,
    Search
}