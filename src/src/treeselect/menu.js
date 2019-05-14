import React, { Component } from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { SelectContext } from '../Select/context'
import Item from './item'
let cx = classnames.bind(styles);
function Tips(props){
    return <div className={styles.tips}>{props.children}</div>;
}
function Loading(props){
    return <div className={styles.loading}>{props.children}</div>;
}
function Search(props){
    return (
        <div className={styles.search}>
            <input value={props.searchKeyword} onChange={props.onChange} type="text" placeholder={props.placeholder}/>
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
                    ({show,data,noSearchResultText,MenuRef,isFilter,searchPlaceholder,onInputChange,searchKeyword})=>(
                        <div ref={MenuRef} className={cx({menu:true,showMenu: show,issearch: isFilter})}>
                            {
                                isFilter ? <Search value={searchKeyword} onChange={onInputChange} placeholder={searchPlaceholder}/> : []
                            }
                            <div className={styles.menuwrapOuter}>
                                <div className={cx({menuwrap:true})}>
                                    {
                                        data.length&&data[0].show ? data.map((el)=>{
                                            return (
                                                el.show ? <Item key={el.value} data={el}></Item> : null
                                            )
                                        }) :  <Tips>{noSearchResultText}</Tips>
                                    }
                                </div>                               
                            </div>                           
                        </div>                        
                    )
                }
            </SelectContext.Consumer>
        )
    }
}
export default Menu;