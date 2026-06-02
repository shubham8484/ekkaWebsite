import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import CreatorNetwork from '@/components/home/CreatorNetwork';
import Philosophy from '@/components/home/Philosophy';
import WorkSection from '@/components/home/WorkSection';
import SplitCta from '@/components/home/SplitCta';
import Closing from '@/components/home/Closing';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <CreatorNetwork />
      <Philosophy />
      <WorkSection />
      <SplitCta />
      <Closing />
    </main>
  );
}
