# Checkout Automation Plan

## Application Overview

Checkout positive, negative, and edge scenarios for SauceDemo using the existing products fixture and checkout page objects.

## Test Scenarios

### 1. Checkout

**Seed:** `tests/seed.spec.ts`

#### 1.1. Positive checkout

**File:** `tests/checkout-positive.spec.ts`

**Steps:**
  1. Add a product, open the cart, and click Checkout.
    - expect: Checkout information page is displayed.
  2. Enter valid customer details and continue.
    - expect: Checkout overview is displayed and totals are correct.
  3. Finish the order.
    - expect: Order confirmation is displayed.

#### 1.2. Negative checkout validation

**File:** `tests/checkout-negative.spec.ts`

**Steps:**
  1. Open checkout and submit with each required field missing.
    - expect: The correct required-field error is displayed and the user remains on checkout information.

#### 1.3. Checkout edge cases

**File:** `tests/checkout-edge.spec.ts`

**Steps:**
  1. Use long customer values, cancel checkout, and correct a validation error.
    - expect: Values and navigation behave correctly and checkout can proceed after correction.
