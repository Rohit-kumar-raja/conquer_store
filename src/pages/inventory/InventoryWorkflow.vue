<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
    AlertTriangle,
    ArrowLeft,
    ArchiveX,
    Barcode,
    Boxes,
    CalendarClock,
    Check,
    ChevronRight,
    ClipboardCheck,
    ClipboardList,
    Download,
    FileSpreadsheet,
    History,
    IndianRupee,
    Layers,
    PackageMinus,
    PackagePlus,
    Plus,
    Repeat,
    RotateCcw,
    Save,
    Search,
    SlidersHorizontal,
    Tags,
    Truck,
    Upload
} from 'lucide-vue-next';
import { Button, Select, SurfaceCard } from '../../components';
import { stockInService, type StockInDraft } from '../../services/stockInService';

const route = useRoute();
const router = useRouter();

const icons = {
    stockIn: PackagePlus,
    stockOut: PackageMinus,
    movements: History,
    purchaseOrders: ClipboardList,
    goodsReceived: ClipboardCheck,
    barcodes: Barcode,
    batches: CalendarClock,
    lowStock: AlertTriangle,
    transfers: Repeat,
    stockCount: Check,
    variants: Layers,
    supplierProducts: Truck,
    valuation: IndianRupee,
    deadStock: ArchiveX,
    returns: RotateCcw,
    reorderRules: SlidersHorizontal,
    importExport: FileSpreadsheet
};

type ScreenKey = keyof typeof icons;

interface Stat {
    label: string;
    value: string;
    tone: string;
}

interface Row {
    title: string;
    meta: string;
    value: string;
    status: string;
}

interface Action {
    label: string;
    icon: unknown;
    primary?: boolean;
}

interface Field {
    label: string;
    value: string;
    type?: string;
}

interface ScreenConfig {
    key: ScreenKey;
    title: string;
    subtitle: string;
    primaryAction: string;
    stats: Stat[];
    fields: Field[];
    rows: Row[];
    actions: Action[];
}

