import { useEffect, useState } from "react";
import { RootState } from "../../store/config";
import { OnlyInput } from "../molecules/Input";
import * as S from './BoxStyle'
import { BoxInterface } from "../../interfaces/boxInterface";
import { useSelector } from "react-redux";

const Box = ({isMain}: {isMain: boolean}) => {
    const box = useSelector((state: RootState) => state.box);
    const [focus, setFocus] = useState(-1);

    return (
        <S.MainContainer>
            <S.ContentWrapper>
                <S.ContentList>
                {!!box.count && box.list.map((item: BoxInterface, idx: number) => {
                    return (
                    <S.ContentBox key={item.post_id}
                        scale = { focus === item.post_id ? 'scale(1.04)' : 'scale(1.0)'}
                        onMouseOver={() => {
                            setFocus(item.post_id);
                        }}
                        onMouseOut={() => {
                            setFocus(-1);
                        }}
                    >
                        <S.ContentContainer>
                            <S.ContentLink to='/post'>
                                <S.ContentInfo>
                                    <p>{item.language} |</p>
                                    <p>{item.type === 'ALONE' ? '혼자 푼 문제' : '보고 푼 문제'}</p>
                                </S.ContentInfo>
                                <S.ContentTags>
                                    {item.tags.map((tagsItem, tagsIdx) => {
                                        return <li key={tagsItem}>#{tagsItem}</li>;
                                    })}
                                </S.ContentTags>
                                <S.ContentTitle>
                                    <h3>{item.title}</h3>
                                </S.ContentTitle>
                                <S.ContentCommentsAndLikes>
                                    <S.ContentComments>
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18.7 0C20.4544 0 21.8938 1.37673 21.9944 3.10641L22 3.3V14.3C22 16.0544 20.6233 17.4938 18.8936 17.5944L18.7 17.6H14.85L11.88 21.56C11.6721 21.8372 11.3465 22 11 22C10.6968 22 10.4096 21.8754 10.2033 21.6585L10.12 21.56L7.15 17.6H3.3C1.54558 17.6 0.106189 16.2233 0.00561342 14.4936L0 14.3V3.3C0 1.54558 1.37673 0.106189 3.10641 0.00561342L3.3 0H18.7ZM18.7 2.2H3.3C2.73719 2.2 2.27113 2.62586 2.20742 3.17198L2.2 3.3V14.3C2.2 14.8628 2.62586 15.3289 3.17198 15.3926L3.3 15.4H7.7C8.00319 15.4 8.29037 15.5246 8.49671 15.7415L8.58 15.84L11 19.0663L13.42 15.84C13.6019 15.5974 13.8739 15.4425 14.1712 15.4075L14.3 15.4H18.7C19.2628 15.4 19.7289 14.9741 19.7926 14.428L19.8 14.3V3.3C19.8 2.73719 19.3741 2.27113 18.828 2.20742L18.7 2.2ZM16.5 9.9C17.1072 9.9 17.6 10.3928 17.6 11C17.6 11.5638 17.1751 12.029 16.6282 12.0926L16.5 12.1H5.5C4.8928 12.1 4.4 11.6072 4.4 11C4.4 10.4362 4.82491 9.97098 5.37177 9.90741L5.5 9.9H16.5ZM16.5 5.5C17.1072 5.5 17.6 5.9928 17.6 6.6C17.6 7.16383 17.1751 7.62902 16.6282 7.69259L16.5 7.7H5.5C4.8928 7.7 4.4 7.2072 4.4 6.6C4.4 6.03617 4.82491 5.57098 5.37177 5.50741L5.5 5.5H16.5Z" fill="black"/>
                                        </svg>
                                        <span>{item.replyNum} |</span>
                                    </S.ContentComments>
                                    <S.ContentLikes>
                                        <img src={`${process.env.PUBLIC_URL}/assets/img/heart.svg`} alt=""/>
                                        <span>{item.likeNum} |</span>
                                    </S.ContentLikes>
                                    <S.ContentViews>
                                        <img src={`${process.env.PUBLIC_URL}/assets/img/views.svg`} alt=""/>
                                        <span>{item.countView}</span>
                                    </S.ContentViews>
                                </S.ContentCommentsAndLikes>
                            </S.ContentLink>
                            <S.ContentDetailLink to='/userbox' state={{ nickname: item.nickname }}>
                                <p>{isMain ? `${item.nickname}` : '다른 유저 풀이'}</p>
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/img/arrow.svg`}
                                    alt="otherUserContentButton"
                                />
                            </S.ContentDetailLink>
                        </S.ContentContainer>
                    </S.ContentBox>
                    );
                })}
                </S.ContentList>
            </S.ContentWrapper>
        </S.MainContainer>
    );
};

export default Box