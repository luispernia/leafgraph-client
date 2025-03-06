import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

/**
 * Root App component - now simplified since routing is handled by React Router
 * The AuthProvider is now in main.tsx so this component is much simpler
 */
function App() {
  return <Outlet />;
}

export default App;
