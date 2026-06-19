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
  padding: 4rem 2rem 6rem;
  background:
    radial-gradient(circle at 18% 20%, rgba(255, 107, 107, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(0, 212, 255, 0.05) 100%);

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 3rem 1rem 4rem;
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

const Label = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  margin-bottom: 0.8rem;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  max-width: 780px;
`;

const Summary = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: 360px;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  min-height: 160px;
  padding: 1.4rem;
  border-radius: 18px;
  background: rgba(18, 22, 26, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);

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
          label: "Ciblé pour ce poste",
          title: "Full Stack Developer: Flutter, Express, robustesse et produit réel.",
          summary:
            "Une page plus directe: production, API, tests, UI fidèle aux maquettes et livraison multi-plateforme.",
          cards: [
            ["App publiée", "Barberio est en production sur App Store et Google Play.", <FiSmartphone />],
            ["Backend solide", "Express, REST APIs, MongoDB/Firebase, validation et gestion d'erreurs.", <FiLayers />],
            ["Qualité", "Code réutilisable, revues, tests Jest et tests Flutter à renforcer.", <FiCheckCircle />],
            ["Déploiement", "Docker, GitHub Actions et pipelines CI/CD comme axe de montée en puissance.", <FiBox />],
            ["UI précise", "Conversion Figma vers pages responsive avec attention aux détails.", <FiCode />],
            ["Collaboration", "Git, branches, PRs, architecture et amélioration continue.", <FiGitBranch />],
          ],
        }
      : {
          label: "Role-targeted",
          title: "Full Stack Developer: Flutter, Express, reliability, real production.",
          summary:
            "Sharper positioning around production apps, APIs, tests, Figma-perfect UI, and cross-platform delivery.",
          cards: [
            ["Published app", "Barberio is live on App Store and Google Play.", <FiSmartphone />],
            ["Backend craft", "Express, REST APIs, MongoDB/Firebase, validation, and error handling.", <FiLayers />],
            ["Quality loop", "Reusable code, reviews, Jest tests, and Flutter test coverage as a priority.", <FiCheckCircle />],
            ["Deployment ready", "Docker, GitHub Actions, and CI/CD pipelines as the next strong signal.", <FiBox />],
            ["Pixel focus", "Figma-to-responsive UI with clean, platform-aware screens.", <FiCode />],
            ["Team workflow", "Git branches, PRs, architecture discussion, and best practices.", <FiGitBranch />],
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
            <Label>{content.label}</Label>
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
              whileHover={{ y: -6 }}
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
