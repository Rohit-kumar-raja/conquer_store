<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import {
    CalendarClock, CheckCircle2, CreditCard, Crown, IndianRupee,
    LoaderCircle, Star, Store, Users, Zap
} from 'lucide-vue-next';
import { SurfaceCard, Button } from '../components';
import { subscriptionApi } from '../services/subscriptionApi';
import type {
    SubscriptionOverview,
    SubscriptionPlan,
} from '../types/subscription';

const toast = useToast();
const plans = ref<SubscriptionPlan[]>([]);
const overview = ref<SubscriptionOverview | null>(null);
const loading = ref(true);
const changingPlanId = ref('');
const billingCycle = ref<'monthly' | 'yearly'>('monthly');

const currentSubscription = computed(() => overview.value?.subscription || null);
const currentPlan = computed(() => currentSubscription.value?.plan || null);
const usage = computed(() => overview.value?.usage || { stores: 0, staff: 0, bills: 0 });
const priceFor = (plan: SubscriptionPlan) => billingCycle.value === 'yearly' ? plan.yearly_price : plan.monthly_price;
const limitText = (value: number | null) => value === null ? 'Unlimited' : value.toLocaleString('en-IN');
const usageText = (used: number, limit: number | null) => `${used} / ${limitText(limit)}`;
const usagePercent = computed(() => {
    const plan = currentPlan.value;
    if (!plan) return 0;
    const percentages = [
        plan.max_stores ? usage.value.stores / plan.max_stores : 0,
        plan.max_staff ? usage.value.staff / plan.max_staff : 0,
        plan.max_bills_per_month ? usage.value.bills / plan.max_bills_per_month : 0,
    ];
    return Math.min(100, Math.round(Math.max(...percentages) * 100));
});
const renewalDate = computed(() => currentSubscription.value?.ends_at
    ? new Date(currentSubscription.value.ends_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'No renewal date');

const planIcon = (plan: SubscriptionPlan) => {
    if (plan.code.includes('platinum')) return Zap;
    if (plan.is_featured || plan.code.includes('gold')) return Crown;
    return Star;
};
const planTone = (plan: SubscriptionPlan) => currentPlan.value?.id === plan.id
    ? 'border-primary/30 bg-primary/5 ring-2 ring-primary/15'
    : plan.is_featured ? 'border-tertiary/30 bg-tertiary/5' : 'border-surface-container-high bg-surface-container-low';

const loadSubscription = async () => {
    loading.value = true;
    try {
        [plans.value, overview.value] = await Promise.all([
            subscriptionApi.getPlans(),
            subscriptionApi.getOverview(),
        ]);
        billingCycle.value = overview.value.subscription?.billing_cycle || 'monthly';
    } catch (cause) {
        toast.add({ severity: 'error', summary: 'Subscription Error', detail: cause instanceof Error ? cause.message : 'Unable to load plans.', life: 3500 });
    } finally {
        loading.value = false;
    }
};

const changePlan = async (plan: SubscriptionPlan) => {
    if (currentPlan.value?.id === plan.id || changingPlanId.value) return;
    changingPlanId.value = plan.id;
    try {
        await subscriptionApi.changePlan(plan.id, billingCycle.value);
        await loadSubscription();
        toast.add({ severity: 'success', summary: 'Plan Updated', detail: `You are now on ${plan.name}.`, life: 3000 });
    } catch (cause) {
        toast.add({ severity: 'error', summary: 'Plan Change Failed', detail: cause instanceof Error ? cause.message : 'Unable to change plan.', life: 3500 });
    } finally {
        changingPlanId.value = '';
    }
};

onMounted(loadSubscription);
</script>

<template>
    <div class="px-5 pt-2 space-y-6 pb-40 max-w-md mx-auto">
        <div v-if="loading" class="min-h-[55vh] flex flex-col items-center justify-center gap-3 text-primary">
            <LoaderCircle class="w-7 h-7 animate-spin" />
            <p class="text-xs font-black uppercase tracking-wider">Loading subscription</p>
        </div>

        <template v-else>
            <section class="space-y-4">
                <div class="flex items-end justify-between gap-3">
                    <div>
                        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">Subscription</p>
                        <h2 class="text-3xl font-black tracking-tighter text-on-surface leading-tight mt-1">Plan & Billing</h2>
                    </div>
                    <div class="flex bg-surface-container-high rounded-xl p-1 text-[9px] font-black uppercase">
                        <button v-for="cycle in (['monthly', 'yearly'] as const)" :key="cycle" @click="billingCycle = cycle"
                            :class="['px-3 py-2 rounded-lg transition-all', billingCycle === cycle ? 'bg-primary text-white' : 'text-on-surface-variant']">
                            {{ cycle }}
                        </button>
                    </div>
                </div>

                <SurfaceCard v-if="currentPlan" class="p-6 rounded-4xl bg-primary-gradient text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                    <div class="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-white/10"></div>
                    <div class="relative z-10 space-y-5">
                        <div class="flex items-start justify-between">
                            <div>
                                <p class="text-[9px] font-black uppercase tracking-[0.2em] text-white/65">Current Subscription</p>
                                <h3 class="text-3xl font-black tracking-tighter mt-2">{{ currentPlan.name }}</h3>
                                <p class="text-[10px] font-bold text-white/55 uppercase tracking-widest mt-1">
                                    {{ currentSubscription?.billing_cycle }} • {{ currentSubscription?.status }} • renews {{ renewalDate }}
                                </p>
                            </div>
                            <Crown class="w-7 h-7" />
                        </div>
                        <div class="flex items-end">
                            <IndianRupee class="w-7 h-7" />
                            <span class="text-4xl font-black tracking-tighter">{{ priceFor(currentPlan).toLocaleString('en-IN') }}</span>
                            <span class="text-sm font-bold text-white/60 ml-1">/{{ billingCycle === 'yearly' ? 'yr' : 'mo' }}</span>
                        </div>
                        <div>
                            <div class="flex justify-between text-[10px] font-black uppercase tracking-wider text-white/60 mb-2"><span>Highest usage</span><span>{{ usagePercent }}%</span></div>
                            <div class="h-2.5 bg-white/15 rounded-full overflow-hidden"><div class="h-full bg-white rounded-full transition-all" :style="{ width: `${usagePercent}%` }"></div></div>
                        </div>
                    </div>
                </SurfaceCard>

                <SurfaceCard v-else variant="low" class="p-6 rounded-4xl text-center">
                    <CreditCard class="w-8 h-8 text-primary mx-auto" />
                    <h3 class="font-black text-on-surface mt-3">No plan assigned</h3>
                    <p class="text-xs font-bold text-on-surface-variant/50 mt-1">Choose a plan below to activate your subscription.</p>
                </SurfaceCard>
            </section>

            <section v-if="currentPlan" class="grid grid-cols-3 gap-3">
                <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30"><Store class="w-5 h-5 text-primary mb-3" /><h4 class="text-xs font-black text-on-surface">{{ usageText(usage.stores, currentPlan.max_stores) }}</h4><p class="text-[8px] font-black text-on-surface-variant/45 uppercase mt-1">Stores</p></SurfaceCard>
                <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30"><Users class="w-5 h-5 text-secondary mb-3" /><h4 class="text-xs font-black text-on-surface">{{ usageText(usage.staff, currentPlan.max_staff) }}</h4><p class="text-[8px] font-black text-on-surface-variant/45 uppercase mt-1">Staff</p></SurfaceCard>
                <SurfaceCard variant="low" class="p-4 rounded-3xl border border-surface-container-high/30"><CreditCard class="w-5 h-5 text-tertiary mb-3" /><h4 class="text-xs font-black text-on-surface">{{ usageText(usage.bills, currentPlan.max_bills_per_month) }}</h4><p class="text-[8px] font-black text-on-surface-variant/45 uppercase mt-1">Bills</p></SurfaceCard>
            </section>

            <section class="space-y-3">
                <div class="flex items-center justify-between px-1"><h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Choose Plan</h3><span class="text-[9px] font-black text-primary uppercase">{{ billingCycle }}</span></div>
                <div class="space-y-4">
                    <SurfaceCard v-for="plan in plans" :key="plan.id" :class="['p-5 rounded-4xl border', planTone(plan)]">
                        <div class="flex items-start gap-4">
                            <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', currentPlan?.id === plan.id ? 'bg-primary text-white' : 'bg-surface-container-high text-primary']"><component :is="planIcon(plan)" class="w-6 h-6" /></div>
                            <div class="min-w-0 grow"><div class="flex items-center gap-2"><h4 class="text-lg font-black text-on-surface truncate">{{ plan.name }}</h4><span v-if="currentPlan?.id === plan.id" class="text-[8px] font-black uppercase bg-primary text-white px-2 py-1 rounded-lg">Current</span></div><p class="text-xs font-bold text-on-surface-variant/50 mt-1">{{ plan.description }}</p><div class="flex items-end mt-2"><span class="text-3xl font-black text-on-surface">₹{{ priceFor(plan).toLocaleString('en-IN') }}</span><span class="text-xs font-bold text-on-surface-variant/50 mb-1 ml-1">/{{ billingCycle === 'yearly' ? 'yr' : 'mo' }}</span></div></div>
                        </div>
                        <div class="space-y-2 mt-5">
                            <div class="flex items-center gap-3"><CheckCircle2 class="w-4 h-4 text-primary" /><span class="text-xs font-bold text-on-surface-variant">{{ limitText(plan.max_stores) }} stores • {{ limitText(plan.max_staff) }} staff</span></div>
                            <div class="flex items-center gap-3"><CheckCircle2 class="w-4 h-4 text-primary" /><span class="text-xs font-bold text-on-surface-variant">{{ limitText(plan.max_bills_per_month) }} bills per month</span></div>
                            <div v-for="feature in plan.features" :key="feature" class="flex items-center gap-3"><CheckCircle2 class="w-4 h-4 text-primary" /><span class="text-xs font-bold text-on-surface-variant">{{ feature }}</span></div>
                        </div>
                        <Button :variant="currentPlan?.id === plan.id ? 'secondary' : 'primary'" class="w-full mt-5 rounded-2xl font-black" :disabled="currentPlan?.id === plan.id || !!changingPlanId" @click="changePlan(plan)">
                            <LoaderCircle v-if="changingPlanId === plan.id" class="w-4 h-4 animate-spin mr-2" />
                            {{ currentPlan?.id === plan.id ? 'Current Plan' : 'Select Plan' }}
                        </Button>
                    </SurfaceCard>
                </div>
            </section>

            <section v-if="currentSubscription" class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 p-5 flex items-center gap-4">
                <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><CalendarClock class="w-5 h-5" /></div>
                <div><p class="text-sm font-black text-on-surface">{{ currentSubscription.auto_renew ? 'Auto-renew enabled' : 'Auto-renew disabled' }}</p><p class="text-[10px] font-bold text-on-surface-variant/45 mt-0.5">Current period ends {{ renewalDate }}</p></div>
            </section>
        </template>
    </div>
</template>
