import React from 'react';
import Select from './Select'
import TreeSelect from './TreeSelect'
function action () {
    let n = Math.round(Math.random()*50);
    let arr = [];
    for(let i = 0;i<n;i++){
        arr.push({
            label: `label${i}${(new Date().getTime())}`,
            value: i
        })
    }
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(arr);
        },1000)
    })
}
function loadData (keyword){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            switch(keyword){
                case 1: resolve([{

                }]);
            }
        },300)
    })
}
const data = [{
    label: '四川',
    value: 1,
    children: [{
        label: '成都',
        value: 11,
        children: [{
            label: '郫县',
            value: 111
        },{
            label: '锦江区',
            value: 112
        }]
    },{
        label: '绵阳',
        value: 12
    }]
},{
    label: '浙江',
    value: 2
},{
    label: '北京',
    value: 3
},{
    label: '上海',
    value: 4
},{
    label: '广州',
    value: 5
},{
    label: '天津',
    value: 6
},{
    label: '重庆',
    value: 7
},{
    label: '事实上',
    value: 8
}]
function App() { 
  return (
    <div className="App">
        <div style={{marginTop: "30px"}}>
                <Select
                isFilter={true}
                defaultValue={1}
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
        <div style={{marginTop: "30px"}}>
                <Select
                isFilter={true}
                isMultiple
                defaultValue={[1]}
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
        <div style={{marginTop: "30px"}}>
                <Select
                isFilter={true}
                isMultiple
                isAsync
                action={action}
                >
                </Select>  
        </div>
        <div style={{marginTop: "30px"}}>
                <Select
                isFilter={true}
                isMultiple
                isAsync
                isShowCheckAll
                action={action}
                >
                </Select>   
        </div>
        <div style={{marginTop: "30px"}}>
                <TreeSelect data={data}>
                </TreeSelect>  
        </div>
        <div style={{marginTop: "30px"}}>
                <TreeSelect multiple data={data}>
                </TreeSelect>  
        </div>
        <div style={{marginTop: "30px"}}>
                <TreeSelect multiple data={data} isShowCheckAll>
                </TreeSelect>  
        </div>
        <div style={{marginTop: "30px"}}>
                <TreeSelect defaultValue={[1,2,3]} multiple data={data} isShowCheckAll isFilter>
                </TreeSelect>    
        </div>                                                                                                                                   
    </div>
  );
}

export default App;
