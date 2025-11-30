import {
  CtaFooter,
  HeroSection,
  PromiseSection,
  ServicesSection,
  TrustSection,
  WhoWeAreSection,
} from './_components/landing/';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <TrustSection />
      <PromiseSection />
      <CtaFooter />
    </>
  );
}