const configs: Record<string, ScreenConfig> = {
    'inventory-stock-in': {
        key: 'stockIn',
        title: 'Stock In',
        subtitle: 'Receive new inventory from supplier invoices',
        primaryAction: 'Receive Stock',
        stats: [
            { label: 'Draft Qty', value: '186', tone: 'text-primary' },
            { label: 'PO Linked', value: '3', tone: 'text-secondary' },
            { label: 'Cost Value', value: '₹2.48L', tone: 'text-tertiary' }
        ],
        fields: [
            { label: 'Supplier', value: 'Lumina Tech Logistics' },
            { label: 'Invoice Number', value: 'INV-2026-1184' },
            { label: 'Receiving Date', value: '18 May 2026', type: 'date' },
            { label: 'Product / SKU', value: 'PRC-SW-X1-2024' },
            { label: 'Quantity Received', value: '48', type: 'number' },
            { label: 'Cost Price', value: '189.00', type: 'number' }
        ],
        rows: [
            { title: 'Precision Pro SmartWatch X1', meta: 'Batch WCH-MAY-01', value: '+48 units', status: 'Ready' },
            { title: 'AuraPods Pro Gen 2', meta: 'Invoice INV-2026-1184', value: '+72 units', status: 'Pending QC' }
        ],
        actions: [
            { label: 'Scan Bill', icon: Barcode },
            { label: 'Attach Invoice', icon: Upload },
            { label: 'Save Receipt', icon: Save, primary: true }
        ]
    },
    'inventory-stock-out': {
        key: 'stockOut',
        title: 'Stock Out / Adjustment',
        subtitle: 'Record damage, expiry, shrinkage, or manual correction',
        primaryAction: 'Post Adjustment',
        stats: [
            { label: 'Pending', value: '7', tone: 'text-tertiary' },
            { label: 'Damaged', value: '12', tone: 'text-error' },
            { label: 'Value Impact', value: '₹18.2K', tone: 'text-on-surface' }
        ],
        fields: [
            { label: 'Adjustment Type', value: 'Damage / Loss' },
            { label: 'Product / SKU', value: 'SNB-HD-BLK' },
            { label: 'Quantity', value: '3', type: 'number' },
            { label: 'Reason', value: 'Transit damage' },
            { label: 'Approved By', value: 'Store Manager' }
        ],
        rows: [
            { title: 'Sonic Boom ANC', meta: 'Transit damage', value: '-3 units', status: 'Needs approval' },
            { title: 'Organic Almond Milk', meta: 'Expired batch', value: '-9 units', status: 'Posted' }
        ],
        actions: [
            { label: 'Add Evidence', icon: Upload },
            { label: 'Request Approval', icon: ClipboardCheck },
            { label: 'Post Now', icon: Save, primary: true }
        ]
    },
    'inventory-movements': {
        key: 'movements',
        title: 'Movement History',
        subtitle: 'Audit trail of every stock change',
        primaryAction: 'Export History',
        stats: [
            { label: 'Today', value: '42', tone: 'text-primary' },
            { label: 'Stock In', value: '+312', tone: 'text-secondary' },
            { label: 'Stock Out', value: '-128', tone: 'text-error' }
        ],
        fields: [
            { label: 'Search Product / SKU', value: 'HD-900' },
            { label: 'Movement Type', value: 'All movements' },
            { label: 'Date Range', value: 'Last 30 days' }
        ],
        rows: [
            { title: 'Sale #TX-9021', meta: 'Studio Pro Wireless • Raaj', value: '-1', status: 'Sale' },
            { title: 'Stock receipt', meta: 'Lumina Tech Logistics', value: '+48', status: 'Stock In' },
            { title: 'Manual correction', meta: 'Shelf count mismatch', value: '-2', status: 'Audit' }
        ],
        actions: [
            { label: 'Filter', icon: SlidersHorizontal },
            { label: 'Download CSV', icon: Download, primary: true }
        ]
    },
    'inventory-purchase-orders': {
        key: 'purchaseOrders',
        title: 'Purchase Orders',
        subtitle: 'Create supplier orders before stock arrives',
        primaryAction: 'Create PO',
        stats: [
            { label: 'Open POs', value: '8', tone: 'text-primary' },
            { label: 'Due This Week', value: '3', tone: 'text-tertiary' },
            { label: 'Order Value', value: '₹6.4L', tone: 'text-on-surface' }
        ],
        fields: [
            { label: 'Supplier', value: 'Metro Cash & Carry' },
            { label: 'Expected Date', value: '24 May 2026', type: 'date' },
            { label: 'Product / SKU', value: 'AUD-APP-G2' },
            { label: 'Order Quantity', value: '120', type: 'number' },
            { label: 'Expected Cost', value: '3199.00', type: 'number' }
        ],
        rows: [
            { title: 'PO-2026-0042', meta: 'Metro Cash & Carry • 4 lines', value: '₹3.84L', status: 'Sent' },
            { title: 'PO-2026-0041', meta: 'Reliance Distribution • 7 lines', value: '₹2.12L', status: 'Draft' }
        ],
        actions: [
            { label: 'Add Line Item', icon: Plus },
            { label: 'Send to Supplier', icon: Truck, primary: true }
        ]
    },
    'inventory-goods-received': {
        key: 'goodsReceived',
        title: 'Goods Received',
        subtitle: 'Receive stock against purchase orders',
        primaryAction: 'Confirm GRN',
        stats: [
            { label: 'Awaiting', value: '5', tone: 'text-tertiary' },
            { label: 'Matched', value: '91%', tone: 'text-primary' },
            { label: 'Short Qty', value: '14', tone: 'text-error' }
        ],
        fields: [
            { label: 'Purchase Order', value: 'PO-2026-0042' },
            { label: 'Supplier Invoice', value: 'MC-11892' },
            { label: 'Received By', value: 'Warehouse Lead' },
            { label: 'Inspection Status', value: 'Passed with shortage' }
        ],
        rows: [
            { title: 'AuraPods Pro Gen 2', meta: 'Ordered 120 • Received 116', value: '-4 short', status: 'Short' },
            { title: 'MagSafe Gen 2', meta: 'Ordered 60 • Received 60', value: 'Matched', status: 'Accepted' }
        ],
        actions: [
            { label: 'Scan Cartons', icon: Barcode },
            { label: 'Mark Shortage', icon: AlertTriangle },
            { label: 'Confirm GRN', icon: ClipboardCheck, primary: true }
        ]
    },
    'inventory-barcodes': {
        key: 'barcodes',
        title: 'Barcode & SKU',
        subtitle: 'Manage barcodes, QR codes, alternate SKUs, and labels',
        primaryAction: 'Print Labels',
        stats: [
            { label: 'Mapped', value: '1.2K', tone: 'text-primary' },
            { label: 'Missing', value: '23', tone: 'text-error' },
            { label: 'Labels Queued', value: '84', tone: 'text-secondary' }
        ],
        fields: [
            { label: 'Product / SKU', value: 'PRC-SW-X1-2024' },
            { label: 'Primary Barcode', value: '7501031311309' },
            { label: 'Alternate SKU', value: 'WCH-X1-SLV' },
            { label: 'Label Format', value: '38mm x 25mm' }
        ],
        rows: [
            { title: 'Precision Pro SmartWatch X1', meta: 'GS1-128 • 7501031311309', value: '24 labels', status: 'Ready' },
            { title: 'Cloud Router X1', meta: 'Barcode missing', value: '0 labels', status: 'Fix' }
        ],
        actions: [
            { label: 'Scan Code', icon: Barcode },
            { label: 'Generate QR', icon: Tags },
            { label: 'Print Labels', icon: Download, primary: true }
        ]
    },
    'inventory-batches': {
        key: 'batches',
        title: 'Batch & Expiry',
        subtitle: 'Track expiry dates and batch-level stock',
        primaryAction: 'Add Batch',
        stats: [
            { label: 'Active Batches', value: '76', tone: 'text-primary' },
            { label: 'Expiring Soon', value: '9', tone: 'text-tertiary' },
            { label: 'Expired', value: '2', tone: 'text-error' }
        ],
        fields: [
            { label: 'Product', value: 'Organic Almond Milk (1L)' },
            { label: 'Batch Number', value: 'MLK-MAY-026' },
            { label: 'Manufacturing Date', value: '01 May 2026', type: 'date' },
            { label: 'Expiry Date', value: '29 May 2026', type: 'date' },
            { label: 'Batch Quantity', value: '64', type: 'number' }
        ],
        rows: [
            { title: 'MLK-MAY-026', meta: 'Organic Almond Milk • 11 days left', value: '64 units', status: 'FEFO' },
            { title: 'COS-APR-014', meta: 'Face Serum • 21 days left', value: '18 units', status: 'Watch' }
        ],
        actions: [
            { label: 'Apply FEFO', icon: CalendarClock },
            { label: 'Mark Expired', icon: ArchiveX },
            { label: 'Save Batch', icon: Save, primary: true }
        ]
    },
    'inventory-low-stock': {
        key: 'lowStock',
        title: 'Low Stock Alerts',
        subtitle: 'Products below reorder level',
        primaryAction: 'Create PO',
        stats: [
            { label: 'Critical', value: '12', tone: 'text-error' },
            { label: 'Warning', value: '28', tone: 'text-tertiary' },
            { label: 'Suggested Orders', value: '15', tone: 'text-primary' }
        ],
        fields: [
            { label: 'Alert Severity', value: 'Critical and Warning' },
            { label: 'Supplier', value: 'All suppliers' },
            { label: 'Category', value: 'All categories' }
        ],
        rows: [
            { title: 'Cloud Router X1', meta: 'Min 20 • Current 4', value: 'Order 60', status: 'Critical' },
            { title: 'Sonic Boom ANC', meta: 'Min 30 • Current 11', value: 'Order 80', status: 'Low' },
            { title: 'Organic Almond Milk', meta: 'Min 40 • Current 18', value: 'Order 72', status: 'Low' }
        ],
        actions: [
            { label: 'Notify Supplier', icon: Truck },
            { label: 'Create PO', icon: ClipboardList, primary: true }
        ]
    },
    'inventory-transfers': {
        key: 'transfers',
        title: 'Inventory Transfer',
        subtitle: 'Move stock between shops, branches, or warehouses',
        primaryAction: 'Create Transfer',
        stats: [
            { label: 'In Transit', value: '6', tone: 'text-tertiary' },
            { label: 'Received', value: '18', tone: 'text-primary' },
            { label: 'Pending Qty', value: '244', tone: 'text-secondary' }
        ],
        fields: [
            { label: 'From Location', value: 'Indigo Nexus • Mumbai' },
            { label: 'To Location', value: 'Pulse Point • Delhi' },
            { label: 'Product / SKU', value: 'AUR-WCH-SLV' },
            { label: 'Transfer Quantity', value: '24', type: 'number' },
            { label: 'Courier / Vehicle', value: 'Internal dispatch' }
        ],
        rows: [
            { title: 'TR-2026-018', meta: 'Mumbai to Delhi • 5 lines', value: '86 units', status: 'In transit' },
            { title: 'TR-2026-017', meta: 'Bangalore to Mumbai', value: '32 units', status: 'Received' }
        ],
        actions: [
            { label: 'Scan Dispatch', icon: Barcode },
            { label: 'Receive Transfer', icon: ClipboardCheck },
            { label: 'Create Transfer', icon: Repeat, primary: true }
        ]
    },
    'inventory-stock-count': {
        key: 'stockCount',
        title: 'Stock Count',
        subtitle: 'Physical audit and shelf count reconciliation',
        primaryAction: 'Start Count',
        stats: [
            { label: 'Counted', value: '312', tone: 'text-primary' },
            { label: 'Mismatch', value: '17', tone: 'text-error' },
            { label: 'Progress', value: '64%', tone: 'text-secondary' }
        ],
        fields: [
            { label: 'Count Session', value: 'May Cycle Count' },
            { label: 'Zone / Shelf', value: 'Aisle B • Shelf 04' },
            { label: 'Product / SKU', value: 'HD-900' },
            { label: 'Physical Count', value: '28', type: 'number' },
            { label: 'System Count', value: '31', type: 'number' }
        ],
        rows: [
            { title: 'Studio Pro Wireless', meta: 'System 31 • Physical 28', value: '-3', status: 'Mismatch' },
            { title: 'MagSafe Gen 2', meta: 'System 45 • Physical 45', value: '0', status: 'Matched' }
        ],
        actions: [
            { label: 'Scan Shelf', icon: Barcode },
            { label: 'Approve Variance', icon: ClipboardCheck },
            { label: 'Start Count', icon: Check, primary: true }
        ]
    },
    'inventory-variants': {
        key: 'variants',
        title: 'Product Variants',
        subtitle: 'Manage size, color, storage, model, and pack variants',
        primaryAction: 'Add Variant',
        stats: [
            { label: 'Variant Groups', value: '58', tone: 'text-primary' },
            { label: 'SKUs', value: '482', tone: 'text-secondary' },
            { label: 'Missing Price', value: '11', tone: 'text-error' }
        ],
        fields: [
            { label: 'Parent Product', value: 'X-Watch Series 9' },
            { label: 'Variant Type', value: 'Color / Size' },
            { label: 'Variant Name', value: 'Silver • 42mm' },
            { label: 'Variant SKU', value: 'WCH-X9-SLV-42' },
            { label: 'Variant Price', value: '24999.00', type: 'number' }
        ],
        rows: [
            { title: 'Silver • 42mm', meta: 'WCH-X9-SLV-42', value: '86 units', status: 'Active' },
            { title: 'Black • 46mm', meta: 'WCH-X9-BLK-46', value: '43 units', status: 'Active' }
        ],
        actions: [
            { label: 'Add Option', icon: Plus },
            { label: 'Generate SKUs', icon: Tags },
            { label: 'Save Variant', icon: Save, primary: true }
        ]
    },
    'inventory-supplier-products': {
        key: 'supplierProducts',
        title: 'Supplier Products',
        subtitle: 'Map products to vendors with lead time and supplier cost',
        primaryAction: 'Link Supplier',
        stats: [
            { label: 'Mapped Items', value: '740', tone: 'text-primary' },
            { label: 'Best Cost', value: '216', tone: 'text-secondary' },
            { label: 'No Supplier', value: '34', tone: 'text-error' }
        ],
        fields: [
            { label: 'Product / SKU', value: 'AUD-APP-G2' },
            { label: 'Supplier', value: 'Metro Cash & Carry' },
            { label: 'Supplier SKU', value: 'MCC-AUD-9921' },
            { label: 'Lead Time', value: '4 days' },
            { label: 'Minimum Order Qty', value: '24', type: 'number' },
            { label: 'Supplier Cost', value: '3199.00', type: 'number' }
        ],
        rows: [
            { title: 'AuraPods Pro Gen 2', meta: 'Metro Cash & Carry • 4 days', value: '₹3,199', status: 'Primary' },
            { title: 'AuraPods Pro Gen 2', meta: 'Reliance Distribution • 6 days', value: '₹3,249', status: 'Backup' }
        ],
        actions: [
            { label: 'Compare Cost', icon: IndianRupee },
            { label: 'Link Supplier', icon: Truck, primary: true }
        ]
    },
    'inventory-valuation': {
        key: 'valuation',
        title: 'Inventory Valuation',
        subtitle: 'Stock value, cost, margin, and inventory health',
        primaryAction: 'Export Value',
        stats: [
            { label: 'Stock Value', value: '₹82.4L', tone: 'text-primary' },
            { label: 'Cost Value', value: '₹59.1L', tone: 'text-on-surface' },
            { label: 'Margin', value: '28.3%', tone: 'text-secondary' }
        ],
        fields: [
            { label: 'Valuation Method', value: 'Weighted Average' },
            { label: 'Category', value: 'All categories' },
            { label: 'Store', value: 'Selected store only' }
        ],
        rows: [
            { title: 'Electronics', meta: '412 SKUs • 68% sell-through', value: '₹42.8L', status: 'Healthy' },
            { title: 'Audio', meta: '188 SKUs • 44% sell-through', value: '₹16.2L', status: 'Watch' },
            { title: 'Groceries', meta: '96 SKUs • expiry weighted', value: '₹4.1L', status: 'Fast' }
        ],
        actions: [
            { label: 'Group by Category', icon: Layers },
            { label: 'Download CSV', icon: Download, primary: true }
        ]
    },
    'inventory-dead-stock': {
        key: 'deadStock',
        title: 'Dead / Slow Stock',
        subtitle: 'Products with low movement or no recent sales',
        primaryAction: 'Create Markdown',
        stats: [
            { label: 'Dead Stock', value: '38', tone: 'text-error' },
            { label: 'Slow Moving', value: '92', tone: 'text-tertiary' },
            { label: 'Locked Value', value: '₹7.2L', tone: 'text-on-surface' }
        ],
        fields: [
            { label: 'No Sale Period', value: '90 days' },
            { label: 'Category', value: 'All categories' },
            { label: 'Action Plan', value: 'Discount / Return / Transfer' }
        ],
        rows: [
            { title: 'Vortex Prime 85mm', meta: 'Last sold 104 days ago', value: '45 units', status: 'Transfer' },
            { title: 'Cloud Router X1', meta: 'Low demand • high value', value: '22 units', status: 'Discount' }
        ],
        actions: [
            { label: 'Transfer Items', icon: Repeat },
            { label: 'Return Supplier', icon: RotateCcw },
            { label: 'Create Markdown', icon: Tags, primary: true }
        ]
    },
    'inventory-returns': {
        key: 'returns',
        title: 'Returns',
        subtitle: 'Customer returns and supplier returns',
        primaryAction: 'Create Return',
        stats: [
            { label: 'Customer', value: '14', tone: 'text-tertiary' },
            { label: 'Supplier', value: '6', tone: 'text-secondary' },
            { label: 'Pending QC', value: '9', tone: 'text-error' }
        ],
        fields: [
            { label: 'Return Type', value: 'Customer Return' },
            { label: 'Bill / PO Reference', value: '#TX-9021' },
            { label: 'Product / SKU', value: 'HD-900' },
            { label: 'Condition', value: 'Opened • Sellable' },
            { label: 'Refund / Credit', value: 'Store credit' }
        ],
        rows: [
            { title: 'RT-2026-021', meta: 'Customer return • HD-900', value: '+1 stock', status: 'QC' },
            { title: 'RTS-2026-009', meta: 'Supplier return • damaged goods', value: '-6 stock', status: 'Dispatched' }
        ],
        actions: [
            { label: 'Inspect Item', icon: ClipboardCheck },
            { label: 'Print Slip', icon: Download },
            { label: 'Create Return', icon: RotateCcw, primary: true }
        ]
    },
    'inventory-reorder-rules': {
        key: 'reorderRules',
        title: 'Reorder Rules',
        subtitle: 'Minimum stock, maximum stock, and auto-alert settings',
        primaryAction: 'Save Rule',
        stats: [
            { label: 'Active Rules', value: '312', tone: 'text-primary' },
            { label: 'Auto PO', value: '42', tone: 'text-secondary' },
            { label: 'Needs Rule', value: '64', tone: 'text-tertiary' }
        ],
        fields: [
            { label: 'Product / Category', value: 'Audio products' },
            { label: 'Minimum Stock', value: '24', type: 'number' },
            { label: 'Maximum Stock', value: '160', type: 'number' },
            { label: 'Reorder Quantity', value: '96', type: 'number' },
            { label: 'Preferred Supplier', value: 'Metro Cash & Carry' },
            { label: 'Alert Channel', value: 'Push + WhatsApp' }
        ],
        rows: [
            { title: 'AuraPods Pro Gen 2', meta: 'Min 24 • Max 160 • Reorder 96', value: 'Auto PO', status: 'On' },
            { title: 'Studio Pro Wireless', meta: 'Min 10 • Max 80 • Reorder 30', value: 'Alert only', status: 'On' }
        ],
        actions: [
            { label: 'Apply to Category', icon: Layers },
            { label: 'Save Rule', icon: Save, primary: true }
        ]
    },
    'inventory-import-export': {
        key: 'importExport',
        title: 'Import / Export',
        subtitle: 'Bulk upload products and export inventory data',
        primaryAction: 'Upload File',
        stats: [
            { label: 'Rows Ready', value: '1,248', tone: 'text-primary' },
            { label: 'Errors', value: '12', tone: 'text-error' },
            { label: 'Exports', value: '6', tone: 'text-secondary' }
        ],
        fields: [
            { label: 'Import Type', value: 'Products + Opening Stock' },
            { label: 'File Name', value: 'inventory-upload-may.xlsx' },
            { label: 'Duplicate Handling', value: 'Update matching SKU' },
            { label: 'Export Format', value: 'CSV / Excel' }
        ],
        rows: [
            { title: 'inventory-upload-may.xlsx', meta: '1,248 rows • 12 need review', value: '96% valid', status: 'Review' },
            { title: 'stock-value-export.csv', meta: 'Generated today', value: '2.4MB', status: 'Ready' }
        ],
        actions: [
            { label: 'Download Template', icon: Download },
            { label: 'Export Inventory', icon: Download },
            { label: 'Upload File', icon: Upload, primary: true }
        ]
    }
};

