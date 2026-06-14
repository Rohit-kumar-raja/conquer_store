const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '');
const API_ORIGIN = API_BASE_URL.replace(/\/api$/, '');

export const resolveApiAssetUrl = (path?: string | null): string => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
};

interface ApiErrorBody {
    detail?: string;
    message?: string;
}

export const getActiveStoreId = (): string => {
    const storeId = localStorage.getItem('cnq_active_store_id');
    if (!storeId) {
        throw new Error('No store is selected for this account.');
    }
    return storeId;
};

export const apiRequest = async <T>(
    path: string,
    options: RequestInit = {},
    authenticated = true
): Promise<T> => {
    const headers = new Headers(options.headers);
    if (options.body && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    if (authenticated) {
        const token = localStorage.getItem('cnq_token');
        if (!token) throw new Error('Please sign in again.');
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        let body: ApiErrorBody = {};
        try {
            body = await response.json();
        } catch {
            // The status text is used below when the response has no JSON body.
        }
        throw new Error(body.detail || body.message || response.statusText || 'API request failed');
    }

    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
};
