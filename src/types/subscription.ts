export interface SubscriptionPlan {
    id: string;
    name: string;
    code: string;
    description: string | null;
    monthly_price: number;
    yearly_price: number;
    max_stores: number | null;
    max_staff: number | null;
    max_bills_per_month: number | null;
    features: string[];
    is_featured: boolean;
}

export interface OwnerSubscription {
    id: string;
    billing_cycle: 'monthly' | 'yearly';
    status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'expired';
    starts_at: string;
    ends_at: string | null;
    auto_renew: boolean;
    plan: SubscriptionPlan;
}

export interface SubscriptionUsage {
    stores: number;
    staff: number;
    bills: number;
}

export interface SubscriptionOverview {
    subscription: OwnerSubscription | null;
    usage: SubscriptionUsage;
}
