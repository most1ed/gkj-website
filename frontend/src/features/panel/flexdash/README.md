# FlexDashboard Feature

## Overview
The FlexDashboard is a dynamic, role-based dashboard system that allows users to customize their dashboard experience based on their organizational role.

## Key Components
- `types/widget.types.ts`: TypeScript interfaces and enums for widget management
- `utils/widgetHelpers.ts`: Utility class for managing widget presets and retrieval
- `store/flexDashboardStore.ts`: Zustand store for managing dashboard state
- `components/WidgetSelection.tsx`: Component for selecting and adding widgets
- `pages/FlexDashboardPage.tsx`: Main dashboard page with widget rendering and management

## Features
- Role-based widget templates
- Dynamic widget selection
- Persistent dashboard state
- Customizable widget layout

## Usage
Users can:
- View widgets specific to their role
- Add new widgets from available templates
- Remove existing widgets
- Persist dashboard configuration

## Technical Details
- State Management: Zustand with Immer
- Persistent Storage: localStorage
- Type Safety: TypeScript
- Responsive Design: Tailwind CSS

## Future Improvements
- Drag-and-drop widget positioning
- More granular widget customization
- Enhanced widget templates
