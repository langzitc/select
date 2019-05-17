export function throttle(fn, delay){
	let  timer    = null,
		 remaining   = 0,
		 previous = new Date();
 
	 return function () {
		 let now = new Date(),
		 remaining = now - previous,
		 args = arguments,
		 context = this;
 
		 if (remaining >= delay) {
			 if (timer) {
				 clearTimeout(timer);
			 }
 
			 fn.apply(context, args);
			 previous = now;
		 } else {
			 if (!timer) {
				 timer = setTimeout(function () {
					 fn.apply(context, args);
					 previous = new Date();
				 }, delay - remaining);
			 }
		 }
	 };
}
export function format(data,isloading) {
	return data.map(e=>{
		if(!e.hasOwnProperty('expand')){
			e.expand = false;
		}
		if(!e.hasOwnProperty('show')){
			e.show = true;
		}		
		if(!e.hasOwnProperty('selected')){
			e.selected = false;
		}
		if(isloading){
			e.loading = false;
		}
		if(e.children&&e.children.length){
			e.children = format(e.children);
		}
		return e;
	})
}
export function filter(data,keyword,isSearchAutoSelect) {
	let selectValues = [],selectList = [];
	function fn(data,keyword,isSearchAutoSelect) {
		return data.map(e=>{
			let show = JSON.stringify(e).includes(keyword),obj = {...e};
			obj.show = show;
			obj.selected = isSearchAutoSelect&&keyword ? true : false;
			if(obj.selected){
				selectValues.push(e.value);
				selectList.push({
					...e
				});
			}
			if(e.children&&e.children.length){
				obj.children = fn(e.children,keyword,isSearchAutoSelect);
				obj.expand = show;
			}		
			return obj;
		})
	}
	return {
		selectValues,
		selectList,
		data: fn(data,keyword,isSearchAutoSelect)
	}
}