const myFilterList = [
    {
        id: 1,
        title: "태그",
        key: "tags",
        filtering: [
            { id: 1, name: "전체", value: ''}
        ]
    },
    {
        id: 2,
        title: "문제 유형",
        key: "type",
        filtering: [
            { id: 1, name: "모든 문제", value: ''},
            { id: 2, name: "보고 푼 문제", value: 'SEE' },
            { id: 3, name: "혼자 푼 문제", value: 'ALONE' },
        ]
    },
    {
        id: 3,
        title: "언어",
        key: "language",
        filtering: [
            { id: 1, name: "전체", value: "" },
            { id: 2, name: "C++", value: "C++", },
            { id: 3, name: "Python", value: "Python",},
            { id: 4, name: "JS", value: "JS",},
            { id: 5, name: "Java", value: "Java",},
            { id: 6, name: "C", value: "C",},
            { id: 7, name: "C#", value: "C#",},
            { id: 8, name: "Swift", value: "Swift",},
            { id: 9, name: "Kotlin", value: "Kotlin", },
            { id: 10, name: "Ruby", value: "Ruby",},
            { id: 11, name: "Swift", value: "Swift", },
            { id: 12, name: "Go", value: "Go",},
            { id: 13, name: "Etc", value: "Etc",},
        ]
    },
    {
        id: 4,
        title: "정렬",
        key: "orderKey",
        filtering: [
            { id: 1, name: '최신순', value: 'latest'},
            { id: 2, name: '오래된순', value: 'oldest'},
            { id: 3, name: '댓글순', value:'replyNum'},
            { id: 4, name: '좋아요순', value:'likeNum'},
            { id: 5, name: '조회순', value:'countView'},
        ]
    },
]

const othersFilterList = [
    {
        id: 1,
        title: "언어",
        key: "language",
        filtering: [
            { id: 1, name: "전체", value: "" },
            { id: 2, name: "C++", value: "C++", },
            { id: 3, name: "Python", value: "Python",},
            { id: 4, name: "JS", value: "JS",},
            { id: 5, name: "Java", value: "Java",},
            { id: 6, name: "C", value: "C",},
            { id: 7, name: "C#", value: "C#",},
            { id: 8, name: "Swift", value: "Swift",},
            { id: 9, name: "Kotlin", value: "Kotlin", },
            { id: 10, name: "Ruby", value: "Ruby",},
            { id: 11, name: "Swift", value: "Swift", },
            { id: 12, name: "Go", value: "Go",},
            { id: 13, name: "Etc", value: "Etc",},
        ]
    },
    {
        id: 2,
        title: "정렬",
        key: "orderKey",
        filtering: [
            { id: 1, name: '최신순', value: 'latest'},
            { id: 2, name: '오래된순', value: 'oldest'},
            { id: 3, name: '댓글순', value:'replyNum'},
            { id: 4, name: '좋아요순', value:'likeNum'},
            { id: 5, name: '조회순', value:'countView'},
        ]
    },
]

export { myFilterList, othersFilterList }