const problemList = new Array(6).fill({}).map((item, idx) => {
	let obj = {
		id: idx+1,
		title: "캐슬디펜스",
		type: "보고 푼 문제",
		language: "Python",
		comment: 2,
		like: 3,
		views: 8,
		tags: ["#구현", "#그리디", "#시뮬레이션", "DFS"],
	}
	return obj
})

export default problemList