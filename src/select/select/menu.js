import React, { Component } from 'react'
import classnames from 'classnames/bind'
import styles from '../style.module.scss'
import { SelectContext } from '../context'
import { Item, Tips, Loading } from '../components'
const cx = classnames.bind(styles);
class Menu extends Component {
    constructor (props) {
        super(props);
    } 
    render () {       
        return (
            <SelectContext.Consumer>
                {
                    ({
                        show,
                        data,
                        getIsSelected,
                        handleCheckChange,
                        noSearchResultText,
                        MenuRef,loading,
                        loadingText
                    })=>(
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