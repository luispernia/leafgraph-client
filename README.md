# LeafGraph

A modern database visualization and management application built with React and Material UI, providing intuitive data exploration and management capabilities.

## Features

- Modern React (v19) with TypeScript
- Complete Material UI integration
- Customizable light/dark mode with green theming
- Responsive layout and mobile friendly
- Interactive database visualization dashboard
- User preferences and settings
- Intuitive navigation and modern UX

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd leafgraph
```

2. Install dependencies:
```bash 
npm install
# or if you use yarn
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
├── assets/         # Static assets like images, fonts
├── components/     # Reusable UI components
│   ├── Dashboard.tsx       # Dashboard component
│   ├── Header.tsx          # Application header
│   └── LeafGraphLogo.tsx   # Brand logo component
├── pages/          # Page components
│   └── DashboardPage.tsx   # Dashboard page with tabs
├── models/         # Data models
│   └── UserModel.ts        # User data model for MongoDB
├── context/        # React context providers
│   └── AuthContext.tsx     # Authentication context
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── index.css       # Global styles
```

## Material UI Integration

This project uses Material UI v6 and includes:

- ThemeProvider for consistent green theming
- CssBaseline for CSS normalization
- Responsive layout with Container and Grid
- Various UI components (AppBar, Drawer, Cards, etc.)
- Icons from @mui/icons-material

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs the linter
- `npm run preview` - Previews the production build locally

## Customizing the Theme

LeafGraph uses a nature-inspired green theme by default. You can customize it by modifying the `createTheme` call in `App.tsx`:

```tsx
const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: darkMode ? '#4caf50' : '#2e7d32', // Green shades
      light: darkMode ? '#80e27e' : '#60ad5e',
      dark: darkMode ? '#087f23' : '#005005',
    },
    secondary: {
      main: darkMode ? '#66bb6a' : '#388e3c', // More green shades
      light: darkMode ? '#98ee99' : '#6abf69',
      dark: darkMode ? '#338a3e' : '#00600f',
    },
    // Add more customizations here
  },
});
```

## Learn More

- [Material UI Documentation](https://mui.com/getting-started/usage/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/guide/)
