import { useEffect, useState } from "react";
import filter from "./Filter.module.css";

const Filter = () => {
  const algorithmList = [
    { name: "#DFS", id: 1 },
    { name: "#BFS", id: 2 },
    { name: "#다이나믹프로그래밍", id: 3 },
    { name: "#그리디", id: 4 },
  ];
  const problemList = [
    { name: "모든 문제", id: 1 },
    { name: "보고 푼 문제", id: 2 },
    { name: "혼자 푼 문제", id: 3 },
  ];

  /** 필터 박스에 마우스 오버 */
  const [algoFocus, setAlgoFocus] = useState(0);
  const [probFocus, setProbFocus] = useState(0);

  return (
    <section className={`${filter.filterContainer}`}>
      <div className={`${filter.filter} ${filter.algorithmFilter}`}>
        <h4>알고리즘</h4>
        <ul>
          {algorithmList.map((item, idx) => (
            <li
              className={`${
                algoFocus === item.id ? filter.focusIn : filter.focusOut
              }`}
              onMouseOver={() => {
                setAlgoFocus(item.id);
              }}
              onMouseOut={() => {
                setAlgoFocus(0);
              }}
              key={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={`${filter.filter} ${filter.problemFilter}`}>
        <h4>문제 유형</h4>
        <ul>
          {problemList.map((item, idx) => (
            <li
              className={`${
                probFocus === item.id ? filter.focusIn : filter.focusOut
              }`}
              onMouseOver={() => {
                setProbFocus(item.id);
              }}
              onMouseOut={() => {
                setProbFocus(0);
              }}
              key={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Filter;
