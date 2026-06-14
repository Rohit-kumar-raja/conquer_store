import { apiRequest } from './apiClient';

export interface BackendStore {
    id: string;
    name: string;
    code: string;
    city?: string | null;
    is_default: boolean;
}

interface FirebaseExchangeResponse {
    access_token: string;
    token_type: string;
    is_new_user: boolean;
    user: {
        id: string;
        name: string;
        phone: string | null;
    };
    stores: BackendStore[];
}

export const exchangeFirebaseToken = (
    idToken: string,
    registration?: { name: string; businessName?: string }
) =>
    apiRequest<FirebaseExchangeResponse>(
        '/auth/firebase',
        {
            method: 'POST',
            body: JSON.stringify({
                id_token: idToken,
                name: registration?.name,
                business_name: registration?.businessName,
            }),
        },
        false
    );
