import React, { Component } from 'react'
import classnames from 'classnames/bind'
import styles from '../style.scss'
import { SelectContext, MenuRef } from '../context'
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
class Menu extends Component {
    constructor (props) {
        super(props);
    } 
    render () {
        return (
            <SelectContext.Consumer>
                {
                    ({show,data,getIsSelected,handleCheckChange})=>(
                        <div ref={MenuRef} className={cx({menu:true,showMenu: show})}>
                            <div className={cx({menuwrap:true})}>
                                {
                                    data.map((el,index)=>{
                                        let selected = getIsSelected(el.value);
                                        return (
                                            <Item selected={selected} handleCheckChange={handleCheckChange} key={index} {...el}></Item>
                                        )
                                    })
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