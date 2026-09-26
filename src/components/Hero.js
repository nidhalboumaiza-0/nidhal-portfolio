import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ReactTyped } from "react-typed";
import {
  FiDownload,
  FiMail,
  FiMapPin,
  FiPhone,
  FiX,
  FiExternalLink,
  FiFileText,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  SiFlutter,
  SiReact,
  SiExpress,
  SiFirebase,
  SiFlask,
  SiNextdotjs,
} from "react-icons/si";
import { useLanguage } from "../contexts/LanguageContext";
import profileImage from "../assets/nidhal-pic1.jpg";

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
    text-align: center;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 300px auto;
  gap: 3rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const Content = styled.div`
  z-index: 2;
`;

const ProfileImageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    order: -1;
    margin-top: 5rem;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 6rem;
  }
`;

/* Glass frame with a slowly flowing gradient border */
const PhotoFrame = styled(motion.div)`
  position: relative;
  padding: 3px;
  border-radius: 32px;
  background: linear-gradient(
    120deg,
    #8b5cf6,
    #22d3ee,
    #f472b6,
    #8b5cf6
  );
  background-size: 300% 300%;
  animation: heroBorderFlow 7s linear infinite;
  box-shadow:
    0 24px 60px rgba(139, 92, 246, 0.35),
    0 8px 28px rgba(34, 211, 238, 0.18);

  @keyframes heroBorderFlow {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 300% 50%;
    }
  }
`;

const ProfileImage = styled(motion.img)`
  display: block;
  width: 290px;
  height: 380px;
  object-fit: cover;
  object-position: 34% center;
  border-radius: 29px;
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 220px;
    height: 290px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 170px;
    height: 224px;
  }
`;

/* Soft aurora halo behind the photo */
const ProfileGlow = styled(motion.div)`
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: conic-gradient(
    from 180deg,
    rgba(139, 92, 246, 0.45),
    rgba(34, 211, 238, 0.4),
    rgba(244, 114, 182, 0.35),
    rgba(139, 92, 246, 0.45)
  );
  opacity: 0.35;
  filter: blur(60px);
  z-index: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 200px;
    height: 200px;
  }
`;

/* Floating tech chips orbiting the portrait */
const FloatingChip = styled(motion.div)`
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  background: rgba(13, 16, 32, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  white-space: nowrap;

  svg {
    font-size: 1rem;
    color: ${(props) => props.chipColor || props.theme.colors.secondary};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 0.62rem;
    padding: 0.4rem 0.65rem;

    svg {
      font-size: 0.8rem;
    }
  }
`;

const Greeting = styled(motion.p)`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${(props) => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TypedContainer = styled(motion.div)`
  height: 4rem;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const TypedText = styled.div`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  color: ${(props) => props.theme.colors.textSecondary};

  .typed-cursor {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;

  &.primary {
    background: ${(props) => props.theme.colors.gradient};
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
    }
  }

  &.secondary {
    background: transparent;
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};

    &:hover {
      background: ${(props) => props.theme.colors.primary};
      color: white;
      transform: translateY(-2px);
    }
  }

  &.whatsapp {
    background: rgba(37, 211, 102, 0.12);
    color: #25d366;
    border-color: rgba(37, 211, 102, 0.35);

    &:hover {
      background: #25d366;
      color: #051a0c;
      border-color: #25d366;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(37, 211, 102, 0.35);
    }
  }
`;

const StatsCard = styled(motion.div)`
  background: rgba(17, 21, 38, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  padding: 2rem;
  min-width: 300px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-width: auto;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const StatsTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
`;

const StatItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StatIcon = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
`;

const StatText = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.95rem;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.gradient};
  opacity: 0.1;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  background: rgba(4, 7, 20, 0.88);
  backdrop-filter: blur(14px);
`;

const ModalCard = styled(motion.div)`
  width: min(650px, 100%);
  max-height: calc(100dvh - 2.4rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgba(15, 23, 42, 0.96);
  border: 1px solid rgba(139, 92, 246, 0.35);
  border-radius: 8px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(139, 92, 246, 0.2);
  color: #f8fafc;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  gap: 1rem;

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.75rem;
  }
`;

const ModalTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
`;

const ModalTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  background: linear-gradient(135deg, #a78bfa, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    font-size: 1.15rem;
  }
`;

const ModalSubtitle = styled.p`
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.4);
    transform: rotate(90deg);
  }
