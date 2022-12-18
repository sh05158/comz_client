import React, { Component } from 'react';
import styled from 'styled-components';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Header, Content, Footer } from '~/components/chattingRoom';
import { Portal } from '~/pages/Modal';
import { RootState } from '~/store/reducers';
import { ChatActions } from '~/store/actions/chat';
import { ProfileActions } from '~/store/actions/profile';
import { UserActions } from '~/store/actions/user';
// import {
//     SendChatRequest
// } from '~/types/chatting';
import { initRoom, sendChat } from '~/apis/chat';
// import { AddFriendRequestDto } from '~/types/friend';
// import { UserResponseDto } from '~/types/user';
// import { addFriendRequest } from '~/apis/friend';
// import { NotFriendWarning } from '~/components/chattingRoom/InfoBlock';


const Wrapper = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 99;
    width: 100%;
    height: 100vh;
    background: #b2c7d9;
`;

interface Props {
    rootState: RootState;
    chatActions: typeof ChatActions;
    profileActions: typeof ProfileActions;
    userActions: typeof UserActions;
}

// let prevScrollHeight = 0;

class ChattingRoomContainer extends Component<Props> {
    messageRef: React.RefObject<HTMLDivElement>;
    user_id:'';
    id:1;
    state = {
        isShowDownBtn: false,
        sendUserId: undefined,
        msg: ""
    }
    constructor(props: Props) {
        super(props);
        // 채팅방 채팅 영역을 나타냅니다.
        this.messageRef = React.createRef<HTMLDivElement>();
        this.user_id = '';
        this.id = 1;

        // const userState = props.rootState.user;
        // const chatState = props.rootState.chat;
        // const roomList = userState.room_list;
        // const findRoom = roomList.find(room => room.identifier === chatState.identifier);
        // const participant = chatState.participant;

        // const { changeChattingRoomInfo, fetchChatting } = props.chatActions;
        // // 채팅방 목록에서 해당 방의 정보를 찾습니다
        // if (findRoom) {
        //     const { updateRoomList } = props.userActions;
        //     // 해당 채팅방의 모든 채팅을 읽었다고 표시합니다.
        //     const updateRoomObj: UpdateRoomListDto = {
        //         room_id: findRoom.room_id,
        //         not_read_chat: 0
        //     }
        //     updateRoomList(updateRoomObj);
        //     const roomObj: ChangeChattingRoomDto = {
        //         ...findRoom,
        //         participant,
                
        //     }
        //     changeChattingRoomInfo(roomObj);
        //     // 서버에서 해당 채팅방의 채팅 목록을 가져옵니다.
        //     fetchChatting({
        //         room_id: findRoom.room_id,
        //         cursor: null,
        //     });
        // }
        // // 없다면 서버에 채팅방을 만들게 요청하고, 만들어진 채팅방의 정보를 얻습니다.
        // else {
        const { addChat } = this.props.chatActions;
        initRoom().then(data => {
            this.user_id = data['user_id'];



            console.log(this.user_id);

            const send: any = {
                user_id : this.user_id,
                content:"안녕하세요 컴즈입니다.\n원하시는 컴퓨터를 말씀해주세요.\n하고 싶으신 게임 이름과 생각하시는 예산을 말씀해주시면 됩니다!",
                createdAt : new Date(),
                isMine : false,
                id : this.id+=1
            }

            addChat(send);
        });
        // }
    }

   

    // 채팅방에서 친구를 추가하거나 이름을 바꾸는 등의 action을 취하면, 채팅방의 참가자 정보를 바꿉니다.
    updateFriendList = (prevProps: Props) => {
        const prevFriendList = prevProps.rootState.user.friends_list;
        const currentFriendList = this.props.rootState.user.friends_list;
        if (prevFriendList !== currentFriendList) {
            const chatState = this.props.rootState.chat;
            const { changeChattingRoomInfo } = this.props.chatActions;
            const participants = chatState.participant.map(participant => {
                const find = currentFriendList.find(friend => friend.id === participant.id);
                return find || participant;
            });
            changeChattingRoomInfo({ participant: participants })
        }
    }


    // 스크롤을 가장 아래로 내립니다.
    pageDown = () => {
        const messageRef = this.messageRef.current!
        messageRef.scrollTop = messageRef.scrollHeight;
    }

    render() {
        const userState = this.props.rootState.user;
        const chatState = this.props.rootState.chat;
        // const authState = this.props.rootState.auth;
        // const roomName = chatState.room_name || chatState.participant[0].name || "test";
        // const isMe = chatState.participant[0].id === userState.id;
        // const isGroup = chatState.type === "group";
        const roomName = "컴즈";
        // const isMe = false;
        // const isGroup = chatState.type === "group";
        const { hideChattingRoom, addChat } = this.props.chatActions;
        const { showProfile } = this.props.profileActions;
        
        const onChatSumbmit = (msg: string, cb?:Function) => {
            const send: any = {
                user_id : this.user_id,
                content:msg,
                createdAt : new Date(),
                isMine : true,
                id : this.id+=2
            }

            addChat(send);
            
            let self = this;
            setTimeout(function(){
                self.pageDown();

            },100)
            // 채팅방 참여자들에게 해당 메시지를 보냅니다.
            // authState.socket?.emit('message', chattingRequset);

            sendChat(send).then(data => {
                console.log("add Chat data!",data);
                if(Array.isArray(data)){
                    data.forEach(element => {
                        element.createdAt = new Date(element.created_at);
                        addChat(element);
                        cb && cb(element);
                    });
                }
                this.pageDown();
    
            });
        }

        // const isFriend: boolean = isGroup || isMe 
        // || !!userState.friends_list.find(friend => friend.id === chatState.participant[0].id); 


        // const onAddFriendClick = async(friend: UserResponseDto) => {
        //     const my_id = userState.id;
        //     const friend_id = friend.id;
        //     const friend_name = friend.name;
        //     const { addFriend } = this.props.userActions;
        //     const request: AddFriendRequestDto = { my_id, friend_id, friend_name };
        //     try {
        //         await addFriendRequest(request);
        //         await addFriend(friend);
        //     }catch(err) {
        //         alert("친구 추가 실패");
        //     }
        // }

        const contentProps = {
            myId: userState.id,
            participant: chatState.participant,
            chattingList: chatState.chatting,
            messageRef: this.messageRef,
            showProfile,
        }
        // const renderNotification = () => {
        //     if(!!this.state.sendUserId){
        //         const findSendUser = chatState.participant.find(person => person.id === this.state.sendUserId);
        //         return <MessageNotification user={findSendUser} msg={this.state.msg} onDownClick={this.pageDown}/>
        //     }
        //     return this.state.isShowDownBtn ? <DownBtn onDownClick={this.pageDown}/> : null;
        // }
        return (
            <Portal>
                <Wrapper>
                    <Header room_name={roomName} hideRoom={hideChattingRoom} />
                    <Content {...contentProps}>
                        {/* {true ? null : <NotFriendWarning onAddFriendClick={() => onAddFriendClick(chatState.participant[0])}/>} */}
                        {/* {renderNotification()} */}
                    </Content>
                    <Footer onChatSumbmit={onChatSumbmit} />
                </Wrapper>
            </Portal>
        )
    }
}

const mapStateToProps = (state: RootState) => ({
    rootState: state,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    chatActions: bindActionCreators(ChatActions, dispatch),
    profileActions: bindActionCreators(ProfileActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
})


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChattingRoomContainer);


