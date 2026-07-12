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
    name: string|null,
    picture: string|null,
    is_group: boolean,
    created_at: Date,
    updated_at: Date
}

interface ChatProp{
    chat: Chat
}

export type {PostCard, PostCardProfile, PostsResponse, PostResponseProp, Chat, ChatProp}