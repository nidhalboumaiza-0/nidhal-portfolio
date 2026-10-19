import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiBox,
  FiCheckCircle,
  FiCode,
  FiGitBranch,
  FiLayers,
  FiSmartphone,
} from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const Section = styled.section`
  padding: 2rem 2rem 5rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 1.25rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-end;
  margin-bottom: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: 2.25rem;
  line-height: 1.3;
  max-width: 720px;
  text-wrap: balance;
  @media (max-width: 768px) { font-size: 1.75rem; }
`;

const Summary = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: 360px;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  min-height: 160px;
  padding: 1.4rem 0;
  border-top: 1px solid ${(props) => props.theme.colors.border};

  svg {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.65rem;
    margin-bottom: 1rem;
  }

  h3 {
    color: ${(props) => props.theme.colors.text};
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.92rem;
    line-height: 1.6;
  }
`;

const RoleFit = () => {
  const { language } = useLanguage();

  const content =
    language === "fr"
      ? {
          label: "En bref",
          title: "Ingénieur logiciel: Flutter, full-stack et applications en production.",
          summary:
            "Applications mobiles publiées, APIs et back-offices web, du besoin jusqu'à la mise en ligne.",
          cards: [
            ["Apps publiées", "Barberio (mon application) et Maqra'at Al-Rajhi (client) sont disponibles sur l'App Store et Google Play.", <FiSmartphone />],
            ["Mobile", "Flutter, Dart, BLoC, Firebase, Supabase, Google Maps, notifications push et support arabe RTL.", <FiCheckCircle />],
            ["Backend", "Laravel 12, Node.js/Express, Flask, REST APIs et WebSockets temps réel (Reverb, Socket.IO).", <FiLayers />],
            ["Web", "Back-offices et dashboards avec React, Next.js et TypeScript.", <FiCode />],
            ["Déploiement", "Docker, Linux/VPS, publication App Store et Google Play.", <FiBox />],
            ["Méthode", "Git/GitHub, Clean Architecture, MVC, Agile/Scrum.", <FiGitBranch />],
          ],
        }
      : {
          label: "At a glance",
          title: "Software engineer: Flutter, full-stack, and apps in production.",
          summary:
            "Published mobile apps, APIs, and web back offices, from requirements to release.",
          cards: [
            ["Published apps", "Barberio (my own app) and Maqra'at Al-Rajhi (client app) are live on the App Store and Google Play.", <FiSmartphone />],
            ["Mobile", "Flutter, Dart, BLoC, Firebase, Supabase, Google Maps, push notifications, and Arabic RTL support.", <FiCheckCircle />],
            ["Backend", "Laravel 12, Node.js/Express, Flask, REST APIs, and real-time WebSockets (Reverb, Socket.IO).", <FiLayers />],
            ["Web", "Admin back offices and dashboards with React, Next.js, and TypeScript.", <FiCode />],
            ["Deployment", "Docker, Linux/VPS, and App Store / Google Play releases.", <FiBox />],
            ["Workflow", "Git/GitHub, Clean Architecture, MVC, Agile/Scrum.", <FiGitBranch />],
          ],
        };

  return (
    <Section>
      <Container>
        <Header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div>
            <Title>{content.title}</Title>
          </div>
          <Summary>{content.summary}</Summary>
        </Header>

        <Grid>
          {content.cards.map(([title, text, icon], index) => (
            <Card
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              viewport={{ once: true }}
            >
              {icon}
              <h3>{title}</h3>
              <p>{text}</p>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default RoleFit;
