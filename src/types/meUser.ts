
export type MeUser = {
    uuid: string;
    name: string;
    email: string;
    is_blocked: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_login: string;
    deleted_at: string | null;
};
