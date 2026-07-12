interface MiniUser {
    id: string,
    picture: null|string,
    name: string,
    surname: string,
    middle_name: null|string
}
type LoadingProps = {
    show: boolean;
    message?: string;
};

export type {MiniUser,LoadingProps}