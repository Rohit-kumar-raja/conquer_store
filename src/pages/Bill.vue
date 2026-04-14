<script setup lang="ts">
import { ref, computed } from 'vue';
import BillHeader from '../components/bill/BillHeader.vue';
import BillUserSelect from '../components/bill/BillUserSelect.vue';
import BillItemList from '../components/bill/BillItemList.vue';
import BillOffers from '../components/bill/BillOffers.vue';
import BillSummary from '../components/bill/BillSummary.vue';

const items = ref([
    {
        id: 1,
        name: "Studio Pro Wireless",
        sku: "HD-900",
        price: 12499.00,
        qty: 1,
        image: "https://picsum.photos/seed/audio/200/200"
    },
    {
        id: 2,
        name: "Lunar Edition X",
        sku: "WT-42",
        price: 8950.00,
        qty: 2,
        image: "https://picsum.photos/seed/watch2/200/200"
    },
    {
        id: 3,
        name: 'UltraTab 12.9"',
        sku: "TB-12P",
        price: 44200.00,
        qty: 1,
        image: "https://picsum.photos/seed/tablet/200/200"
    }
]);

const users = ref([
    { name: "Walk-in Customer", phone: "+91 00000 00000", id: "gen-01" },
    { name: "Raaj Philips", phone: "+91 98765 43210", id: "cus-01" },
    { name: "Sanjana Sharma", phone: "+91 88888 77777", id: "cus-02" },
    { name: "Aditya Verma", phone: "+91 77777 66666", id: "cus-03" },
    { name: "Vikram Singh", phone: "+91 91234 56789", id: "cus-04" },
]);

const selectedUser = ref(users.value[0]);

const updateQty = (id: number, newQty: number) => {
    const item = items.value.find(i => i.id === id);
    if (item) {
        item.qty = newQty;
    }
};

const removeItem = (id: number) => {
    items.value = items.value.filter(i => i.id !== id);
};

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val);
};

const subtotal = computed(() => items.value.reduce((acc, item) => acc + item.price * item.qty, 0));
const gst = computed(() => subtotal.value * 0.18);
const total = computed(() => subtotal.value + gst.value);


</script>

<template>
    <div class="px-6 pt-6 space-y-8 pb-32">
        <BillHeader invoice-number="#INVOICE-001" />

        <BillUserSelect v-model="selectedUser" :users="users" />

        <BillItemList :items="items" :format-currency="formatCurrency" @update-qty="updateQty"
            @remove-item="removeItem" />

        <BillOffers />

        <BillSummary :subtotal="subtotal" :gst="gst" :total="total" :format-currency="formatCurrency" />
    </div>
</template>

<style scoped></style>
