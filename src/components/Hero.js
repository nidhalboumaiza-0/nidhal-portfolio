import React, { useState } from "react";
import styled from "styled-components";
import { FiArrowDownRight, FiDownload, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SiFlutter, SiReact, SiExpress, SiLaravel } from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";
import CvModal from "./CvModal";
import profileImage from "../assets/nidhal-pic1.jpg";

const HeroSection = styled.section`
  position: relative;
  padding: 6.5rem 2rem 2rem;
  @media (max-width: 768px) { padding: 6rem 1.25rem 0.5rem; }
  @media (min-width: 769px) and (max-height: 800px) { padding: 6rem 2rem 1rem; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Introduction = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Portrait = styled.figure`
  display: block;
  position: relative;
  width: 208px;
  aspect-ratio: 1;
  margin: 0 auto 1rem;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;

  img {
    position: absolute;
    display: block;
    width: 150%;
    height: 150%;
    max-width: none;
    left: -6%;
    top: -4%;
    object-fit: cover;
  }

  @media (min-width: 769px) and (max-height: 800px) { width: 152px; }
  @media (max-width: 768px) {
    width: 144px;
    margin-bottom: 0.75rem;
  }
  @media (max-width: 380px) { width: 128px; }
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
  margin: 0 auto 1.5rem;
  @media (max-width: 768px) { font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.25rem; }
  @media (min-width: 769px) and (max-height: 800px) { font-size: 1rem; margin-bottom: 1.25rem; }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
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

const TechStack = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  gap: 0.75rem 1.25rem;
  margin-top: 1.25rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.85rem;
  li { display: flex; align-items: center; gap: 0.5rem; }
  svg { font-size: 1.1rem; color: ${(props) => props.theme.colors.primary}; }
  @media (max-width: 768px), (max-height: 800px) { margin-top: 1rem; }
  @media (max-width: 380px) and (max-height: 760px) { display: none; }
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
  return (
    <HeroSection id="hero">
      <Container>
        <Introduction>
          <Portrait>
            <img src={profileImage} alt="Nidhal Boumaiza" width="1080" height="1083" fetchPriority="high" />
          </Portrait>
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
          <TechStack aria-label={language === "fr" ? "Technologies" : "Tech stack"}>
            <li><SiFlutter aria-hidden="true" /> Flutter</li>
            <li><SiReact aria-hidden="true" /> React / Next.js</li>
            <li><SiExpress aria-hidden="true" /> Express.js</li>
            <li><SiLaravel aria-hidden="true" /> Laravel</li>
          </TechStack>
        </Introduction>
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
