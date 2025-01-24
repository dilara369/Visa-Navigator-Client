
import FAQ from "../components/FAQ";
import LatestVisas from "../components/LatestVisas";

import Slider from "../components/Slider";
import TeamSection from "../components/TeamSection";
import Testimonials from "../components/Testimonials";






export default function Home() {
  return (
    <div className="grid gap-10">
      <Slider/>
      <LatestVisas/>
      <TeamSection/>
      <Testimonials/>
      <FAQ/>
      
    </div>
  );
}
