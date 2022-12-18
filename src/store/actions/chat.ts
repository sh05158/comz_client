import { CreateRoomRequest, ChattingResponseDto, FetchChattingRequest, ChangeChattingRoomDto, SendChatRequest } from '~/types/chatting';

export enum ChatTypes {
    ADD_CHAT = "chat/ADD_CHAT",
    SEND_CHAT = "chat/SEND_CHAT",
    RECEIVE_CHAT = "chat/RECEIVE_CHAT",
    SHOW_CHATTING_ROOM = "chat/SHOW_CHATTING_ROOM",
    HIDE_CHATTING_ROOM = "chat/HIDE_CHATTING_ROOM",
    CHANGE_CHATTING_ROOM_INFO = "chat/CHANGE_CHATTING_ROOM_INFO",
    ADD_CHATTING = "chat/ADD_CHATTING",
    CHANGE_PROGRESS = "chat/CHANGE_PROGRESS",
    READ_CHATTING = "chat/READ_CHATTING",
    FETCH_CHATTING_REQUEST= 'chat/FETCH_CHATTING_REQUEST',
    FETCH_CHATTING_SUCCESS= 'chat/FETCH_CHATTING_SUCCESS',
    FETCH_CHATTING_FAILUER= 'chat/FETCH_CHATTING_FAILUER',



}

export interface ShowChattingRoomAction {
    type: ChatTypes.SHOW_CHATTING_ROOM;
    payload: CreateRoomRequest;
}

export interface HideChattingRoomAction {
    type: ChatTypes.HIDE_CHATTING_ROOM;
}

export interface ChangeChattingRoomInfoAction {
    type: ChatTypes.CHANGE_CHATTING_ROOM_INFO;
    payload: ChangeChattingRoomDto;
}

export interface AddChattingAction {
    type: ChatTypes.ADD_CHATTING;
    payload: ChattingResponseDto;
}

export interface ReceiveChatAction {
    type: ChatTypes.RECEIVE_CHAT;
    payload: ChattingResponseDto;
}

export interface AddChatAction {
    type: ChatTypes.ADD_CHAT;
    payload: SendChatRequest;
}

export interface ChangeProgressAction {
    type: ChatTypes.CHANGE_PROGRESS;
    payload: SendChatRequest;
}


export interface ReadChattingAction {
    type: ChatTypes.READ_CHATTING;
    payload: Array<number>;
}

export interface FetchChattingAction {
    type: ChatTypes.FETCH_CHATTING_REQUEST;
    payload: FetchChattingRequest;
}

export interface FectchChattingSuccessAction {
    type: ChatTypes.FETCH_CHATTING_SUCCESS;
    payload: Array<ChattingResponseDto>;
}


export type ChatActionTypes = ShowChattingRoomAction
| HideChattingRoomAction
| ChangeChattingRoomInfoAction
| AddChattingAction
| AddChatAction
| ChangeProgressAction
| ReceiveChatAction
| ReadChattingAction
| FetchChattingAction
| FectchChattingSuccessAction


export const showChattingRoom = (param: CreateRoomRequest):ShowChattingRoomAction => ({
    type: ChatTypes.SHOW_CHATTING_ROOM,
    payload: param,
});

export const hideChattingRoom = (): HideChattingRoomAction => ({
    type: ChatTypes.HIDE_CHATTING_ROOM,
});

// 채팅방 이름, 참가자, 마지막으로 읽은 채팅 id 등 채팅방의 정보를 변경
export const changeChattingRoomInfo = (param: ChangeChattingRoomDto): ChangeChattingRoomInfoAction => ({
    type: ChatTypes.CHANGE_CHATTING_ROOM_INFO,
    payload: param
})

// 채팅방에 채팅 추가
export const addChatting = (chat: ChattingResponseDto): AddChattingAction => ({
    type: ChatTypes.ADD_CHATTING,
    payload: chat
});

export const addChat = (chat: any): AddChatAction => ({
    type: ChatTypes.ADD_CHAT,
    payload: chat
});


// 내가 보내는 채팅
export const receiveChat = (chat: ChattingResponseDto): ReceiveChatAction => ({
    type: ChatTypes.RECEIVE_CHAT,
    payload: chat
});


// 채팅방에 채팅 읽음 숫자를 줄임
export const readChatting = (range: Array<number>): ReadChattingAction => ({
    type: ChatTypes.READ_CHATTING,
    payload: range
})

// 서버에서 해당 방의 채팅 가져옴
export const fetchChatting = (param: FetchChattingRequest) => ({
    type: ChatTypes.FETCH_CHATTING_REQUEST,
    payload: param,
})

// 채팅방에 채팅 추가
export const changeProgress = (chat: any): ChangeProgressAction => ({
    type: ChatTypes.CHANGE_PROGRESS,
    payload: chat
});


export const ChatActions = {
    showChattingRoom,
    hideChattingRoom,
    changeChattingRoomInfo,
    addChatting,
    addChat,
    receiveChat,
    readChatting,
    fetchChatting,
    changeProgress
}