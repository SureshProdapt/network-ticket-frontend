import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Zap, Shield, WifiOff, Mail, Phone, MapPin } from 'lucide-react';
import { FeatureCard, ProblemCard, ContactCard } from '../components';
import { HeroSection, FeaturesSection, IssuesSection, ContactSection } from '../sections';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <IssuesSection />
      <ContactSection />
    </>
  );
}