import React, { useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDownRight, FiDownload, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SiFlutter, SiReact, SiExpress, SiFirebase, SiFlask, SiNextdotjs } from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";
import CvModal from "./CvModal";
import profileImage from "../assets/nidhal-pic1.jpg";

const HeroSection = styled.section`
  position: relative;
  padding: 9rem 2rem 3rem;
  @media (max-width: 768px) { padding: 6rem 1.25rem 0.5rem; }
  @media (min-width: 769px) and (max-height: 800px) { padding: 7.5rem 2rem 2rem; }
  @media (max-width: 380px) { padding-bottom: 0; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const IntroLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(360px, 1fr);
  align-items: center;
  gap: 4rem;
  min-height: 420px;
  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
    min-height: 0;
  }
  @media (max-width: 768px) { gap: 1.25rem; }
  @media (max-width: 380px) { gap: 1rem; }
`;

const Introduction = styled.div`
  min-width: 0;
  @media (max-width: 1024px) { text-align: center; }
  @media (max-width: 380px) {
    & > p:first-child { margin-bottom: 0; }
    h1 { margin-bottom: 0.5rem; }
    & > p { margin-bottom: 0.75rem; }
  }
`;

const Portrait = styled.div`
  position: relative;
  width: 296px;
  margin: 0 auto;
  isolation: isolate;
  @media (max-width: 1024px) { width: 226px; order: -1; }
  @media (max-width: 768px) { width: 176px; }
  @media (max-width: 380px) { width: 146px; }
`;

const ProfileGlow = styled(motion.div)`
  position: absolute;
  inset: 0 -1.5rem;
  z-index: -1;
  border-radius: 50%;
  background: conic-gradient(from 180deg, rgba(139,92,246,0.45), rgba(34,211,238,0.4), rgba(244,114,182,0.35), rgba(139,92,246,0.45));
  opacity: 0.35;
  filter: blur(60px);
  pointer-events: none;
`;

const PhotoFrame = styled(motion.div)`
  padding: 3px;
  border-radius: 32px;
  background: linear-gradient(120deg, #8b5cf6, #22d3ee, #f472b6, #8b5cf6);
  background-size: 300% 300%;
  animation: heroBorderFlow 7s linear infinite;
  box-shadow: 0 24px 60px rgba(139,92,246,0.35), 0 8px 28px rgba(34,211,238,0.18);
  @keyframes heroBorderFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: 300% 50%; }
  }
`;

const ProfileImage = styled.img`
  display: block;
  width: 290px;
  height: 380px;
  object-fit: cover;
  object-position: 34% center;
  border-radius: 29px;
  @media (max-width: 1024px) { width: 220px; height: 290px; }
  @media (max-width: 768px) { width: 170px; height: 224px; }
  @media (max-width: 380px) { width: 140px; height: 184px; }
`;

const FloatingChip = styled(motion.div)`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(13,16,32,0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  white-space: nowrap;
  svg { color: ${(props) => props.$color}; font-size: 1rem; }
  @media (max-width: 768px) {
    font-size: 0.62rem;
    gap: 0.35rem;
    padding: 0.4rem 0.65rem;
    svg { font-size: 0.8rem; }
  }
`;

const Greeting = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const Name = styled.h1`
  font-size: 3.5rem;
  line-height: 1.15;
  font-weight: 700;
  text-wrap: balance;
  margin-bottom: 0.85rem;
  @media (min-width: 769px) and (max-height: 800px) { font-size: 3rem; }
  @media (max-width: 768px) { font-size: 2rem; }
  @media (max-width: 380px) { font-size: 1.75rem; }
`;

