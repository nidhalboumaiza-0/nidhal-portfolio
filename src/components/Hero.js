import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { FiDownload, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";
import profileImage from "../assets/nidhal-pic.png";

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
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 6rem; // Add space below the header on mobile
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 420px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  transform: scale(1);
  border: 4px solid ${(props) => props.theme.colors.primary};
  box-shadow: 0 20px 40px rgba(0, 212, 255, 0.3);
  position: relative;
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 200px;
    height: 200px;
    transform: scale(1);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 150px;
    height: 150px;
    transform: scale(1);
  }
`;

const ProfileGlow = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.gradient};
  opacity: 0.2;
  filter: blur(20px);
  z-index: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 220px;
    height: 220px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 170px;
    height: 170px;
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
      box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
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
`;

const StatsCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
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

const Hero = () => {
  const { t, language } = useLanguage();

  const typedStrings =
    language === "fr"
      ? [
          "Développeur Full-Stack",
          "Développeur Mobile",
          "Expert Flutter",
          "Ingénieur Backend",
        ]
      : [
          "Full-Stack Developer",
          "Mobile Developer",
          "Flutter Expert",
          "Backend Engineer",
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
              className="secondary"
              href="/cv-nidhal-boumaiza.pdf"
              download="CV-Nidhal-Boumaiza.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload /> {t("hero.downloadCV")}
            </Button>
          </ButtonGroup>
        </Content>

        <ProfileImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ProfileGlow
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <ProfileImage
            src={profileImage}
            alt="Nidhal BOUMAIZA"
            whileHover={{
              scale: 1.05,
              rotate: 5,
            }}
            transition={{ duration: 0.3 }}
          />
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
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
          >
            <StatIcon>
              <FiPhone />
            </StatIcon>
            <StatText>+216 28 316 089</StatText>
          </StatItem>

          <StatItem
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
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
              {language === "fr"
                ? "Étudiant en Génie Logiciel"
                : "Software Engineering Student"}
            </StatText>
          </StatItem>
        </StatsCard>
      </Container>
    </HeroSection>
  );
};

export default Hero;
