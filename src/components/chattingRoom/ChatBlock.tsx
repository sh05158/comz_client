import React from 'react';
import styled from 'styled-components';
import {UserResponseDto} from '~/types/user';
import { BASE_IMG_URL } from '~/constants';
import { SeparationBlock } from './InfoBlock';
import { Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Link } from 'react-router-dom';

// 채팅방에서 채팅을 나타내는 컴포넌트
const ChatWrapper = styled.div`
    position: relative;
    display: inline-block;
	padding: 7px 8px;
	border-radius: 4px;
	margin-bottom: 7px;
	box-shadow: 0px 1px 2px 0px #8FABC7;
    max-width: 70%;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size:25px;
`;
const RightBlock = styled.div`
    text-align: right;
    margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
    
    & ${ChatWrapper}{
        background-color: #ffec42;
        text-align: left;
        & span{
            position: absolute;
            display: inline-block;
            &.time{
                min-width: 65px;
                text-align: right;
                bottom: 0;
                left: -120px;
            }
            &.not-read {
                color: #ffec42;
                min-width: 30px;
                text-align: right;
                bottom: 16px;
                left: -35px;
            }
        }
    }
`;
const LeftBlock = styled.div`
    position: relative;
    margin-top: 10px;
	margin-left: 10px;
	margin-right: 10px;
    padding-left: 50px;
    & ${ChatWrapper}{
        background-color: #fff;
        & span{
            position: absolute;
            &.time{
                min-width: 65px;
                text-align: left;
                bottom: 0;
                right: -120px;
            }
            &.not-read {
                color: #ffec42;
                min-width: 30px;
                text-align: left;
                bottom: 16px;
                right: -35px;
            }
        }
    }
    & img {
        // position: absolute;
        top: 3px;
        left: 0;
        height: 45px;
        width: 45px;
        border-radius: 20px;
        float: left;
        cursor: pointer;
    }


`;
const NameBlock = styled.div`
    font-size:20px;
    margin-bottom: 5px;
`;

interface PartProps {
    part?:any;
}


interface ChatProps {
    msg: string;
    localeTime: string;
    notRead: number;
    content?: string;
    parts?:any;
}

interface FriendChatProps {
    user: UserResponseDto;
    msg: string;
    localeTime: string;
    notRead: number;
    content?: string;
    parts?:any;
}


export const Part: React.FC<PartProps> = ({part}) => {
    return(
        // {/* // <Link to={part.shop_link} target="_blank" rel="noopener noreferrer"> */}
        <TableRow>
            <Link to={{ pathname: part.shop_link }} target="_blank">

                <TableCell style={{width: '5%',padding:'3px', fontSize:"20px"}} align='center' color='red'>{part.part_type}</TableCell>
                <TableCell style={{width: '5%',padding:'3px', fontSize:"20px"}} align='center' color='red'><div><img src={part.thumbnail}></img></div></TableCell>
                <TableCell style={{width: '25%',padding:'3px', fontSize:"20px"}} align='center'><div>{part.part_name}</div><div>{part.price.toLocaleString()+"원"}</div></TableCell>
                {/* <TableCell align='center'>내용</TableCell>
                <TableCell align='center'>글삭제</TableCell> */}
            </Link>
        </TableRow>
        
    );
}

export const PartChat: React.FC<ChatProps> = ({msg, parts, localeTime, notRead}) => {
    let totalPrice : number = 0;

    for(let i = 0; i<parts.length;i++){
        totalPrice+=parts[i].price;

    }



    return(
        <ChatWrapper>
            {msg}
            <Table style={{width: "800px"}}>
                <TableBody>
                    <Part part={parts[0]}></Part>
                    <Part part={parts[1]}></Part>
                    <Part part={parts[2]}></Part>
                    <Part part={parts[3]}></Part>
                    <Part part={parts[4]}></Part>
                    <Part part={parts[5]}></Part>
                    <Part part={parts[6]}></Part>
                    <TableRow><TableCell style={{width: '5%',padding:'3px',fontSize:'35px'}} align='center' color='red'>{totalPrice.toLocaleString()+"원"}</TableCell></TableRow>
                </TableBody>
            </Table>
            
            <span className="time">{localeTime}</span>
            <span className="not-read">{notRead > 0 ? notRead : ""}</span>
        </ChatWrapper>
    );
}

export const Chat: React.FC<ChatProps> = ({msg, localeTime, notRead}) => {
    return(
        <ChatWrapper>
            {msg}
            <span className="time">{localeTime}</span>
            <span className="not-read">{notRead > 0 ? notRead : ""}</span>
        </ChatWrapper>
    );
}



// 내가 보낸 채팅
export const MyChat:React.FC<ChatProps> = (props) => {
    const { content } = props;
    return(
        <React.Fragment>
            {content? <SeparationBlock content={content}/> : null}
            <RightBlock>
                <div>
                    <Chat {...props} />
                </div>
            </RightBlock>
        </React.Fragment>
    )
}

// 다른 사람이 보낸 채팅 
export const FriendChat:React.FC<ChatProps> = (props) => {
    return (
        <LeftBlock>
            <div>
                <Chat {...props} />
            </div>
        </LeftBlock>
    )
}

// 다른 사람이 보냈으며, 프로필 사진을 포함하는 채팅
export const FriendChatWithThumbnail: React.FC<FriendChatProps> = (props) => {
    const {user, content} = props
    return(
        <React.Fragment>
            {content? <SeparationBlock content={content}/> : null}
            <LeftBlock>
                <img src={ BASE_IMG_URL } alt="thumbnail"/>
                <NameBlock>{user.name}</NameBlock>
                <div>
                    <Chat {...props} />
                </div>
            </LeftBlock>
        </React.Fragment>
    )
}





// 다른 사람이 보낸 채팅 
export const PartsChat:React.FC<ChatProps> = (props) => {
    return (
        <LeftBlock>
            <div>
                <PartChat {...props} />
            </div>
        </LeftBlock>
    )
}

// 다른 사람이 보냈으며, 프로필 사진을 포함하는 채팅
export const PartsChatWithThumbnail: React.FC<FriendChatProps> = (props) => {
    const {user, content} = props
    return(
        <React.Fragment>
            {content? <SeparationBlock content={content}/> : null}
            <LeftBlock>
                <img src={ BASE_IMG_URL } alt="thumbnail"/>
                <NameBlock>{user.name}</NameBlock>
                <div>
                    <PartChat {...props} />
                </div>
            </LeftBlock>
        </React.Fragment>
    )
}

