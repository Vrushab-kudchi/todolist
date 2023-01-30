
module.exports.getDate = function () {
   var options = {
		weekday: "long",
		month: "long",
		day: "numeric",
	};
	var today = new Date();
	let day = today.toLocaleDateString("en-US", options);
	return day;

}
