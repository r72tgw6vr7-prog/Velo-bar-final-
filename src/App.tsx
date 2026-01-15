import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as React from 'react';
import { Suspense, useState, lazy, useEffect } from 'react';

// Lazy load all page components for code splitting (default exports)
const HomePage = lazy(() => import('./pages/HomePage.tsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.tsx'));
const PricingPage = lazy(() => import('./pages/PricingPage.tsx'));
const MenuPage = lazy(() => import('./pages/MenuPage.tsx'));
const BuchungMucPage = lazy(() => import('./pages/BuchungMucPage.tsx'));
const VelobarcoPage = lazy(() => import('./pages/VelobarcoPage.tsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.tsx'));
const GalleryPage = lazy(() => import('./pages/GalleryPage.tsx'));
const FAQPage = lazy(() => import('./pages/FAQPage.tsx'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage.tsx'));
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage.tsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.tsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.tsx'));
const CorporateEventCateringGuidePage = lazy(
  () => import('./pages/resources/corporate-event-catering-guide.tsx'),
);
const MessestandIdeenPage = lazy(() => import('./pages/blog/messestand-ideen-hospitality.tsx'));
const ROIHospitalityEventsPage = lazy(() => import('./pages/blog/roi-hospitality-events.tsx'));
const MessecateringKostenPage = lazy(() => import('./pages/blog/messecatering-kosten-2025.tsx'));
const AlkoholfreieCocktailsPage = lazy(
  () => import('./pages/blog/alkoholfreie-cocktails-firmenevents.tsx'),
);
const NachhaltigeFirmenfeierPage = lazy(() => import('./pages/blog/nachhaltige-firmenfeier.tsx'));
const LastMinuteCateringPage = lazy(() => import('./pages/blog/last-minute-catering-muenchen.tsx'));
const CateringOhneStromanschlussPage = lazy(
  () => import('./pages/blog/catering-ohne-stromanschluss.tsx'),
);
const DistrictPage = lazy(() => import('./pages/locations/DistrictPage.tsx'));
const DesignTokenReferencePage = lazy(() => import('./pages/dev/DesignTokenReferencePage.tsx'));
const DesignSystemPreviewPage = lazy(() => import('./pages/DesignSystemPreviewPage.tsx'));

// Venue-specific landing pages (Programmatic SEO)
const MesseMuenchenPage = lazy(() => import('./pages/locations/messe-muenchen.tsx'));
const MOCMuenchenPage = lazy(() => import('./pages/locations/moc-muenchen.tsx'));
const BallhausforumInfinityPage = lazy(() => import('./pages/locations/ballhausforum-infinity.tsx'));
const Werk1MuenchenPage = lazy(() => import('./pages/locations/werk1-muenchen.tsx'));
const SchlossSchleissheimPage = lazy(() => import('./pages/locations/schloss-schleissheim.tsx'));
const ZenithMuenchenPage = lazy(() => import('./pages/locations/zenith-muenchen.tsx'));
const AlteUttingPage = lazy(() => import('./pages/locations/alte-utting.tsx'));
const LocationsIndexPage = lazy(() => import('./pages/locations/LocationsIndexPage.tsx'));

// Accessibility imports (keep eager - needed immediately)
import { AccessibilityProvider, AccessibilityMenu } from './components/accessibility/index.ts';
import './styles/accessibility.css';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext.tsx';
import { AppProvider } from './core/state/AppContext.tsx';
import Meta from '@/components/Meta.tsx';
// Fix import path to match actual directory structure
import { BusinessProvider } from './foundation/BusinessProvider.tsx';
import ScrollToTop from '@/components/ScrollToTop.tsx';
import AnalyticsProvider from '@/components/AnalyticsProvider.tsx';
import { ROUTES } from './core/types/routes.ts';
import ROUTE_CONFIG from './core/constants/routes.ts';
import { PerformanceDashboard } from '@/components/debug/PerformanceDashboard.tsx';
import { StickyCTABar } from '@/components/organisms/StickyCTABar.tsx';
import ErrorBoundary from '@/components/layout/ErrorBoundary.tsx';
import ProtectedRoute from '@/routes/ProtectedRoute.tsx';
import { ConsentProvider } from '@/components/ConsentProvider.tsx';

function App() {
  // State to toggle accessibility audit tool for developers
  const [showA11yAudit, setShowA11yAudit] = useState(false);

  // Check if in development mode to show accessibility tools
  const isDev = import.meta.env.DEV;

  // Register service worker in production
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

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
          <ConsentProvider>
            <AccessibilityProvider>
              <BrowserRouter>
                <AppRouterContent
                  isDev={isDev}
                  showA11yAudit={showA11yAudit}
                  setShowA11yAudit={setShowA11yAudit}
                />
              </BrowserRouter>
            </AccessibilityProvider>
          </ConsentProvider>
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
  const { t } = useLanguage();
  const isGalleryRoute = location.pathname === ROUTE_CONFIG[ROUTES.GALERIE].path;

  const routes = (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <div className='text-center'>
            <div className='u-spinner' role='status' aria-label={t('common.loading')} />
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
                  <DesignTokenReferencePage />
                </ProtectedRoute>
              ) : (
                <Navigate to={ROUTE_CONFIG[ROUTES.HOME].path} replace />
              )
            }
          />

          {/* UI Lab Preview */}
          <Route path='/ui-lab' element={<DesignSystemPreviewPage />} />

          {/* Main Routes */}
          <Route
            path={ROUTE_CONFIG[ROUTES.HOME].path}
            element={
              <>
                <Meta
                  title={t('pages.home.seo.title')}
                  description={t('pages.home.seo.description')}
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
                  title={t('pages.homeNew.seo.title')}
                  description={t('pages.homeNew.seo.description')}
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
                  title={t('pages.services.seo.title')}
                  description={t('pages.services.seo.description')}
                  canonicalPath={ROUTE_CONFIG[ROUTES.SERVICES].path}
                />
                <ServicesPage />
              </>
            }
          />

          {/* Pricing */}
          <Route path={ROUTE_CONFIG[ROUTES.PREISE].path} element={<PricingPage />} />

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

          <Route
            path={ROUTE_CONFIG[ROUTES.GALERIE].path}
            element={
              <>
                <Meta
                  title={t('pages.gallery.seo.title')}
                  description={t('pages.gallery.seo.description')}
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
                  title={t('menu.seoTitle')}
                  description={t('menu.seoDescription')}
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
                  title={t('pages.bookingMuc.seo.title')}
                  description={t('pages.bookingMuc.seo.description')}
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
                  title={t('pages.bookingCoburg.seo.title')}
                  description={t('pages.bookingCoburg.seo.description')}
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
                  title={t('pages.contact.seo.title')}
                  description={t('pages.contact.seo.description')}
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
          <Route path='/blog/messecatering-kosten-2025' element={<MessecateringKostenPage />} />
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
        {t('common.skipToContent')}
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
                {t('common.loadingAuditTool')}
              </div>
            }
          >
            {/* Dynamically import to avoid bundling in production */}
            {React.createElement(
              React.lazy(() => import('./components/accessibility/AccessibilityAudit.tsx')),
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