const Role = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.secondary};
  margin-bottom: 1rem;
  text-wrap: balance;
  @media (max-width: 768px) { font-size: 1.1rem; }
  @media (min-width: 769px) and (max-height: 800px) { font-size: 1.25rem; }
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 640px;
  color: ${(props) => props.theme.colors.textSecondary};
  margin: 0 0 1.5rem;
  @media (max-width: 1024px) { margin-left: auto; margin-right: auto; }
  @media (max-width: 768px) { font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem; }
  @media (min-width: 769px) and (max-height: 800px) { font-size: 1rem; margin-bottom: 1.25rem; }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.75rem;
  @media (max-width: 1024px) { justify-content: center; }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    max-width: 360px;
    margin: 0 auto;
  }
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 48px;
  padding: 0.75rem 1.25rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 6px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.surface};
  transition: background 180ms ease, border-color 180ms ease;
  &:hover {
    background: #212a35;
    border-color: ${(props) => props.theme.colors.textSecondary};
  }
  &.primary {
    color: #071d16;
    background: ${(props) => props.theme.colors.secondary};
    border-color: transparent;
    &:hover { background: #9aeccc; }
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.65rem 0.5rem;
    gap: 0.4rem;
    min-width: 0;
    svg { flex-shrink: 0; }
  }
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem 0;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.textSecondary};
  span, a { display: inline-flex; align-items: center; gap: 0.5rem; }
  a { color: inherit; text-decoration: none; overflow-wrap: anywhere; }
  a:hover { color: ${(props) => props.theme.colors.secondary}; }
  a.whatsapp { min-height: 44px; color: #7de6a4; }
  @media (min-width: 769px) and (max-height: 800px) { margin-top: 1rem; }
  @media (max-width: 380px) { margin-top: 0.5rem; }
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.25rem 0.75rem;
    margin-top: 1rem;
    padding: 0.5rem 0;
    font-size: 0.75rem;
    span { grid-column: 1 / -1; justify-content: center; }
    a { min-height: 44px; justify-content: center; }
    a.whatsapp { width: 44px; font-size: 1.25rem; }
    a.whatsapp span { display: none; }
  }
`;

export default function Hero() {
  const { t, language } = useLanguage();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const techChips = [
    { label: "Flutter", icon: SiFlutter, color: "#54C5F8", position: { top: "6%", left: "-12%" }, distance: -10, duration: 4.5 },
    { label: "React", icon: SiReact, color: "#61DAFB", position: { top: "20%", right: "-14%" }, distance: 12, duration: 5.2 },
    { label: "Flask", icon: SiFlask, color: "#38BDF8", position: { top: "50%", right: "-16%" }, distance: -8, duration: 4.8 },
    { label: "Next.js 16", icon: SiNextdotjs, color: "#FFFFFF", position: { top: "52%", left: "-16%" }, distance: -9, duration: 4.8 },
    { label: "Express", icon: SiExpress, color: "#F472B6", position: { bottom: "10%", left: "-14%" }, distance: -8, duration: 4 },
    { label: "Firebase", icon: SiFirebase, color: "#FFCA28", position: { bottom: "6%", right: "-10%" }, distance: 10, duration: 5.8 },
  ];
  return (
    <HeroSection id="hero">
      <Container>
        <IntroLayout>
        <Introduction>
          <Greeting>{t("hero.greeting")}</Greeting>
          <Name>Nidhal BOUMAIZA</Name>
          <Role>{language === "fr" ? "Ingénieur logiciel & développeur Full Stack" : "Software Engineer & Full Stack Developer"}</Role>
          <Description>{t("hero.subtitle")}</Description>
          <ButtonGroup>
            <Button className="primary" href="#projects">
              {t("hero.viewProjects")} <FiArrowDownRight aria-hidden="true" />
            </Button>
            <Button as="button" type="button" onClick={() => setIsCvModalOpen(true)}>
              <FiDownload aria-hidden="true" /> {t("hero.downloadCV")}
            </Button>
          </ButtonGroup>
        </Introduction>
        <Portrait>
          <ProfileGlow aria-hidden="true" animate={reducedMotion ? undefined : { rotate: 360, opacity: [0.28, 0.4, 0.28] }} transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" } }} />
          <PhotoFrame whileHover={reducedMotion ? undefined : { y: -6 }} transition={{ duration: 0.35 }}>
            <ProfileImage src={profileImage} alt="Nidhal Boumaiza" width="290" height="380" fetchPriority="high" />
          </PhotoFrame>
          {techChips.map(({ label, icon: Icon, color, position, distance, duration }) => (
            <FloatingChip key={label} $color={color} style={position} animate={reducedMotion ? undefined : { y: [0, distance, 0] }} transition={{ duration, repeat: Infinity, ease: "easeInOut" }}>
              <Icon aria-hidden="true" /> {label}
            </FloatingChip>
          ))}
        </Portrait>
        </IntroLayout>
        <Footer>
          <span><FiMapPin aria-hidden="true" /> {language === "fr" ? "Tunis, Tunisie" : "Tunis, Tunisia"}</span>
          <a href="mailto:nidhal.boumaiza@outlook.com"><FiMail aria-hidden="true" /> nidhal.boumaiza@outlook.com</a>
          <a className="whatsapp" href="https://wa.me/21628316089" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (+216 28 316 089)" title="WhatsApp (+216 28 316 089)"><FaWhatsapp aria-hidden="true" /><span>WhatsApp</span></a>
        </Footer>
      </Container>
      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
    </HeroSection>
  );
}
