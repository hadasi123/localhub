# LocalHub - Community Hub React App

A modern React web application built with a layered architecture that serves as a local community hub. The app displays today's weather in Israel and provides various community features.

## Features

- **Weather Display**: Shows current weather in Israel with temperature, description, and weather icons
- **Lost & Found**: Report and browse lost or found items in the community
- **Carpool**: Share rides and find carpool partners
- **Updates**: Community news and announcements
- **Education**: Local classes, workshops, and educational opportunities
- **Business**: Local business directory
- **Phone Book**: Community contact information and emergency numbers
- **Buy & Sell**: Marketplace for buying and selling items locally

## Architecture

The app follows a **3-layer architecture**:

### 1. Presentation Layer
- **Components**: UI components, layout components, and pages
- **Styling**: Clean, bright colors with greens and greys
- **Responsive**: Mobile-first design with responsive breakpoints

### 2. Business Logic Layer
- **Hooks**: Custom React hooks for data management and navigation
- **Services**: Business logic and state management
- **Utilities**: Helper functions and formatters

### 3. Data Layer
- **Services**: API services and data persistence
- **Types**: Data structures and type definitions
- **Storage**: Local storage for data persistence

## Technology Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **CSS3**: Custom styling with CSS variables
- **Local Storage**: Data persistence
- **ES6+**: Modern JavaScript features

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd localhub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Project Structure

```
src/
├── components/           # Presentation Layer
│   ├── ui/              # Reusable UI components
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific components
├── pages/               # Page components
│   ├── lost-and-found/  # Lost & Found feature
│   ├── carpool/         # Carpool feature
│   ├── updates/         # Updates feature
│   ├── education/       # Education feature
│   ├── business/        # Business feature
│   ├── phone-book/      # Phone Book feature
│   └── sell/            # Buy & Sell feature
├── hooks/               # Business Logic Layer
│   ├── useWeather.js    # Weather data management
│   ├── useData.js       # Generic data management
│   └── useNavigation.js # Navigation management
├── services/            # Data Layer
│   ├── weatherService.js # Weather API service
│   └── dataService.js   # Local data management
├── styles/              # Styling
│   ├── globals.css      # Global styles and CSS variables
│   └── components.css   # Component-specific styles
├── types/               # Type definitions
└── utils/               # Utility functions
```

## Design System

### Colors
- **Primary Green**: #4CAF50
- **Secondary Green**: #8BC34A
- **Accent Green**: #C8E6C9
- **Grey Palette**: From #FAFAFA to #212121

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: From 0.75rem to 2.25rem
- **Font Weights**: 300, 400, 500, 600, 700

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Scale**: xs, sm, md, lg, xl, 2xl

## Features Overview

### Weather Display
- Real-time weather information for Israel
- Temperature, humidity, wind speed
- Weather icons and descriptions
- Auto-refresh every 10 minutes

### Community Features
Each feature includes:
- **Add/Edit/Delete**: Full CRUD operations
- **Search**: Find items by keywords
- **Categories**: Organized by type
- **Contact Information**: Easy communication
- **Responsive Design**: Works on all devices

### Data Persistence
- All data is stored in browser's local storage
- Data persists between sessions
- No external database required

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- Real weather API integration
- User authentication
- Image uploads
- Push notifications
- Offline support
- Multi-language support
- Admin panel
- Real-time updates
