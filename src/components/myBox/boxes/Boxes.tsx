import { useState } from "react";
import { Link } from "react-router-dom";
import main from "./Boxes.module.css";
import styled from "styled-components";

const Main = () => {
  const codeList = [
    {
      id: 17135,
      title: "캐슬디펜스",
      type: "보고 푼 문제",
      language: "python",
      comment: 2,
      like: 3,
      tags: ["#구현", "#그리디", "#시뮬레이션", "DFS"],
    },
    {
      id: 17136,
      title: "캐슬디펜스",
      type: "보고 푼 문제",
      language: "python",
      comment: 2,
      like: 3,
      tags: ["#구현", "#그리디", "#시뮬레이션", "DFS"],
    },
    {
      id: 17137,
      title: "캐슬디펜스",
      type: "보고 푼 문제",
      language: "python",
      comment: 2,
      like: 3,
      tags: ["#구현", "#그리디", "#시뮬레이션", "DFS"],
    },
    {
      id: 17138,
      title: "캐슬디펜스",
      type: "보고 푼 문제",
      language: "python",
      comment: 2,
      like: 3,
      tags: ["#구현", "#그리디", "#시뮬레이션", "DFS"],
    },
    {
      id: 17139,
      title: "캐슬디펜스",
      type: "보고 푼 문제",
      language: "python",
      comment: 2,
      like: 3,
      tags: ["#구현", "#그리디", "#시뮬레이션", "DFS"],
    },
    {
      id: 17130,
      title: "캐슬디펜스",
      type: "보고 푼 문제",
      language: "python",
      comment: 2,
      like: 3,
      tags: ["#구현", "#그리디", "#시뮬레이션", "DFS"],
    },
  ];

  const [focusContent, setFocusContent] = useState(0);

  return (
    <main className={`${main.mainContainer}`}>
      <div className={`${main.searchWrapper}`}>
        <div className={`${main.searchBox}`}>
          <input type="number" placeholder="문제 번호를 입력하세요." />
        </div>
      </div>
      <div className={`${main.contentWrapper}`}>
        <ul className={`${main.contentList}`}>
          {codeList.map((item, idx) => {
            return (
              <Link
                to="/"
                key={item.id}
                className={
                  focusContent === item.id
                    ? `${main.focusIn}`
                    : `${main.focusOut}`
                }
                onMouseOver={() => {
                  setFocusContent(item.id);
                }}
                onMouseOut={() => {
                  setFocusContent(0);
                }}
              >
                <li className={`${main.contentBox}`}>
                  <div className={`${main.contentContainer}`}>
                    <div className={`${main.contentInfo} ${main.contentSmallFont}`}>
                      <p>{item.language} |</p>
                      <p>{item.type}</p>
                    </div>
                    <div className={`${main.contentTitle}`}>
                      <h3>{item.id}</h3>
                      <h3>{item.title}</h3>
                    </div>
                    <div className={`${main.contentCommentsAndLikes}`}>
                      <div className={`${main.contentComments}`}>
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 512 512"
                          color="#999999"
                          height="20"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: "rgb(153, 153, 153)" }}
                        >
                          <path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
                        </svg>
                        <span>{item.comment} |</span>
                      </div>
                      <div className={`${main.contentLikes}`}>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/heart.svg`} alt=""/>
                        <span>{item.like}</span>
                      </div>
                    </div>
                    <ul className={`${main.contentTags} ${main.contentSmallFont}`}>
                      {item.tags.map((tagsItem, tagsIdx) => {
                        return <li key={tagsItem}>{tagsItem}</li>;
                      })}
                    </ul>
                  </div>
                  <div className={`${main.contentOtherUser}`}>
                    <p>다른 유저 풀이</p>
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/img/arrow.svg`}
                      alt="otherUserContentButton"
                    />
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Main;
