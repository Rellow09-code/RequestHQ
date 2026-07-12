interface PostCard{
    title: string,
    body: string,
    picture: File|null
}

interface PostCardProfile extends PostCard{
    name:string,
    middle_name: string|null,
    surname: string
}

interface PostsResponse{
    body: string,
    created_at: string,
    id: string,
    middle_name: string|null,
    name: string,
    post_picture: null|string,
    picture: null|string,
    surname: string,
    title: string,
    user_id: string,
}

interface PostResponseProp{
    post:PostsResponse
}

interface Chat{
    id : string,
    name: string,
    middle_name: string|null,
    surname: string|null
    picture: string|null,
    is_group: boolean,
    created_at: Date,
    updated_at: Date,
    user_id:string
}

interface ChatProp{
    chat: Chat|null,
    chat_message_map:ChatMessageMap
}

interface MessageProps {
    body: string;
    time: string;
    mine: boolean;
}

interface Message{
    id:string,
    chat_id:string,
    user_id:string,
    body:string,
    created_at:string,
    name:string,
    surname:string,
    middle_name:string,
    updated_at:string,
    picture:string
}
type ChatMessageMap = Record<string,Message[]>

export type {
    PostCard, PostCardProfile, PostsResponse, PostResponseProp,
    Chat, ChatProp, MessageProps, Message, ChatMessageMap
}