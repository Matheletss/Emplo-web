
import Layout from "@/components/layout/Layout";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ForEmployers from "@/components/landing/ForEmployers";
import ForCandidates from "@/components/landing/ForCandidates";
import CTA from "@/components/landing/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <ForEmployers />
      <ForCandidates />
      <CTA />
    </Layout>
  );
};

export default Index;
