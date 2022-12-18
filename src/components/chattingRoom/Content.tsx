import React from 'react';
import styled from 'styled-components';
import { MyChat, FriendChat, FriendChatWithThumbnail, PartsChat, PartsChatWithThumbnail } from '~/components/chattingRoom/ChatBlock';
import { ChattingResponseDto } from '~/types/chatting';
import { UserResponseDto } from '~/types/user';

const Wrapper = styled.main`
    position: absolute;
	top: 80px;
    bottom: 151px;
	left: 0px;
    right: 0px;
	overflow: auto;
    width: 100%;
`;

interface Props {
    myId: number;
    participant: Array<UserResponseDto>;
    chattingList: Array<ChattingResponseDto>;
    messageRef: React.RefObject<HTMLDivElement>;
    showProfile(userData: UserResponseDto): void;
}

const Content: React.FC<Props> = (props) => {
    const { chattingList, children, messageRef } = props;
    // const { showProfile } = props;
    const renderChatting = chattingList.map((chat,idx) => {
        console.log(chat,idx);
        const createdAt = new Date(chat.createdAt);
        const localeTime = createdAt.toLocaleTimeString();
        const localeDate = createdAt.toLocaleDateString();
        const removeSecond = localeTime.substring(0,localeTime.length-3);
        // const senderId = chat.user_id;
        const isMine = chat.isMine;

        const prevChat = idx >= 1 ? chattingList[idx-1] : undefined;
        const prevCreatedAt = prevChat ? new Date(prevChat.createdAt) : "";
        const prevLocaleDate = prevCreatedAt? prevCreatedAt.toLocaleDateString() : "";
        const prevLocaleTime = prevCreatedAt ? prevCreatedAt.toLocaleTimeString() : "";
        const prevRemoveSecond = prevLocaleTime? prevLocaleTime.substring(0, prevLocaleTime.length-3) : "";
        const isPrevSender = prevChat? prevChat.isMine == isMine : false;
        const isSameDate = prevLocaleDate === localeDate;
        // const sender = participant.find(person => person.id === senderId) as UserResponseDto;
        const senderData:UserResponseDto = {
            id: 1,
            user_id: '컴즈',
            name: "컴즈",
            status_msg: "asdf",
            profile_img_url: "asdf",
            background_img_url: "asdf"
        }

        if(isMine){
            // senderData
        }
        else {

        }
        
        // 채팅한 날짜를 표시
        const getDate = () => {
            let weekday=new Array(7);
            weekday[0]="일요일";
            weekday[1]="월요일";
            weekday[2]="화요일";
            weekday[3]="수요일";
            weekday[4]="목요일";
            weekday[5]="금요일";
            weekday[6]="토요일";
            const splitDate = localeDate.split(".");
            const day = weekday[createdAt.getDay()];
            return `${splitDate[0].trim()}년 ${splitDate[1].trim()}월 ${splitDate[2].trim()}일 ${day}`
        }
        // 지금 채팅 날짜가 이전에 채팅 날짜와 다르면 날짜 표시
        const date = isSameDate ? "" : getDate();
        
        // 마지막 채팅인 경우
        if(idx === chattingList.length - 1){
            // 내가 보낸 채팅인 경우
            if(isMine){
                return <MyChat msg={chat.content} notRead={chat.not_read} localeTime={removeSecond} content={date} key={chat.id}/>;
            }

            // 이전에 보낸 채팅과 사람, 날짜가 동일한 경우
                
            if(isPrevSender && isSameDate){
                if(chat.chat_type !== "parts"){
                    return <FriendChat msg={chat.content} notRead={chat.not_read} localeTime={removeSecond} key={chat.id}/>;
                }
                else {
                    return <PartsChat parts={chat.parts} msg={chat.content} notRead={chat.not_read} localeTime={removeSecond} key={chat.id}/>;

                }
            }
            if(chat.chat_type !== "parts"){
                return <FriendChatWithThumbnail msg={chat.content} user={senderData} notRead={chat.not_read} localeTime={removeSecond} content={date} key={chat.id}/>;
            }
            else {
                return <PartsChatWithThumbnail parts={chat.parts} msg={chat.content} user={senderData} notRead={chat.not_read} localeTime={removeSecond} content={date} key={chat.id}/>;

            }
        }
        /**
         채팅 시간 표시 여부를 결정하기 위해, 다음과 같은 규칙을 적용했습니다. 
         1. 기준 채팅과 다음 채팅을 보낸 사람이 다르면 시간을 표시합니다.
         2. 기준 채팅과 다음 채팅을 보낸 시간 또는 날짜가 다르면 시간을 표시합니다.
         **/ 
        const afterSender = chattingList[idx+1];
        const afterCreateAt = new Date(afterSender.createdAt);
        const afterLocaleDate = afterCreateAt.toLocaleDateString();
        const afterLocaleTime = afterCreateAt.toLocaleTimeString();
        const afterRemoveSecond = afterLocaleTime.substring(0, afterLocaleTime.length-3);
        const isSameTimeWithAfterTime = afterRemoveSecond === removeSecond;
        const isSameDateWithAfterTime = afterLocaleDate === localeDate;
        const time = (afterSender.isMine != isMine || !isSameTimeWithAfterTime || (!isSameDateWithAfterTime)) ? removeSecond : "";
        // 내가 보낸 경우
        if(isMine){
            return <MyChat msg={chat.content} notRead={chat.not_read} localeTime={time} content={date} key={chat.id}/>;
        }
        // 이전 채팅과 지금 채팅이 보낸 사람, 날짜가 같고, 보낸 시간이 같을 경우
        if(isPrevSender && isSameDate && (prevRemoveSecond === removeSecond)){
            if(chat.chat_type !== "parts"){
                return <FriendChat msg={chat.content} notRead={chat.not_read} localeTime={time} key={chat.id}/>;
            }
            else {
                return <PartsChat parts={chat.parts} msg={chat.content} notRead={chat.not_read} localeTime={time} key={chat.id}/>;

            } 
        }
        if(chat.chat_type !== "parts"){
            return <FriendChatWithThumbnail msg={chat.content} user={senderData} notRead={chat.not_read} localeTime={time} content={date} key={chat.id}/>;
        }
        else {
            return <PartsChatWithThumbnail parts={chat.parts} msg={chat.content} user={senderData} notRead={chat.not_read} localeTime={time} content={date} key={chat.id}/>;

        }
        
    })
    
    return(
        <Wrapper ref={messageRef}>
            {children}
            {renderChatting}
        </Wrapper>
    )
}

export default Content;