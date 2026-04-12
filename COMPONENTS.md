# Predictive Surface Component Library

A library of reusable React components built for the **Intelligent Retail Layer**. These components follow the "Intelligent Layer" design system, prioritizing tonal depth, editorial typography, and fluid motion.

## Core Components

### `SurfaceCard`
The base container component. Uses tonal depth levels instead of borders.

**Props:**
- `variant`: `'lowest' | 'low' | 'high' | 'highest' | 'glass'` (Default: `'lowest'`)
- `hover`: `boolean` - Adds lift and background shift on hover.
- `onClick`: `() => void` - Makes the card interactive with scale feedback.

---

### `StatCard`
Displays key metrics with trends and icons.

**Props:**
- `label`: `string` - The metric name.
- `value`: `string | number` - The main value.
- `trend`: `string` - e.g., "+14.2%".
- `trendLabel`: `string` - e.g., "vs yesterday".
- `trendDirection`: `'up' | 'down'` (Default: `'up'`).
- `variant`: `'default' | 'primary'` - Primary uses brand indigo for the value.
- `icon`: `ReactNode` - Background icon.

---

### `IntelligenceBadge`
A status indicator for AI insights and system states.

**Props:**
- `label`: `string`.
- `variant`: `'primary' | 'secondary' | 'tertiary' | 'error'`.
- `pulse`: `boolean` - Adds a pulsing dot indicator.
- `icon`: `ReactNode`.

---

### `InventoryItem`
Displays a product in list or bill format.

**Props:**
- `variant`: `'list' | 'bill'`.
- `name`: `string`.
- `sku`: `string`.
- `price`: `string`.
- `stock`: `number`.
- `qty`: `number`.
- `total`: `string`.
- `image`: `string` (URL).
- `isOutOfStock`: `boolean`.
- `onQtyChange`: `(newQty: number) => void`.
- `onRemove`: `() => void`.

---

### `ScannerView`
The AR-style viewfinder for product scanning.

**Props:**
- `image`: `string` (URL).
- `confidence`: `number` (0-100).
- `isScanning`: `boolean`.

---

### `Button`
Standard interactive element with support for the signature primary gradient.

**Props:**
- `variant`: `'primary' | 'secondary' | 'tertiary' | 'ghost'`.
- `size`: `'sm' | 'md' | 'lg' | 'xl'`.
- `icon`: `ReactNode`.

---

### `Input`
Stylized text input with floating-style labels.

**Props:**
- `label`: `string`.
- `icon`: `ReactNode`.
- `rightIcon`: `ReactNode`.

## Usage Example

```tsx
import { SurfaceCard, StatCard, Button } from './components/ui';

export default function MyComponent() {
  return (
    <SurfaceCard variant="low" hover>
      <StatCard label="Revenue" value="$24k" variant="primary" />
      <Button onClick={() => alert('Clicked!')}>Action</Button>
    </SurfaceCard>
  );
}
```
