export interface OwnerProfile {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    avatar: string | null;
    user_type: string;
    is_verified: boolean;
}

export interface OwnerProfileUpdate {
    email?: string;
    first_name?: string;
    last_name?: string;
}
