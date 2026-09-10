import { BrowserRouter } from 'react-router-dom';
import { PortalAuthProvider } from './context/PortalAuthContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <PortalAuthProvider>
        <AppRoutes />
      </PortalAuthProvider>
    </BrowserRouter>
  );
}
