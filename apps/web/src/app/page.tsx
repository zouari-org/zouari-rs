import { Header } from './_components/Header';
import { 
  CtaFooter,
  HeroSection ,
  PromiseSection,
  ServicesSection,
  TrustSection,
  WhoWeAreSection
} from './_components/landing/';

export default function Home() {
  return (
    <>
    <Header />
    <main style={{ paddingTop: 64 }}>
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <TrustSection />
      <PromiseSection />
      <CtaFooter />
    </main>
    </>
  );
}
