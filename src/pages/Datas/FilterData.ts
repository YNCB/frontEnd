const myFilterList = [
    {
        id: 1,
        title: "알고리즘",
        filtering: [
            { id: 1, name: "#DFS" },
            { id: 2, name: "#BFS" },
            { id: 3, name: "#다이나믹프로그래밍"},
            { id: 4 ,name: "#그리디" },
        ]
    },
    {
        id: 2,
        title: "문제 유형",
        filtering: [
            { id: 1, name: "모든 문제" },
            { id: 2, name: "보고 푼 문제" },
            { id: 3, name: "혼자 푼 문제" },
        ]
    },
    {
        id: 3,
        title: "언어",
        filtering: [
            { id: 1, name: "C++" },
            { id: 2, name: "Python" },
            { id: 3, name: "Java" },
            { id: 4, name: "JavaScript" },
        ]
    },
    {
        id: 4,
        title: "정렬",
        filtering: [
            { id: 1, name: '최신순'},
            { id: 2, name: '오래된순'},
            { id: 3, name: '댓글순'},
            { id: 4, name: '좋아요순'},
            { id: 5, name: '조회순'},
        ]
    },
]

const othersFilterList = [
    {
        id: 1,
        title: "언어",
        filtering: [
            { id: 1, name: "#DFS" },
            { id: 2, name: "#BFS" },
            { id: 3, name: "#다이나믹프로그래밍"},
            { id: 4 ,name: "#그리디" },
        ]
    },
    {
        id: 2,
        title: "정렬",
        filtering: [
            { id: 1, name: '최신순'},
            { id: 2, name: '오래된순'},
            { id: 3, name: '댓글순'},
            { id: 4, name: '좋아요순'},
            { id: 5, name: '조회순'},
        ]
    },
]

export { myFilterList, othersFilterList }