import { apiRequest } from './apiClient';
import type {
    SubscriptionOverview,
    SubscriptionPlan,
} from '../types/subscription';

interface Envelope<T> {
    data: T;
}

export const subscriptionApi = {
    getPlans: async (): Promise<SubscriptionPlan[]> =>
        (await apiRequest<Envelope<SubscriptionPlan[]>>('/subscriptions/plans')).data,
    getOverview: async (): Promise<SubscriptionOverview> =>
        (await apiRequest<Envelope<SubscriptionOverview>>('/subscriptions/me')).data,
    changePlan: (planId: string, billingCycle: 'monthly' | 'yearly') =>
        apiRequest<{ message: string }>('/subscriptions/me', {
            method: 'PUT',
            body: JSON.stringify({ plan_id: planId, billing_cycle: billingCycle }),
        }),
};
