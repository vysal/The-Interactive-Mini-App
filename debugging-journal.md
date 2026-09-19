# Debugging Journal

## Entry 1: Build the product catalog UI
- Goal: replace the starter Vite app with the interactive product inventory view.
- Work: created the product list data, rendered cards with price and stock badges, and added the in-stock toggle.
- Result: the app showed the catalog and filtered view as expected.

## Entry 2: Add typed state and form validation
- Goal: make the app strongly typed and prevent invalid input from submitting.
- Work: introduced TypeScript interfaces for `Product` and form state, used `ChangeEvent` and `FormEvent`, and validated empty/invalid values before submitting.
- Result: the form now blocks invalid submissions and only adds valid products.

## Entry 3: Verify with the compiler, not just the browser
- Goal: catch real type issues before runtime.
- Work: ran `npx tsc --project tsconfig.json --noEmit` and fixed the null-safe mount issue in `src/main.tsx`.
- Result: TypeScript passed cleanly and the project built successfully without compile errors.
