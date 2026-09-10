import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import PortalProtectedRoute, { PortalGuestRoute } from '../components/layouts/PortalProtectedRoute';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import PilgrimsPage from '../pages/PilgrimsPage';
import PilgrimProfilePage from '../pages/PilgrimProfilePage';
import AddPilgrimPage from '../pages/AddPilgrimPage';
import GroupsPage from '../pages/GroupsPage';
import PackagesPage from '../pages/PackagesPage';
import PaymentsPage from '../pages/finance/PaymentsPage';
import OutstandingPage from '../pages/finance/OutstandingPage';
import DocumentVerificationPage from '../pages/documents/DocumentVerificationPage';
import DocumentLibraryPage from '../pages/documents/DocumentLibraryPage';
import FlightsPage from '../pages/travel/FlightsPage';
import DeparturesPage from '../pages/travel/DeparturesPage';
import HotelsPage from '../pages/accommodation/HotelsPage';
import RoomAllocationPage from '../pages/accommodation/RoomAllocationPage';
import PlaceholderPage from '../pages/PlaceholderPage';
import PortalLoginPage from '../pages/portal/PortalLoginPage';
import PortalRegisterPage from '../pages/portal/PortalRegisterPage';
import PortalDashboardPage from '../pages/portal/PortalDashboardPage';
import PortalPaymentsPage from '../pages/portal/PortalPaymentsPage';
import PortalDocumentsPage from '../pages/portal/PortalDocumentsPage';
import PortalApplicationPage from '../pages/portal/PortalApplicationPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/portal/login" replace />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pilgrims" element={<PilgrimsPage />} />
        <Route path="/pilgrims/add" element={<AddPilgrimPage />} />
        <Route path="/pilgrims/groups" element={<GroupsPage />} />
        <Route path="/pilgrims/:id" element={<PilgrimProfilePage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/finance/payments" element={<PaymentsPage />} />
        <Route path="/finance/outstanding" element={<OutstandingPage />} />
        <Route path="/finance/receipts" element={<PlaceholderPage title="Receipts" description="Payment receipts and invoice generation will be available here." />} />
        <Route path="/documents/verification" element={<DocumentVerificationPage />} />
        <Route path="/documents/library" element={<DocumentLibraryPage />} />
        <Route path="/travel/flights" element={<FlightsPage />} />
        <Route path="/travel/departures" element={<DeparturesPage />} />
        <Route path="/travel/itinerary" element={<PlaceholderPage title="Itinerary Management" description="Group travel itineraries will be managed here." />} />
        <Route path="/accommodation/hotels" element={<HotelsPage />} />
        <Route path="/accommodation/rooms" element={<RoomAllocationPage />} />
        <Route path="/logistics/transport" element={<PlaceholderPage title="Transport Management" description="Transport scheduling and tracking will be available here." />} />
        <Route path="/logistics/buses" element={<PlaceholderPage title="Bus Fleet" description="Bus fleet management and assignments will be available here." />} />
        <Route path="/reports" element={<PlaceholderPage title="Reports & Analytics" description="Comprehensive reporting and analytics dashboards will be available here." />} />
        <Route path="/settings" element={<PlaceholderPage title="Settings" description="System configuration and user management settings will be available here." />} />
      </Route>

      {/* Pilgrim portal — guest routes */}
      <Route path="/portal/login" element={<PortalGuestRoute><PortalLoginPage /></PortalGuestRoute>} />
      <Route path="/portal/register" element={<PortalRegisterPage />} />

      {/* Pilgrim portal — protected routes */}
      <Route path="/portal" element={<PortalProtectedRoute />}>
        <Route index element={<Navigate to="/portal/dashboard" replace />} />
        <Route path="dashboard" element={<PortalDashboardPage />} />
        <Route path="application" element={<PortalApplicationPage />} />
        <Route path="payments" element={<PortalPaymentsPage />} />
        <Route path="documents" element={<PortalDocumentsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/portal/login" replace />} />
    </Routes>
  );
}
