function HomePage({ setCurrentPage }) {
  return (
    <>
      <HeroSection setCurrentPage={setCurrentPage} />
      <FeaturesSection />
      <IssuesSection />
      <ContactSection />
    </>
  );
}