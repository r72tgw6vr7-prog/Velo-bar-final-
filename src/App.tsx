import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as React from 'react';
import { Suspense, useState, lazy } from 'react';

// Lazy load all page components for code splitting (default exports)
const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const BuchungMucPage = lazy(() => import('./pages/BuchungMucPage'));
const VelobarcoPage = lazy(() => import('./pages/VelobarcoPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const CorporateEventCateringGuidePage = lazy(
  () => import('./pages/resources/corporate-event-catering-guide'),
);
const MessestandIdeenPage = lazy(() => import('./pages/blog/messestand-ideen-hospitality'));
const ROIHospitalityEventsPage = lazy(() => import('./pages/blog/roi-hospitality-events'));
const MessekateringKostenPage = lazy(() => import('./pages/blog/messekatering-kosten-2025'));
const AlkoholfreieCocktailsPage = lazy(
  () => import('./pages/blog/alkoholfreie-cocktails-firmenevents'),
);
const NachhaltigeFirmenfeierPage = lazy(() => import('./pages/blog/nachhaltige-firmenfeier'));
const LastMinuteCateringPage = lazy(() => import('./pages/blog/last-minute-catering-muenchen'));
const CateringOhneStromanschlussPage = lazy(
  () => import('./pages/blog/catering-ohne-stromanschluss'),
);
const DistrictPage = lazy(() => import('./pages/locations/DistrictPage'));
const TokenVerificationPage = lazy(() => import('./pages/dev/TokenVerificationPage'));
const UILabPreviewPage = lazy(() => import('./pages/UILabPreviewPage'));

// Venue-specific landing pages (Programmatic SEO)
const MesseMuenchenPage = lazy(() => import('./pages/locations/messe-muenchen'));
const MOCMuenchenPage = lazy(() => import('./pages/locations/moc-muenchen'));
const BallhausforumInfinityPage = lazy(() => import('./pages/locations/ballhausforum-infinity'));
const Werk1MuenchenPage = lazy(() => import('./pages/locations/werk1-muenchen'));
const SchlossSchleissheimPage = lazy(() => import('./pages/locations/schloss-schleissheim'));
const ZenithMuenchenPage = lazy(() => import('./pages/locations/zenith-muenchen'));
const AlteUttingPage = lazy(() => import('./pages/locations/alte-utting'));
const LocationsIndexPage = lazy(() => import('./pages/locations/LocationsIndexPage'));

// Accessibility imports (keep eager - needed immediately)
import { AccessibilityProvider, AccessibilityMenu } from './components/accessibility';
import './styles/accessibility.css';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './core/state/AppContext';
import Meta from '@/components/Meta';
// Fix import path to match actual directory structure
import { BusinessProvider } from './foundation/BusinessProvider';
import ScrollToTop from '@/components/ScrollToTop';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import { ROUTES } from './core/types/routes';
import ROUTE_CONFIG from './core/constants/routes';
import { PerformanceDashboard } from '@/components/debug/PerformanceDashboard';
import { StickyCTABar } from '@/components/organisms/StickyCTABar';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import ProtectedRoute from '@/routes/ProtectedRoute';

function App() {
  // State to toggle accessibility audit tool for developers
  const [showA11yAudit, setShowA11yAudit] = useState(false);

  // Check if in development mode to show accessibility tools
  const isDev = import.meta.env.DEV;

  // Key press handler for accessibility audit tool (Alt+Shift+A)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'A') {
        setShowA11yAudit((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <BusinessProvider>
      <AppProvider initialLanguage='DE'>
        <LanguageProvider>
          <AccessibilityProvider>
            <BrowserRouter>
              <AppRouterContent
                isDev={isDev}
                showA11yAudit={showA11yAudit}
                setShowA11yAudit={setShowA11yAudit}
              />
            </BrowserRouter>
          </AccessibilityProvider>
        </LanguageProvider>
      </AppProvider>
    </BusinessProvider>
  );
}

export default App;

type AppRouterContentProps = {
  isDev: boolean;
  showA11yAudit: boolean;
  setShowA11yAudit: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppRouterContent: React.FC<AppRouterContentProps> = ({
  isDev,
  showA11yAudit,
  setShowA11yAudit,
}) => {
  const location = useLocation();
  const isGalleryRoute = location.pathname === ROUTE_CONFIG[ROUTES.GALERIE].path;

  const routes = (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <div className='u-spinner' role='status' aria-label='Loading' />
          </div>
        </div>
      }
    >
      <ErrorBoundary>
        <Routes>
          {/* Dev-only: Token Verification */}
          <Route
            path='/dev/tokens'
            element={
              isDev ? (
                <ProtectedRoute>
                  <TokenVerificationPage />
                </ProtectedRoute>
              ) : (
                <Navigate to={ROUTE_CONFIG[ROUTES.HOME].path} replace />
              )
            }
          />

          {/* UI Lab Preview */}
          <Route path='/ui-lab' element={<UILabPreviewPage />} />

          {/* Main Routes */}
          <Route
            path={ROUTE_CONFIG[ROUTES.HOME].path}
            element={
              <>
                <Meta
                  title='Velo.Bar – Mobile Cocktailbar für Events in München & Coburg'
                  description='Mobile Cocktailbar für Firmenfeiern, Hochzeiten, Messen und private Events in München und Coburg. Professioneller Barkeeper-Service für 50-500+ Gäste.'
                  canonicalPath='/'
                />
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
              </>
            }
          />

          {/* Sandbox Homepage Route */}
          <Route
            path='/home-new'
            element={
              <>
                <Meta
                  title='Sandbox Homepage | Velo.Bar'
                  description='Sandbox version of the Velo.Bar homepage for testing and development.'
                  canonicalPath='/home-new'
                />
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
              </>
            }
          />

          {/* Services (single consolidated page) */}
          <Route
            path={ROUTE_CONFIG[ROUTES.SERVICES].path}
            element={
              <>
                <Meta
                  title='Leistungen | Mobile Cocktailbar | Velobar München & Coburg'
                  description='Alle Leistungen auf einen Blick: Firmenfeiern, Weihnachtsfeiern, Messe-Catering, Team-Events, Private Feiern und Hochzeiten in München & Coburg.'
                  canonicalPath={ROUTE_CONFIG[ROUTES.SERVICES].path}
                />
                <ServicesPage />
              </>
            }
          />

          {/* Legacy Service Routes (redirect into /leistungen sections) */}
          <Route
            path={ROUTE_CONFIG[ROUTES.FIRMENFEIERN].path}
            element={<Navigate to={`${ROUTE_CONFIG[ROUTES.SERVICES].path}#firmenfeiern`} replace />}
          />
          <Route
            path={ROUTE_CONFIG[ROUTES.WEIHNACHTSFEIERN].path}
            element={
              <Navigate to={`${ROUTE_CONFIG[ROUTES.SERVICES].path}#weihnachtsfeiern`} replace />
            }
          />
          <Route
            path={ROUTE_CONFIG[ROUTES.MESSE_CATERING].path}
            element={
              <Navigate to={`${ROUTE_CONFIG[ROUTES.SERVICES].path}#messe-catering`} replace />
            }
          />
          <Route
            path={ROUTE_CONFIG[ROUTES.TEAM_EVENTS].path}
            element={
              <Navigate
                to={`${ROUTE_CONFIG[ROUTES.SERVICES].path}#team-events-workshops`}
                replace
              />
            }
          />
          <Route
            path={ROUTE_CONFIG[ROUTES.PRIVATE_FEIERN].path}
            element={
              <Navigate to={`${ROUTE_CONFIG[ROUTES.SERVICES].path}#private-feiern`} replace />
            }
          />
          <Route
            path={ROUTE_CONFIG[ROUTES.HOCHZEITEN].path}
            element={<Navigate to={`${ROUTE_CONFIG[ROUTES.SERVICES].path}#hochzeiten`} replace />}
          />

          {/* Pricing & Gallery Routes */}
          <Route
            path={ROUTE_CONFIG[ROUTES.PREISE].path}
            element={
              <>
                <Meta
                  title='Preise & Pakete | Mobile Cocktailbar | Velobar München & Coburg'
                  description='Transparente Preise für mobile Cocktailbar-Services. Pakete für Firmenfeiern, Hochzeiten und private Events in München und Coburg.'
                  canonicalPath={ROUTE_CONFIG[ROUTES.PREISE].path}
                />
                <ErrorBoundary>
                  <PricingPage />
                </ErrorBoundary>
              </>
            }
          />
          <Route
            path={ROUTE_CONFIG[ROUTES.GALERIE].path}
            element={
              <>
                <Meta
                  title='Galerie | Event-Impressionen | Velobar München & Coburg'
                  description='Eindrücke von unseren Events: Cocktailbars auf Firmenfeiern, Hochzeiten und privaten Feiern in München und Coburg.'
                  canonicalPath={ROUTE_CONFIG[ROUTES.GALERIE].path}
                />
                <ErrorBoundary>
                  <GalleryPage />
                </ErrorBoundary>
              </>
            }
          />

          {/* Menu Route */}
          <Route
            path={ROUTE_CONFIG[ROUTES.MENU].path}
            element={
              <>
                <Meta
                  title='Drinks Menu | Cocktails & SESES Longdrinks | Velobar'
                  description='Unsere Cocktail-Auswahl: SESES Longdrinks und klassische Cocktails für Ihr Event in München und Coburg.'
                  canonicalPath={ROUTE_CONFIG[ROUTES.MENU].path}
                />
                <MenuPage />
              </>
            }
          />

          {/* FAQ Route */}
          <Route path={ROUTE_CONFIG[ROUTES.FAQ].path} element={<FAQPage />} />

          {/* Location-specific Booking Pages */}
          <Route
            path={ROUTE_CONFIG[ROUTES.BUCHUNG_MUC].path}
            element={
              <>
                <Meta
                  title='München Booking | Mobile Bar München & Umgebung | Velobar'
                  description='Buchen Sie die mobile Velo.Bar für Ihr Event in München. Selbstversorgendes Öko-System, professionelle Barkeeper, Gin-Tastings ab 49€.'
                  canonicalPath={ROUTE_CONFIG[ROUTES.BUCHUNG_MUC].path}
                />
                <ErrorBoundary>
                  <BuchungMucPage />
                </ErrorBoundary>
              </>
            }
          />
          <Route
            path={ROUTE_CONFIG[ROUTES.VELOBARCO].path}
            element={
              <>
                <Meta
                  title='Coburg Booking | Mobile Bar Coburg & Umgebung | Velobar'
                  description='Buchen Sie die mobile Velo.Bar für Ihr Event in Coburg. Cocktailbar und Gin-Tastings für private und Firmenfeiern.'
                  canonicalPath={ROUTE_CONFIG[ROUTES.VELOBARCO].path}
                />
                <VelobarcoPage />
              </>
            }
          />

          {/* About Route */}
          <Route path={ROUTE_CONFIG[ROUTES.ABOUT].path} element={<AboutPage />} />

          {/* Contact/Anfrage Route */}
          <Route
            path={ROUTE_CONFIG[ROUTES.ANFRAGE].path}
            element={
              <>
                <Meta
                  title='Anfrage | Jetzt anfragen | Velobar München & Coburg'
                  description='Senden Sie uns Ihre Event-Anfrage für mobile Cocktailbar-Services in München und Coburg. Wir melden uns innerhalb von 24 Stunden.'
                  canonicalPath={ROUTE_CONFIG[ROUTES.ANFRAGE].path}
                />
                <ErrorBoundary>
                  <ContactPage />
                </ErrorBoundary>
              </>
            }
          />
          {/* Redirect /contact to /anfrage */}
          <Route
            path={ROUTE_CONFIG[ROUTES.CONTACT].path}
            element={<Navigate to={ROUTE_CONFIG[ROUTES.ANFRAGE].path} replace />}
          />
          {/* Redirect /kontakt to /anfrage */}
          <Route
            path='/kontakt'
            element={<Navigate to={ROUTE_CONFIG[ROUTES.ANFRAGE].path} replace />}
          />

          {/* Resource & Blog Pages */}
          <Route
            path='/resources/corporate-event-catering-guide'
            element={<CorporateEventCateringGuidePage />}
          />
          <Route path='/blog/messestand-ideen-hospitality' element={<MessestandIdeenPage />} />
          <Route path='/blog/roi-hospitality-events' element={<ROIHospitalityEventsPage />} />
          <Route path='/blog/messekatering-kosten-2025' element={<MessekateringKostenPage />} />
          <Route
            path='/blog/alkoholfreie-cocktails-firmenevents'
            element={<AlkoholfreieCocktailsPage />}
          />
          <Route path='/blog/nachhaltige-firmenfeier' element={<NachhaltigeFirmenfeierPage />} />
          <Route path='/blog/last-minute-catering-muenchen' element={<LastMinuteCateringPage />} />
          <Route
            path='/blog/catering-ohne-stromanschluss'
            element={<CateringOhneStromanschlussPage />}
          />

          {/* Programmatic SEO - Munich Districts */}
          <Route path='/firmenfeieren/:district' element={<DistrictPage />} />

          {/* Programmatic SEO - Venue-Specific Landing Pages */}
          <Route path='/locations' element={<LocationsIndexPage />} />
          <Route path='/locations/messe-muenchen' element={<MesseMuenchenPage />} />
          <Route path='/locations/moc-muenchen' element={<MOCMuenchenPage />} />
          <Route path='/locations/ballhausforum-infinity' element={<BallhausforumInfinityPage />} />
          <Route path='/locations/werk1-muenchen' element={<Werk1MuenchenPage />} />
          <Route path='/locations/schloss-schleissheim' element={<SchlossSchleissheimPage />} />
          <Route path='/locations/zenith-muenchen' element={<ZenithMuenchenPage />} />
          <Route path='/locations/alte-utting' element={<AlteUttingPage />} />

          {/* Legal pages */}
          {/* Redirect /legal to /impressum */}
          <Route path='/legal' element={<Navigate to='/impressum' replace />} />
          {/* Legacy: current live site has no dedicated /agb page */}
          <Route path='/agb' element={<Navigate to='/impressum' replace />} />
          <Route path={ROUTE_CONFIG[ROUTES.IMPRESSUM].path} element={<ImpressumPage />} />
          <Route path={ROUTE_CONFIG[ROUTES.DATENSCHUTZ].path} element={<DatenschutzPage />} />

          {/* Legacy route redirects */}
          <Route
            path='/services'
            element={<Navigate to={ROUTE_CONFIG[ROUTES.PREISE].path} replace />}
          />
          <Route
            path='/portfolio'
            element={<Navigate to={ROUTE_CONFIG[ROUTES.GALERIE].path} replace />}
          />
          <Route
            path='/artists'
            element={<Navigate to={ROUTE_CONFIG[ROUTES.GALERIE].path} replace />}
          />
          <Route
            path='/booking'
            element={<Navigate to={ROUTE_CONFIG[ROUTES.ANFRAGE].path} replace />}
          />

          {/* 404 Route */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );

  return (
    <>
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-(--brand-primary) focus:text-black'
      >
        Zum Inhalt springen
      </a>
      <ScrollToTop />
      <AnalyticsProvider>
        {isGalleryRoute ? (
          routes
        ) : (
          <div className='relative z-10 min-h-screen' data-scroll-root>
            {routes}
          </div>
        )}

        {/* Accessibility Menu (always visible) */}
        <AccessibilityMenu />

        {/* Sticky CTA Bar */}
        <StickyCTABar phoneNumber='+49 160 94623196' whatsappNumber='4916094623196' />

        {/* Performance Dashboard (development only) */}
        {isDev && <PerformanceDashboard />}

        {/* Import AccessibilityAudit only in development mode and when toggled */}
        {isDev && showA11yAudit && (
          <React.Suspense
            fallback={
              <div className='fixed right-6 bottom-6 rounded bg-black p-8 text-white'>
                Loading audit tool...
              </div>
            }
          >
            {/* Dynamically import to avoid bundling in production */}
            {React.createElement(
              React.lazy(() => import('./components/accessibility/AccessibilityAudit')),
              {
                onClose: () => setShowA11yAudit(false),
              },
            )}
          </React.Suspense>
        )}
      </AnalyticsProvider>
    </>
  );
};
