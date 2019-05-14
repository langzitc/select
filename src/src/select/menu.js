import React, { Component } from 'react'
import classnames from 'classnames/bind'
import styles from '../style.module.scss'
import { SelectContext } from '../context'
let cx = classnames.bind(styles);
function Item(props) {
    return (
        <div onClick={props.handleCheckChange.bind(this,props.value)} className={cx({item: true,selected: props.selected})}>
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
class Menu extends Component {
    constructor (props) {
        super(props);
    } 
    render () {       
        return (
            <SelectContext.Consumer>
                {
                    ({show,data,getIsSelected,handleCheckChange,noSearchResultText,MenuRef,loading,loadingText})=>(
                        <div ref={MenuRef} className={cx({menu:true,showMenu: show})}>
                            <div className={cx({menuwrap:true})}>
                                {
                                    data.length ? data.map((el,index)=>{
                                        let selected = getIsSelected(el.value);
                                        return (
                                            <Item selected={selected} handleCheckChange={handleCheckChange} key={index} {...el}></Item>
                                        )
                                    }) : (loading ? <Loading>{loadingText}</Loading> : <Tips>{noSearchResultText}</Tips>)
                                }
                            </div>                              
                        </div>                        
                    )
                }
            </SelectContext.Consumer>
        )
    }
}
export default Menu;