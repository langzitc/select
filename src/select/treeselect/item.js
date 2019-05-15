import React, { Component } from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { SelectContext } from '../context'
import { CheckBox } from '../components'
const cx = classnames.bind(styles);
class Item extends Component {
    constructor (props) {
        super(props);
    } 
    iconRef = React.createRef();
    handItemClick = (multiple,handleChange,event)=>{
        event.stopPropagation();
        let el = event.target;
        if(!this.iconRef.current.contains(el)){
            handleChange(this.props.data.value,{
                selected: multiple ? !this.props.data.selected : true
            },{
                label: this.props.data.label,
                value: this.props.data.value
            })
        }
    }
    render () {       
        const {label,value,children = [],selected,multiple,expand} = this.props.data;
        return (
            <SelectContext.Consumer>
                {({multiple,handleChange})=>(
                    <div className={cx({itemwrap: true})} onClick={(event)=>{
                        this.handItemClick(multiple,handleChange,event);
                    }}>
                        <div className={cx({item: true,selected: selected&&!multiple})}>
                            <i 
                            onClick={event=>{
                                event.stopPropagation();
                                handleChange(value,{
                                    expand: !expand
                                });
                            }} 
                            ref={this.iconRef} 
                            className={cx({iconfont: true,'icon-down': true,expand: expand})}
                            >
                            </i>
                            {multiple ? <CheckBox show={multiple} selected={selected} ></CheckBox> : null}
                            {label}
                        </div>
                        {
                            expand ? children.map(e=>{
                                return <Item key={e.value} data={e}></Item>
                            }) : []
                        }
                    </div>                    
                )}
            </SelectContext.Consumer>
        )
    }
}
export default Item;