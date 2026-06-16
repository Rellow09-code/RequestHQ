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
    id: number,
    middle_name: string|null,
    name: string,
    picture: null,
    surname: string,
    title: string,
    user_id: number,
}

interface postResponseProp{
    post:postsResponse
}

export type {postCardType, postCardProfileType, postsResponse, postResponseProp}