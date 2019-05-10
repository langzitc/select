import React, { Component } from 'react'
import { render } from 'react-dom'
import Select from './select'
class App extends Component { 
    render () {
        return (
            <div>
                <Select
                data={[{
                    label: '美国',
                    value: 1,
                },{
                    label: '法国',
                    value: 2
                },{
                    label: '英国',
                    value: 3
                }]}
                >
                </Select>         
            </div>
        )
    }
}
render(<App/>,document.getElementById('app'))