import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PageLayout } from '@/components/PageLayout';
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { ChiropracticPage } from '@/pages/ChiropracticPage';
import { MassagePage } from '@/pages/MassagePage';
import { PTPage } from '@/pages/PTPage';
import { TeamPage } from '@/pages/TeamPage';
import { PricingPage } from '@/pages/PricingPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { GiftCardPage } from '@/pages/GiftCardPage';

function App() {
  return (
    <HelmetProvider>
      <HashRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/palvelut" element={<ServicesPage />} />
            <Route path="/palvelut/kiropraktiikka" element={<ChiropracticPage />} />
            <Route path="/palvelut/hieronta" element={<MassagePage />} />
            <Route path="/palvelut/personal-training" element={<PTPage />} />
            <Route path="/tiimi" element={<TeamPage />} />
            <Route path="/hinnasto" element={<PricingPage />} />
            <Route path="/arvostelut" element={<ReviewsPage />} />
            <Route path="/meista" element={<AboutPage />} />
            <Route path="/yhteystiedot" element={<ContactPage />} />
            <Route path="/lahjakortti" element={<GiftCardPage />} />
          </Routes>
        </PageLayout>
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