const activeConfig = computed(() => configs[String(route.name)] ?? configs['inventory-stock-in']);
const icon = computed(() => icons[activeConfig.value.key]);
const searchQuery = ref('');
const stockInDraft = ref<StockInDraft | null>(null);
const supplierOptions = [
    { name: 'Lumina Tech Logistics' },
    { name: 'Reliance Distribution' },
    { name: 'Metro Cash & Carry' },
    { name: 'Bajaj Wholesale' }
];

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(value);
};

const isStockInScreen = computed(() => route.name === 'inventory-stock-in');

const selectedStockInSupplier = computed({
    get: () => stockInDraft.value?.supplier ?? supplierOptions[0].name,
    set: (supplier: string) => {
        if (!stockInDraft.value) return;

        stockInDraft.value = {
            ...stockInDraft.value,
            supplier
        };
        void stockInService.saveDraft(stockInDraft.value);
    }
});

const stockInTotalQty = computed(() =>
    stockInDraft.value?.items.reduce((total, item) => total + item.quantity, 0) ?? 0
);

const stockInCostValue = computed(() =>
    stockInDraft.value?.items.reduce((total, item) => total + item.quantity * item.costPrice, 0) ?? 0
);

const displayedStats = computed(() => {
    if (!isStockInScreen.value || !stockInDraft.value) return activeConfig.value.stats;

    return [
        { label: 'Scanned Qty', value: String(stockInTotalQty.value), tone: 'text-primary' },
        { label: 'Lines', value: String(stockInDraft.value.items.length), tone: 'text-secondary' },
        { label: 'Cost Value', value: formatCurrency(stockInCostValue.value), tone: 'text-tertiary' }
    ];
});

