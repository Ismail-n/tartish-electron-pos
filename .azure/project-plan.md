# Car Wash POS Desktop App

**Status**: Approved
**Created**: 2026-09-22
**Mode**: Local-first Electron application

## 1. Project Summary

Build a simple desktop point-of-sale app for a car-wash attendant. The first screen is a local login flow, followed by a focused POS workspace for capturing customer and vehicle details, selecting wash services, reviewing the order, and marking the order complete. The app is a demo with local-only state and no cloud dependencies.

## 2. Requirements

- Electron desktop shell with React JSX and esbuild as the lightweight bundler.
- Local login screen with demonstrative credentials and session persistence.
- Home POS dashboard showing the active order workflow and local demo activity.
- Vehicle and customer detail capture for the current order.
- Wash service/package selection with clear prices and selected-state feedback.
- Order summary with subtotal/total and order status.
- Payment completion state for the demo workflow; no real payment processing.
- Local demo data only, using in-memory state and lightweight local storage where needed.
- No backend, database, Azure resource, remote API, or network-dependent feature.

## 3. Application Architecture

The app will use an esbuild-powered React JSX renderer inside an Electron desktop shell. Plain JavaScript objects will model customers, vehicles, wash services, cart items, and order status. React state will own the active POS workflow; `localStorage` will retain the demo session and small preferences between launches. Electron main/preload code will provide the minimal secure desktop boundary without exposing Node APIs directly to the renderer.

The primary navigation is intentionally shallow: login transitions to the POS dashboard, and the dashboard contains the customer/vehicle form, service catalog, order summary, and completion state. No routing library or remote data layer is required for this first version.

## 4. Services and Data Stores

**Frontend service**: Electron + esbuild + React JSX. Owns the renderer UI, local demo data, active order state, and Electron desktop entry points.

**Backend services**: None.

**Data stores**: No datastore required. Use seeded in-memory demo records and browser local storage only for the local session and lightweight UI state. Do not add SQLite, Blob Storage, or an Azure-managed service.

## 5. User Experience and Workflow

1. The user enters the local demo credentials on the login screen.
2. The app restores a valid local session or opens the POS dashboard.
3. The user starts or selects an order, enters customer and vehicle details, and sees the order status.
4. The user selects one or more wash services from the seeded catalog.
5. The order panel updates item quantities, subtotal, and total immediately.
6. The user marks the order as paid/completed in the demo flow.
7. The app presents a completion state and supports starting another order without a network call.

## 6. Design System & UI

**Component Library**: Fluent UI v9
**Visual direction**: A practical, high-contrast point-of-sale interface with clear hierarchy, compact controls, visible totals, and restrained automotive accents. Prioritize fast scanning and touch-friendly targets over decorative content.
**Layout**: A desktop-first dashboard with a compact header, a main two-column workspace for order entry and summary, and responsive stacking for narrow windows.
**Components**: Fluent UI inputs, buttons, cards, badges, tabs or sections, dialogs, and message bars for form feedback, service selection, status changes, and completion confirmation.
**States**: Loading/restored session, empty order, validation errors, selected services, completed order, signed-out session, and reset/new-order state.

## 7. Implementation Plan

- Scaffold the Electron main process, secure preload bridge, esbuild renderer bundle, React JSX entry point, and simple JavaScript configuration.
- Add typed local domain models and seeded wash-service/demo data.
- Implement local login and session persistence.
- Build the POS dashboard with customer/vehicle fields, service selection, order calculations, and status transitions.
- Add completion and reset flows with clear validation and feedback.
- Keep all data access local and remove any unnecessary network or Azure configuration.
- Add a small focused test or verification surface for total calculation, status transitions, and session restoration where the project tooling supports it.

## 8. Validation

- Install dependencies and run the esbuild/Electron development workflow.
- Verify login, logout/session restoration, new-order reset, and completion flows.
- Verify service selection and total calculations for zero, one, and multiple services.
- Verify required customer/vehicle fields prevent incomplete order completion.
- Verify the renderer remains usable at desktop and narrow window sizes.
- Confirm the project contains no required backend, database, Azure credentials, or remote service configuration.