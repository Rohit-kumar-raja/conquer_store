<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TrendingUp, DollarSign, Package, Zap } from 'lucide-vue-next';
import { StatCard, SurfaceCard } from './ui';

const emit = defineEmits(['navigate']);

const data = [
    { name: 'Mon', actual: 4000, projected: 4400 },
    { name: 'Tue', actual: 3000, projected: 3200 },
    { name: 'Wed', actual: 2000, projected: 2400 },
    { name: 'Thu', actual: 2780, projected: 2900 },
    { name: 'Fri', actual: 1890, projected: 2100 },
    { name: 'Sat', actual: 2390, projected: 2500 },
    { name: 'Sun', actual: 3490, projected: 3800 },
];
const maxProjected = Math.max(...data.map(d => d.projected));

const getLegendClass = (color: string) => {
    return "w-3 h-3 rounded-full " + color;
};

const getCategoryClass = (color: string) => {
    return "p-5 border-l-4 shadow-sm " + color;
};

const showChart = ref(false);
onMounted(() => {
    setTimeout(() => showChart.value = true, 50);
});
</script>

<template>
    <div class="px-6 pt-6 space-y-8">
        <section>
            <h2 class="text-3xl font-extrabold tracking-tight text-on-surface leading-tight">Reports</h2>
            <p class="text-on-surface-variant">AI-driven insights for the last 7 days.</p>
        </section>

        <!-- Top Cards -->
        <div class="grid grid-cols-1 gap-4">
            <StatCard label="Top Selling Product" value="432 Units" trend="+12%" trendLabel="Quantum Wireless">
                <template #icon>
                    <TrendingUp class="w-8 h-8" />
                </template>
            </StatCard>

            <StatCard label="Avg Transaction Value" value="$142.50" trend="OPTIMAL" trendLabel="Target: $135.00">
                <template #icon>
                    <DollarSign class="w-8 h-8" />
                </template>
            </StatCard>

            <SurfaceCard class="primary-gradient p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-10">
                    <Zap class="w-24 h-24" />
                </div>
                <p class="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Total Revenue (7d)</p>
                <h3 class="text-3xl font-extrabold mb-4">$24,908.12</h3>
                <div class="flex items-center gap-2 text-xs font-medium">
                    <Zap class="w-4 h-4" />
                    Predicted +4% growth next week
                </div>
            </SurfaceCard>
        </div>

        <!-- Charts Section -->
        <div class="space-y-6">
            <SurfaceCard class="p-8" variant="low">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h4 class="text-xl font-bold text-on-surface">Revenue Velocity</h4>
                        <p class="text-sm text-on-surface-variant">Daily performance tracking</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <div :class="getLegendClass('bg-primary')" />
                            <span
                                class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Actual</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div :class="getLegendClass('bg-surface-container-highest')" />
                            <span
                                class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Projected</span>
                        </div>
                    </div>
                </div>

                <div
                    class="h-64 w-full flex items-end justify-between border-b border-surface-container-highest border-dashed pb-2">
                    <!-- Custom CSS Bar Chart -->
                    <div v-for="item in data" :key="item.name"
                        class="flex flex-col items-center flex-1 gap-2 h-full justify-end group">
                        <div class="relative w-8 max-w-full h-full flex items-end">
                            <!-- Projected Bar -->
                            <div class="absolute bottom-0 w-full bg-[#dae2fd] rounded-t transition-all duration-1000"
                                :style="{ height: showChart ? `${(item.projected / maxProjected) * 100}%` : '0%' }">
                            </div>
                            <!-- Actual Bar -->
                            <div class="absolute bottom-0 w-full bg-[#24389c] rounded-t transition-all duration-1000 delay-100"
                                :style="{ height: showChart ? `${(item.actual / maxProjected) * 100}%` : '0%' }"></div>
                            <!-- Tooltip -->
                            <div
                                class="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface shadow-xl border-none rounded-xl px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none text-center min-w-max">
                                <p class="text-[10px] font-bold text-on-surface-variant">{{ item.name }}</p>
                                <p class="font-bold text-primary">${{ item.actual }}</p>
                            </div>
                        </div>
                        <span class="text-[10px] font-bold text-[#454652]">{{ item.name }}</span>
                    </div>
                </div>
            </SurfaceCard>

            <div class="space-y-4">
                <SurfaceCard variant="low" class="p-6 flex flex-col justify-between h-full">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="p-2 bg-tertiary/10 rounded-xl text-tertiary">
                            <Package class="w-5 h-5" />
                        </div>
                        <h4 class="font-bold text-on-surface">Low Stock Alert</h4>
                    </div>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-medium text-on-surface-variant">Cloud Router X1</span>
                            <span class="text-sm font-bold text-tertiary">4 left</span>
                        </div>
                        <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                            <div class="h-full bg-tertiary rounded-full transition-all duration-1000"
                                :style="{ width: showChart ? '20%' : '0%' }" />
                        </div>
                        <button
                            class="w-full py-3 bg-surface-container-high rounded-xl text-xs font-bold hover:bg-surface-container-highest transition-all">
                            Restock Now
                        </button>
                    </div>
                </SurfaceCard>
            </div>
        </div>

        <!-- Category Distribution -->
        <section class="space-y-6">
            <div class="flex items-center justify-between">
                <h4 class="text-xl font-bold text-on-surface">Category Distribution</h4>
                <button class="text-primary text-sm font-bold hover:underline">Download CSV</button>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <SurfaceCard variant="lowest" :class="getCategoryClass('border-primary')">
                    <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Audio</p>
                    <p class="text-2xl font-extrabold text-on-surface">35%</p>
                </SurfaceCard>

                <SurfaceCard variant="lowest" :class="getCategoryClass('border-secondary')">
                    <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Accessories
                    </p>
                    <p class="text-2xl font-extrabold text-on-surface">24%</p>
                </SurfaceCard>

                <SurfaceCard variant="lowest" :class="getCategoryClass('border-tertiary')">
                    <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Smart Home
                    </p>
                    <p class="text-2xl font-extrabold text-on-surface">19%</p>
                </SurfaceCard>

                <SurfaceCard variant="lowest" :class="getCategoryClass('border-on-surface-variant')">
                    <p class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Others</p>
                    <p class="text-2xl font-extrabold text-on-surface">22%</p>
                </SurfaceCard>
            </div>
        </section>
    </div>
</template>