const displayedFields = computed(() => {
    if (!isStockInScreen.value || !stockInDraft.value) {
        return isStockInScreen.value
            ? activeConfig.value.fields.filter((field) => field.label !== 'Supplier')
            : activeConfig.value.fields;
    }

    const firstItem = stockInDraft.value.items[0];
    return [
        { label: 'Invoice Number', value: stockInDraft.value.invoiceNumber },
        { label: 'Invoice Date', value: stockInDraft.value.invoiceDate, type: 'date' },
        { label: 'Receiving Date', value: stockInDraft.value.receivedDate, type: 'date' },
        { label: 'Product / SKU', value: firstItem ? `${firstItem.name} / ${firstItem.sku}` : '' },
        { label: 'Quantity Received', value: String(stockInTotalQty.value), type: 'number' },
        { label: 'Cost Value', value: String(stockInCostValue.value), type: 'number' }
    ];
});

const displayedRows = computed(() => {
    if (!isStockInScreen.value || !stockInDraft.value) return activeConfig.value.rows;

    return stockInDraft.value.items.map((item) => ({
        title: item.name,
        meta: `${item.sku} • Batch ${item.batch} • Cost ${formatCurrency(item.costPrice)}`,
        value: `+${item.quantity} units`,
        status: stockInDraft.value?.status === 'received' ? 'Received' : 'Scanned'
    }));
});

