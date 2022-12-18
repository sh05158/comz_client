import axios from 'axios';
import { ApiResponse } from '~/types/base';
import { API_HOST } from '~/constants';
import { CreateRoomRequest, CreateRoomResponse, RoomListResponse, FetchChattingRequest, ChattingResponseDto, initRoomResponse } from '~/types/chatting';


// 채팅방 입장 시, 채팅방 정보를 얻음
export const initRoom = async() => {
    const room:ApiResponse<initRoomResponse> = await axios.get(`${API_HOST}/chat/userID/?format=json`);


    console.log(room);

    return room.data;
}

// 채팅방 입장 시, 채팅방 정보를 얻음
export const sendChat = async(param:any) => {
    const res:ApiResponse<any> = await axios.post(`${API_HOST}/chat/chat/`,{
        "user_id" : param.user_id,
        "content" : param.content,

    });


    console.log("sendChat result : ",res);


    // if(Array.isArray(res.data)){
    //     let returnData = res.data[res.data.length-1];
    //     returnData.id = res.data.length;
    //     returnData.createdAt = new Date(returnData.created_at);
    //     return returnData;
    // }

    return res.data;
}



// 채팅방 입장 시, 채팅방 정보를 얻음
export const createRoom = async(param: CreateRoomRequest) => {
    const room:ApiResponse<CreateRoomResponse> = await axios.post(`${API_HOST}/chat/room/create`, param);

    return room.data.data;
}

// 현재 채팅방 목록을 가져옴
export const fetchRoomList = async(userId: number) => {
    const roomList: ApiResponse<Array<RoomListResponse>> = await axios.get(`${API_HOST}/chat/roomList/${userId}`);
    
    return roomList.data.data;
}

// 채팅방의 채팅 데이터를 가져옴
export const fetchChatting = async(param: FetchChattingRequest) => {
    const {room_id, cursor} = param;
    const chatting: ApiResponse<Array<ChattingResponseDto>> = await axios.get(`${API_HOST}/chat/room?room_id=${room_id}&cursor=${cursor}`);

    return chatting.data.data;
}