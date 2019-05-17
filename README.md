# React Select Component
---
## Select
### props
props | 描述 | 类型 | 默认值
:-: | :-: | :-: | :-: 
disabled | 禁止点击 | boolean | false
isFilter | 是否过滤 | boolean | false
placeholder | 提示 | string | '请选择'
multiple    | 多选 | boolean | false
async    | 远程搜索 | boolean | false
isShowCheckAll    | 显示全选 | boolean | false
isSearchAutoSelect    | 搜索自动全选 | boolean | false
isSelectClose    | 选择后关闭下拉菜单 | boolean | true
action    | 接收一个函数，参数为keyword，返回值为promise | function | null
data    | 数据项，{label,value}类型 | Array | []
defaultValue    | 默认值 | [string,number,array] | ''
onInputChange    | 搜索框输入回调 | function | null
onChange    | 值改变事件,参数为(value,data) | function | null
onHideModal    | 下拉菜单关闭回调 | function | null
onSelectAll    | 全选回调,参数（value,data） | function | null
onClear    | 清除回调 | function | null
noSearchResultText    | 没有搜索结果提示文字 | string | '没有匹配的记录'
loadingText    | 加载中文字 | string | '加载中'
clear | 是否显示清除按钮 | bool | false
---
### example 
``` javascript
import { Select } from 'select'
ReactDom.render(<Select />)
```
## TreeSelect
### props
props | 描述 | 类型 | 默认值
:-: | :-: | :-: | :-: 
disabled | 禁止点击 | boolean | false
isFilter | 是否过滤 | boolean | false
clear | 是否显示清除 | boolean | true
loadData | 异步加载，参数keyword | function | null
placeholder | 提示 | string | '请选择'
searchPlaceholder | 搜索提示 | string | '请输入'
searchValue | 默认搜索keyword | string | ''
multiple    | 多选 | boolean | false
isShowCheckAll    | 显示全选 | boolean | false
action    | 接收一个函数，参数为keyword，返回值为promise | function | null
data    | 数据项，{label,value}类型 | Array | []
defaultValue    | 默认值 | [string,number,array] | ''
onChange    | 值改变事件,参数为(value,data) | function | null
noSearchResultText    | 没有搜索结果提示文字 | string | '没有匹配的记录'
loadingText    | 加载中文字 | string | '加载中'
isSearchAutoSelect    | 搜索自动全选 | boolean | false
---
### example 
``` javascript
import { TreeSelect } from 'select'
ReactDom.render(<TreeSelect />)
```

test