const scanStockInBill = async () => {
    await router.push({ name: 'scanner', query: { mode: 'stock-in-bill' } });
};

const receiveStockInDraft = async () => {
    if (!stockInDraft.value) {
        await scanStockInBill();
        return;
    }

    await stockInService.receiveDraft();
    stockInDraft.value = null;
};

const handleAction = async (action: Action) => {
    if (!isStockInScreen.value) return;

    if (action.label === 'Scan Bill' || action.label === 'Attach Invoice') {
        await scanStockInBill();
        return;
    }

    if (action.primary) {
        await receiveStockInDraft();
    }
};

onMounted(async () => {
    stockInDraft.value = await stockInService.getDraft();
});
</script>

<template>
    <div class="px-5 pt-4 space-y-6 pb-40 max-w-md mx-auto">
        <section class="flex items-center gap-4">
            <button @click="router.back()"
                class="p-2 -ml-2 hover:bg-surface-container-high rounded-full transition-colors">
                <ArrowLeft class="w-6 h-6 text-primary" />
            </button>
            <div class="grow min-w-0">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <component :is="icon" class="w-5 h-5" />
                    </div>
                    <div class="min-w-0">
                        <h2 class="text-2xl font-black text-on-surface tracking-tight truncate">{{ activeConfig.title }}</h2>
                        <p class="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider truncate">
                            {{ activeConfig.subtitle }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="grid grid-cols-3 gap-3">
            <SurfaceCard v-for="stat in displayedStats" :key="stat.label" variant="low"
                class="p-4 rounded-3xl border border-surface-container-high/30">
                <p class="text-[8px] font-black text-on-surface-variant/40 uppercase tracking-wider">{{ stat.label }}</p>
                <h3 :class="['text-xl font-black mt-2 leading-none', stat.tone]">{{ stat.value }}</h3>
            </SurfaceCard>
        </section>

        <section class="space-y-3">
            <div class="relative">
                <Search class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30" />
                <input v-model="searchQuery" type="text" :placeholder="`Search ${activeConfig.title.toLowerCase()}...`"
                    class="w-full bg-surface-container-low border-none rounded-[1.25rem] py-3.5 pl-11 pr-4 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/20 font-bold text-sm" />
            </div>
            <SurfaceCard variant="low" class="p-5 space-y-4 border border-surface-container-high/30">
                <div class="flex items-center justify-between">
                    <h3 class="text-sm font-black text-on-surface">
                        {{ isStockInScreen ? 'Supplier Bill Data' : 'Quick Entry' }}
                    </h3>
                    <span class="text-[9px] font-black text-primary uppercase tracking-widest">
                        {{ isStockInScreen && stockInDraft ? 'Auto Filled' : 'Draft' }}
                    </span>
                </div>
                <div v-if="isStockInScreen && !stockInDraft"
                    class="rounded-3xl border border-dashed border-surface-container-highest p-5 text-center space-y-2">
                    <Barcode class="w-8 h-8 text-primary mx-auto" />
                    <h4 class="text-sm font-black text-on-surface">Scan supplier bill</h4>
                    <p class="text-[10px] font-bold text-on-surface-variant/45 uppercase tracking-wider">
                        Products, invoice number, supplier, quantity and costs will auto-fill
                    </p>
                </div>
                <Select v-if="isStockInScreen" v-model="selectedStockInSupplier" label="Supplier"
                    :options="supplierOptions" optionLabel="name" optionValue="name" placeholder="Select Supplier">
                    <template #icon>
                        <Truck class="w-5 h-5" />
                    </template>
                </Select>
                <div class="grid grid-cols-1 gap-3">
                    <label v-for="field in displayedFields" :key="field.label" class="space-y-1.5">
                        <span class="text-[9px] font-black text-on-surface-variant/50 uppercase tracking-wider">
                            {{ field.label }}
                        </span>
                        <input :type="field.type ?? 'text'" :value="field.value"
                            class="w-full bg-surface-container-high/50 text-on-surface rounded-2xl px-4 py-3 text-sm font-bold placeholder:text-on-surface-variant/30 outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
                    </label>
                </div>
                <div class="grid grid-cols-3 gap-2 pt-1">
                    <button v-for="action in activeConfig.actions" :key="action.label" @click="handleAction(action)"
                        :class="[
                            'min-h-16 rounded-2xl flex flex-col items-center justify-center gap-1.5 px-2 active:scale-95 transition-all',
                            action.primary ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'
                        ]">
                        <component :is="action.icon" class="w-4 h-4" />
                        <span class="text-[8px] font-black uppercase tracking-wider text-center leading-tight">
                            {{ action.label }}
                        </span>
                    </button>
                </div>
            </SurfaceCard>
        </section>

        <section class="space-y-3">
            <div class="flex items-center justify-between px-1">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Recent Items</h3>
                <button class="text-[9px] font-black text-primary uppercase tracking-widest">View All</button>
            </div>
            <div class="bg-surface-container-low rounded-4xl border border-surface-container-high/30 overflow-hidden">
                <div v-for="(row, index) in displayedRows" :key="row.title" :class="[
                    'p-4 flex items-center justify-between gap-4 group active:scale-[0.98] transition-all',
                    index !== displayedRows.length - 1 && 'border-b border-surface-container-high/20'
                ]">
                    <div class="flex items-center gap-4 min-w-0">
                        <div class="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <component :is="icon" class="w-5 h-5" />
                        </div>
                        <div class="min-w-0">
                            <h4 class="font-black text-on-surface text-sm truncate">{{ row.title }}</h4>
                            <p class="text-[9px] font-bold text-on-surface-variant/40 mt-0.5 truncate">{{ row.meta }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 shrink-0">
                        <div class="text-right">
                            <p class="text-sm font-black text-on-surface">{{ row.value }}</p>
                            <p class="text-[8px] font-black text-primary uppercase tracking-wider">{{ row.status }}</p>
                        </div>
                        <ChevronRight class="w-4 h-4 text-on-surface-variant/20" />
                    </div>
                </div>
            </div>
        </section>

        <div
            class="fixed bottom-0 left-0 right-0 w-full bg-surface/80 backdrop-blur-2xl border-t border-surface-container-high px-6 pb-10 pt-4 z-[60] flex gap-4 max-w-md mx-auto">
            <Button variant="secondary" class="flex-1 rounded-2xl font-black" @click="router.push({ name: 'inventory' })">
                Stock
            </Button>
            <Button class="flex-1 rounded-2xl font-black">
                <template #icon><component :is="icon" class="w-5 h-5" /></template>
                {{ activeConfig.primaryAction }}
            </Button>
        </div>
    </div>
</template>
