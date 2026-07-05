interface postCardType{
    title: string,
    body: string,
    picture: File|null
}

interface postCardProfileType extends postCardType{
    name:string,
    middle_name: string|null,
    surname: string
}

interface postsResponse{
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

interface postResponseProp{
    post:postsResponse
}

export type {postCardType, postCardProfileType, postsResponse, postResponseProp}