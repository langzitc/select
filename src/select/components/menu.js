import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from '../style.scss'
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
    static propTypes = {
        data: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.func
        ]),
        show: PropTypes.bool,
        isSelectClose: PropTypes.bool,
        toggleMenu: PropTypes.func,
        handleCheckChange: PropTypes.func
    }
    static defaultProps = {
        data: [],
        show: false,
        isSelectClose: false
    }
    state = {
        selectList: []
    }
    getIsSelected = value =>{
        return this.state.selectList.some(el=>el === value)
    }
    handleCheckChange = (value,event)=>{
        let selectList = Array.from(this.state.selectList);
        if(selectList.includes(value)){
            selectList = selectList.filter(el=>{
                return el !== value;
            })
        }else{
            selectList.push(value);
        }
        this.setState(state=>{
            return {
                ...state,
                selectList
            }
        })
        if(this.props.isSelectClose){
            this.props.toggleMenu();
        }
        this.props.handleCheckChange(selectList);
    }
    render () {
        let d  = this.props.data;
        let arr = [];
        if(!Array.isArray(d)){
            arr = d();
        }else{
            arr = d;
        }
        return (
            <div className={cx({menu:true,showMenu: this.props.show})}>
                {
                    d.map((el,index)=>{
                        let selected = this.getIsSelected(el.value);
                        return (
                            <Item selected={selected} handleCheckChange={this.handleCheckChange} key={index} {...el}></Item>
                        )
                    })
                }
            </div>
        )
    }
}
export default Menu;