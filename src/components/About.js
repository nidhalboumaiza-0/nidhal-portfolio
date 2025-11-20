import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiCode,
  FiZap,
  FiSmartphone,
  FiTrendingUp,
} from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const AboutSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.05) 0%,
    rgba(0, 153, 204, 0.05) 100%
  );

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 4rem;
  background: ${(props) => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextContent = styled(motion.div)`
  h3 {
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const PassionCards = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const PassionCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-5px);
  }
`;

const PassionIcon = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const PassionTitle = styled.h4`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const PassionDescription = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const About = () => {
  const { t } = useLanguage();

  const passions = [
    {
      icon: <FiZap />,
      title: t("about.passions.innovation.title"),
      description: t("about.passions.innovation.description"),
    },
    {
      icon: <FiCode />,
      title: t("about.passions.problemSolving.title"),
      description: t("about.passions.problemSolving.description"),
    },
    {
      icon: <FiSmartphone />,
      title: t("about.passions.mobileFirst.title"),
      description: t("about.passions.mobileFirst.description"),
    },
    {
      icon: <FiTrendingUp />,
      title: t("about.passions.continuousLearning.title"),
      description: t("about.passions.continuousLearning.description"),
    },
  ];

  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t("about.title")}
        </SectionTitle>

        <Content>
          <TextContent
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>{t("about.subtitle")}</h3>
            <p>{t("about.description1")}</p>
            <p>{t("about.description2")}</p>
            <p>{t("about.description3")}</p>
          </TextContent>

          <PassionCards
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {passions.map((passion, index) => (
              <PassionCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <PassionIcon>{passion.icon}</PassionIcon>
                <PassionTitle>{passion.title}</PassionTitle>
                <PassionDescription>
                  {passion.description}
                </PassionDescription>
              </PassionCard>
            ))}
          </PassionCards>
        </Content>
      </Container>
    </AboutSection>
  );
};

export default About;
