<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BillHeader from '../components/bill/BillHeader.vue';
import BillUserSelect from '../components/bill/BillUserSelect.vue';
import BillItemList from '../components/bill/BillItemList.vue';
import BillOffers from '../components/bill/BillOffers.vue';
import BillSummary from '../components/bill/BillSummary.vue';
import { billService, type BillItem, type PaymentMethod } from '../services/billService';

const router = useRouter();
const items = ref<BillItem[]>([]);

const users = ref([
    { name: "Walk-in Customer", phone: "+91 00000 00000", id: "gen-01" },
    { name: "Raaj Philips", phone: "+91 98765 43210", id: "cus-01" },
    { name: "Sanjana Sharma", phone: "+91 88888 77777", id: "cus-02" },
    { name: "Aditya Verma", phone: "+91 77777 66666", id: "cus-03" },
    { name: "Vikram Singh", phone: "+91 91234 56789", id: "cus-04" },
]);

const selectedUser = ref(users.value[0]);
const paymentMethod = ref<PaymentMethod | null>(null);

type BillUser = typeof users.value[number];

const loadBillItems = async () => {
    items.value = await billService.getDraftItems();
};

const updateQty = async (id: number, newQty: number) => {
    const item = items.value.find(i => i.id === id);
    if (item) {
        items.value = await billService.updateDraftItemQty(id, newQty);
    }
};

const removeItem = async (id: number) => {
    items.value = await billService.removeDraftItem(id);
};

const createUser = (user: BillUser) => {
    users.value = [user, ...users.value];
    selectedUser.value = user;
};

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val);
};

const subtotal = computed(() => items.value.reduce((acc, item) => acc + item.price * item.qty, 0));
const gst = computed(() => subtotal.value * 0.18);
const total = computed(() => subtotal.value + gst.value);

const finalizeBill = async () => {
    if (!paymentMethod.value) return;

    const bill = await billService.finalizeDraft(selectedUser.value, paymentMethod.value);
    if (!bill) return;

    items.value = [];
    router.push({ name: 'bill-history' });
};

onMounted(async () => {
    await loadBillItems();
});

</script>

<template>
    <div class="px-5 pt-2 space-y-4 pb-40 max-w-md mx-auto">
        <BillHeader invoice-number="#INVOICE-001" />

        <BillUserSelect v-model="selectedUser" :users="users" @create-user="createUser" />

        <BillItemList :items="items" :format-currency="formatCurrency" @update-qty="updateQty"
            @remove-item="removeItem" />

        <BillOffers v-if="items.length" />

        <BillSummary :subtotal="subtotal" :gst="gst" :total="total" :format-currency="formatCurrency"
            v-model:payment-method="paymentMethod" @finalize="finalizeBill" />
    </div>
</template>

<style scoped></style>
