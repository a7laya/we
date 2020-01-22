//返回当前时间
let returntime = () => {
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.date = date.getDate();
	this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
	this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	var currentTime = this.year + "-" + this.month + "-" + this.date
	return currentTime;
}
//跳转
let go = (url,router) =>{
	router.push(url)
}
export {
	returntime,
	go,
	setUrl
}