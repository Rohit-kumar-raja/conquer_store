import { apiRequest } from './apiClient';
import type { OwnerProfile, OwnerProfileUpdate } from '../types/owner';

export const ownerApi = {
    getProfile: () => apiRequest<OwnerProfile>('/owner/profile'),
    updateProfile: (data: OwnerProfileUpdate) =>
        apiRequest<OwnerProfile>('/owner/profile', {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),
    uploadAvatar: (file: File) => {
        const body = new FormData();
        body.append('file', file);
        return apiRequest<OwnerProfile>('/owner/profile/avatar', {
            method: 'POST',
            body,
        });
    },
};
