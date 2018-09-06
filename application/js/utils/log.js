/*jshint esnext: true */

export default function simplelog(data) {
	console.log("Log: " + data);
}

export function timeLog(data) {
	console.log(Date.now(), data);
}