`;

const CvOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 1.25rem 1.5rem;

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

const CvOptionCard = styled(motion.div)`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 8px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  transition: all 0.25s ease;
  flex-shrink: 0;
  min-width: 0;

  &:hover {
    border-color: rgba(56, 189, 248, 0.5);
    background: rgba(30, 41, 59, 0.95);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const CvOptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CvOptionTitle = styled.h4`
  font-size: 1.02rem;
  font-weight: 700;
  color: #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  letter-spacing: 0;
  overflow-wrap: anywhere;

  svg {
    flex-shrink: 0;
  }
`;

const CvBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const CvBadge = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: ${(props) => props.$bg || "rgba(139, 92, 246, 0.15)"};
  color: ${(props) => props.$color || "#c4b5fd"};
  border: 1px solid ${(props) => props.$border || "rgba(139, 92, 246, 0.3)"};
`;

const CvOptionDescription = styled.p`
  font-size: 0.83rem;
  color: #94a3b8;
  line-height: 1.45;
`;

const CvActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.2rem;
  flex-wrap: wrap;
`;

const CvDownloadBtn = styled(motion.a)`
  background: linear-gradient(135deg, #6366f1, #3b82f6);
  color: #ffffff;
  padding: 0.55rem 1.2rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
    transform: translateY(-1px);
  }
`;

const CvPreviewBtn = styled(motion.a)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #cbd5e1;
  padding: 0.55rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const Hero = () => {
  const { t, language } = useLanguage();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const cvModalRef = useRef(null);
  const cvCloseRef = useRef(null);

  useEffect(() => {
    if (!isCvModalOpen) return;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cvCloseRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsCvModalOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const controls = cvModalRef.current?.querySelectorAll("button, a[href]");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      const outside = !cvModalRef.current.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [isCvModalOpen]);

  const typedStrings =
    language === "fr"
      ? [
          "Ingénieur Logiciel & Full Stack",
          "Applications Flutter en Production",
          "Next.js 16 & React 19 Web Apps",
          "APIs Node.js & Express Performantes",
          "Code Modulaire & Haute Performance",
        ]
      : [
          "Software Engineer & Full Stack",
          "Production Flutter Apps (Stores)",
          "Next.js 16 & React 19 Web Apps",
          "Node.js & Express REST APIs",
          "Modular Code & High Performance",
        ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeroSection id="hero">
      <FloatingElements>
        <FloatingShape
          size={100}
          style={{ top: "10%", left: "10%" }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <FloatingShape
          size={60}
          style={{ top: "60%", right: "15%" }}
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </FloatingElements>

      <Container>
        <Content>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("hero.greeting")}
          </Greeting>

          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nidhal BOUMAIZA
          </Name>

          <TypedContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <TypedText>
              <ReactTyped
                strings={typedStrings}
                typeSpeed={50}
                backSpeed={30}
                backDelay={2000}
                loop
                showCursor={true}
              />
            </TypedText>
          </TypedContainer>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t("hero.subtitle")}
          </Description>

          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              className="primary"
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail /> {t("contact.title")}
            </Button>
            <Button
              as={motion.button}
              className="secondary"
              onClick={() => setIsCvModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload /> {t("hero.downloadCV")}
            </Button>
            <Button
              className="whatsapp"
              href="https://wa.me/21628316089"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp /> WhatsApp
            </Button>
          </ButtonGroup>
        </Content>

        <ProfileImageContainer
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ProfileGlow
            animate={{
              rotate: 360,
              opacity: [0.28, 0.4, 0.28],
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <PhotoFrame whileHover={{ y: -6 }} transition={{ duration: 0.35 }}>
            <ProfileImage src={profileImage} alt="Nidhal BOUMAIZA" />
          </PhotoFrame>

          <FloatingChip
            style={{ top: "6%", left: "-12%" }}
            chipColor="#54C5F8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiFlutter /> Flutter
          </FloatingChip>

          <FloatingChip
            style={{ top: "20%", right: "-14%" }}
            chipColor="#61DAFB"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiReact /> React
          </FloatingChip>

          <FloatingChip
            style={{ top: "52%", right: "-16%" }}
            chipColor="#38BDF8"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiFlask /> Flask
          </FloatingChip>

          <FloatingChip
            style={{ bottom: "10%", left: "-14%" }}
            chipColor="#F472B6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiExpress /> Express
          </FloatingChip>

          <FloatingChip
            style={{ bottom: "6%", right: "-10%" }}
            chipColor="#FFCA28"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiFirebase /> Firebase
          </FloatingChip>

          <FloatingChip
            style={{ bottom: "16%", left: "-16%" }}
            chipColor="#FFFFFF"
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiNextdotjs /> Next.js 16
          </FloatingChip>
        </ProfileImageContainer>

        <StatsCard
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ y: -5 }}
        >
          <StatsTitle>
            {language === "fr" ? "Infos Rapides" : "Quick Info"}
          </StatsTitle>

          <StatItem
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <StatIcon>
              <FiMapPin />
            </StatIcon>
            <StatText>Tunis, Tunisia</StatText>
          </StatItem>

          <StatItem
            as="a"
            href="https://wa.me/21628316089"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", cursor: "pointer" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35 }}
          >
            <StatIcon style={{ color: "#25D366" }}>
              <FaWhatsapp />
            </StatIcon>
            <StatText style={{ color: "#25D366", fontWeight: 700 }}>
              WhatsApp (+216 28 316 089)
            </StatText>
          </StatItem>

          <StatItem
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <StatIcon>
              <FiPhone />
            </StatIcon>
            <StatText>+216 28 316 089</StatText>
          </StatItem>

          <StatItem
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.65 }}
          >
            <StatIcon>
              <FiMail />
            </StatIcon>
            <StatText>nidhal.boumaiza@outlook.com</StatText>
          </StatItem>

          <StatItem
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 }}
          >
            <StatIcon>🎓</StatIcon>
            <StatText>
              Flutter + Express + React + Flask
            </StatText>
          </StatItem>
        </StatsCard>
      </Container>

      {createPortal(<AnimatePresence>
        {isCvModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCvModalOpen(false)}
          >
            <ModalCard
              ref={cvModalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cv-modal-title"
              aria-describedby="cv-modal-description"
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitleBlock>
                  <ModalTitle id="cv-modal-title">
                    <FiDownload /> {language === "fr" ? "Télécharger le CV" : "Download CV"}
                  </ModalTitle>
                  <ModalSubtitle id="cv-modal-description">
                    {language === "fr"
                      ? "Sélectionnez le format adapté à votre besoin ou au processus de recrutement :"
                      : "Choose the CV format tailored to your target position or recruitment pipeline:"}
                  </ModalSubtitle>
                </ModalTitleBlock>
                <CloseButton ref={cvCloseRef} onClick={() => setIsCvModalOpen(false)} aria-label={language === "fr" ? "Fermer le CV" : "Close CV"}>
                  <FiX />
                </CloseButton>
              </ModalHeader>

              <CvOptionsList>
                {/* 1. English ATS / AI Recruiter CV */}
                <CvOptionCard whileHover={{ y: -2 }}>
                  <CvOptionHeader>
                    <CvOptionTitle>
                      <FiFileText style={{ color: "#38bdf8" }} />
                      {language === "fr" ? "CV Anglais (Optimisé ATS & Recrutement IA)" : "English CV (ATS & AI Recruiter Optimized)"}
                    </CvOptionTitle>
                    <CvBadges>
                      <CvBadge $bg="rgba(56, 189, 248, 0.15)" $color="#38bdf8" $border="rgba(56, 189, 248, 0.35)">
                        ★ {language === "fr" ? "Recommandé International" : "Recommended International"}
                      </CvBadge>
                      <CvBadge $bg="rgba(16, 185, 129, 0.15)" $color="#10b981" $border="rgba(16, 185, 129, 0.3)">
                        AI-Scraper Ready
                      </CvBadge>
                    </CvBadges>
                  </CvOptionHeader>
                  <CvOptionDescription>
                    {language === "fr"
                      ? "Format linéaire standard avec métadonnées sémantiques Schema.org (JSON-LD). Conçu pour un score maximal sur les parseurs ATS (Workday, Greenhouse, Lever, Ashby) et agents IA."
                      : "Standard linear layout with embedded Schema.org JSON-LD microdata. Maximizes score on ATS parsers (Workday, Greenhouse, Lever, Ashby) and AI recruitment agents."}
                  </CvOptionDescription>
                  <CvActionRow>
                    <CvDownloadBtn
                      href="/NIDHAL_BOUMAIZA_CV_EN.pdf"
                      download="NIDHAL_BOUMAIZA_CV_EN.pdf"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiDownload /> {language === "fr" ? "Télécharger (PDF)" : "Download (PDF)"}
                    </CvDownloadBtn>
                    <CvPreviewBtn
                      href="/NIDHAL_BOUMAIZA_CV_EN.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiExternalLink /> {language === "fr" ? "Aperçu" : "Preview"}
                    </CvPreviewBtn>
                  </CvActionRow>
                </CvOptionCard>

                {/* 2. French Modern CV */}
                <CvOptionCard whileHover={{ y: -2 }}>
                  <CvOptionHeader>
                    <CvOptionTitle>
                      <FiFileText style={{ color: "#a78bfa" }} />
                      {language === "fr" ? "CV Français (Ingénieur Logiciel & Full Stack)" : "French CV (Software Engineer & Full Stack)"}
                    </CvOptionTitle>
                    <CvBadges>
                      <CvBadge $bg="rgba(139, 92, 246, 0.15)" $color="#c4b5fd" $border="rgba(139, 92, 246, 0.35)">
                        Format Standard FR
                      </CvBadge>
                      <CvBadge $bg="rgba(56, 189, 248, 0.15)" $color="#38bdf8" $border="rgba(56, 189, 248, 0.3)">
                        PFE eSteps & AL Manarah
                      </CvBadge>
                    </CvBadges>
                  </CvOptionHeader>
                  <CvOptionDescription>
                    {language === "fr"
                      ? "Version française complète mettant en valeur le PFE chez eSteps Health (CIRO Pizza), le contrat freelance chez AL Manarah Co et les applications publiées."
                      : "Full French version highlighting the eSteps Health engineering internship (CIRO), AL Manarah Co contract, and published store applications."}
                  </CvOptionDescription>
                  <CvActionRow>
                    <CvDownloadBtn
                      href="/NIDHAL_BOUMAIZA_CV.pdf"
                      download="NIDHAL_BOUMAIZA_CV.pdf"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}
                    >
                      <FiDownload /> {language === "fr" ? "Télécharger (PDF)" : "Download (PDF)"}
                    </CvDownloadBtn>
                    <CvPreviewBtn
                      href="/NIDHAL_BOUMAIZA_CV.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiExternalLink /> {language === "fr" ? "Aperçu" : "Preview"}
                    </CvPreviewBtn>
                  </CvActionRow>
                </CvOptionCard>

                {/* 3. Classic Format (English 2-Column with Photo) */}
                <CvOptionCard whileHover={{ y: -2 }}>
                  <CvOptionHeader>
                    <CvOptionTitle>
                      <FiFileText style={{ color: "#f472b6" }} />
                      {language === "fr" ? "CV Format Classique (Anglais avec Photo & 2 Colonnes)" : "Classic CV Format (English 2-Column with Photo)"}
                    </CvOptionTitle>
                    <CvBadges>
                      <CvBadge $bg="rgba(244, 114, 182, 0.15)" $color="#f472b6" $border="rgba(244, 114, 182, 0.35)">
                        Photo Portfolio
                      </CvBadge>
                      <CvBadge $bg="rgba(251, 191, 36, 0.15)" $color="#fbbf24" $border="rgba(251, 191, 36, 0.3)">
                        Layout 2 Colonnes
                      </CvBadge>
                    </CvBadges>
                  </CvOptionHeader>
                  <CvOptionDescription>
                    {language === "fr"
                      ? "La mise en page à 2 colonnes avec photo, stage eSteps Health (CIRO Pizza), contrat AL Manarah et historique complet de projets."
                      : "The original 2-column layout with photo, eSteps Health engineering internship (CIRO), AL Manarah contract, and complete project history."}
                  </CvOptionDescription>
                  <CvActionRow>
                    <CvDownloadBtn
                      href="/NIDHAL_BOUMAIZA_CV_CLASSIC_EN.pdf"
                      download="NIDHAL_BOUMAIZA_CV_CLASSIC_EN.pdf"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
                    >
                      <FiDownload /> {language === "fr" ? "Télécharger (PDF)" : "Download (PDF)"}
                    </CvDownloadBtn>
                    <CvPreviewBtn
                      href="/NIDHAL_BOUMAIZA_CV_CLASSIC_EN.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiExternalLink /> {language === "fr" ? "Aperçu" : "Preview"}
                    </CvPreviewBtn>
                  </CvActionRow>
                </CvOptionCard>

                {/* 4. Classic Format (French 2-Column with Photo) */}
                <CvOptionCard whileHover={{ y: -2 }}>
                  <CvOptionHeader>
                    <CvOptionTitle>
                      <FiFileText style={{ color: "#10b981" }} />
                      {language === "fr" ? "CV Format Classique (Français avec Photo & 2 Colonnes)" : "Classic CV Format (French 2-Column with Photo)"}
                    </CvOptionTitle>
                    <CvBadges>
                      <CvBadge $bg="rgba(16, 185, 129, 0.15)" $color="#10b981" $border="rgba(16, 185, 129, 0.35)">
                        Photo Portfolio
                      </CvBadge>
                      <CvBadge $bg="rgba(56, 189, 248, 0.15)" $color="#38bdf8" $border="rgba(56, 189, 248, 0.3)">
                        Version FR 2 Colonnes
                      </CvBadge>
                    </CvBadges>
                  </CvOptionHeader>
                  <CvOptionDescription>
                    {language === "fr"
                      ? "Version française du format classique à 2 colonnes avec photo, détail du PFE chez eSteps Health (CIRO Pizza), applications en production et vie associative."
                      : "French version of the classic 2-column layout with photo, detailed eSteps Health PFE (CIRO Pizza), production apps, and community leadership."}
                  </CvOptionDescription>
                  <CvActionRow>
                    <CvDownloadBtn
                      href="/NIDHAL_BOUMAIZA_CV_CLASSIC_FR.pdf"
                      download="NIDHAL_BOUMAIZA_CV_CLASSIC_FR.pdf"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)" }}
                    >
                      <FiDownload /> {language === "fr" ? "Télécharger (PDF)" : "Download (PDF)"}
                    </CvDownloadBtn>
                    <CvPreviewBtn
                      href="/NIDHAL_BOUMAIZA_CV_CLASSIC_FR.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FiExternalLink /> {language === "fr" ? "Aperçu" : "Preview"}
                    </CvPreviewBtn>
                  </CvActionRow>
                </CvOptionCard>
              </CvOptionsList>
            </ModalCard>
          </ModalOverlay>
        )}
      </AnimatePresence>, document.body)}
    </HeroSection>
  );
};

export default Hero;
