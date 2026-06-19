import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiCamera,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiLock,
  FiPlay,
  FiSmartphone,
  FiX,
} from "react-icons/fi";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import ProjectGallery from "./ProjectGallery";

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background:
    radial-gradient(circle at 82% 8%, rgba(0, 212, 255, 0.1), transparent 28%),
    ${(props) => props.theme.colors.background};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 3rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 0.8rem;
  background: ${(props) => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.08rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.article)`
  min-height: ${(props) => (props.featured ? "440px" : "auto")};
  grid-column: ${(props) => (props.featured ? "1 / -1" : "auto")};
  display: grid;
  grid-template-columns: ${(props) => (props.featured ? "1fr 0.9fr" : "1fr")};
  gap: ${(props) => (props.featured ? "2rem" : "0")};
  background: linear-gradient(180deg, rgba(26, 26, 26, 0.94), rgba(13, 17, 22, 0.94));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Visual = styled.div`
  min-height: ${(props) => (props.featured ? "440px" : "190px")};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(0, 212, 255, 0.18), rgba(255, 107, 107, 0.12)),
    #11161c;
`;

const ScreenshotBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  background: rgba(0, 212, 255, 0.88);
  border-radius: 999px;
  padding: 0.5rem 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 800;
  font-size: 0.75rem;
`;

const PhoneFrame = styled.div`
  width: ${(props) => (props.compact ? "132px" : "210px")};
  aspect-ratio: 9 / 18.6;
  border-radius: ${(props) => (props.compact ? "28px" : "38px")};
  padding: ${(props) => (props.compact ? "8px" : "11px")};
  background: linear-gradient(145deg, #f7f7f8, #181b20 18%, #050608);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.38);
  transform: rotate(${(props) => props.rotate || "0deg"});
`;

const PhoneScreen = styled.div`
  height: 100%;
  border-radius: ${(props) => (props.compact ? "22px" : "30px")};
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(0, 212, 255, 0.18), rgba(0, 0, 0, 0) 36%),
    #0b1015;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 50%;
    width: 40%;
    height: 5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    transform: translateX(-50%);
  }
`;

const PhoneUi = styled.div`
  height: 100%;
  padding: ${(props) => (props.compact ? "2.2rem 0.8rem 0.8rem" : "3rem 1rem 1rem")};
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const AppLogo = styled.div`
  width: ${(props) => (props.compact ? "42px" : "58px")};
  height: ${(props) => (props.compact ? "42px" : "58px")};
  border-radius: 16px;
  background: ${(props) => props.color || "linear-gradient(135deg, #00d4ff, #ff6b6b)"};
  display: grid;
  place-items: center;
  color: white;
  font-weight: 900;
  margin-bottom: 0.4rem;
`;

const UiLine = styled.div`
  height: ${(props) => props.large ? "42px" : "12px"};
  width: ${(props) => props.width || "100%"};
  border-radius: 999px;
  background: rgba(255, 255, 255, ${(props) => props.soft ? "0.09" : "0.18"});
`;

const UiCard = styled.div`
  min-height: ${(props) => props.compact ? "48px" : "72px"};
  border-radius: 16px;
  padding: 0.7rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: grid;
  gap: 0.45rem;
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.primary};
  opacity: 0.76;
`;

const Content = styled.div`
  padding: ${(props) => (props.featured ? "2.2rem" : "1.6rem")};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Eyebrow = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
`;

const ProjectTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: ${(props) => props.featured ? "clamp(2rem, 4vw, 3.3rem)" : "1.35rem"};
  line-height: 1.05;
  margin-bottom: 0.85rem;
`;

const ProjectDescription = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.7;
  font-size: ${(props) => props.featured ? "1.05rem" : "0.95rem"};
  margin-bottom: 1.2rem;
  max-width: 650px;
`;

const FeatureList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.55rem;
  margin-bottom: 1.2rem;
`;

const Feature = styled.li`
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.92rem;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.primary};
    flex: 0 0 auto;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.3rem;
`;

const TechTag = styled.span`
  background: rgba(0, 212, 255, 0.1);
  color: ${(props) => props.theme.colors.primary};
  padding: 0.32rem 0.72rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 800;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Action = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 42px;
  padding: 0.72rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  border: 1px solid rgba(0, 212, 255, 0.35);
  color: ${(props) => props.theme.colors.primary};
  background: rgba(0, 212, 255, 0.08);
  font-size: 0.86rem;
  font-weight: 800;
  cursor: pointer;

  &.primary {
    color: white;
    border-color: transparent;
    background: ${(props) => props.theme.colors.gradient};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalIcon = styled.div`
  font-size: 4rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ModalText = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ModalButton = styled(motion.button)`
  background: ${(props) => props.theme.colors.gradient};
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 999px;
  font-weight: 800;
  cursor: pointer;
`;

const ProjectVisual = ({ project }) => {
  if (project.phone) {
    return (
      <Visual featured={project.featured}>
        {project.hasScreenshots && (
          <ScreenshotBadge>
            <FiCamera />
            {project.screenshotCount}
          </ScreenshotBadge>
        )}
        <PhoneFrame compact={!project.featured} rotate={project.featured ? "-5deg" : "0deg"}>
          <PhoneScreen compact={!project.featured}>
            <PhoneUi compact={!project.featured}>
              <AppLogo compact={!project.featured} color={project.color}>
                {project.logo}
              </AppLogo>
              <UiLine width="68%" />
              <UiLine width="88%" soft />
              <UiCard compact={!project.featured}>
                <UiLine width="55%" />
                <UiLine width="82%" soft />
                <UiLine width="44%" soft />
              </UiCard>
              <UiCard compact={!project.featured}>
                <UiLine width="62%" />
                <UiLine width="76%" soft />
              </UiCard>
              {project.featured && <UiLine large width="100%" />}
            </PhoneUi>
          </PhoneScreen>
        </PhoneFrame>
      </Visual>
    );
  }

  return (
    <Visual featured={project.featured}>
      {project.hasScreenshots && (
        <ScreenshotBadge>
          <FiCamera />
          {project.screenshotCount}
        </ScreenshotBadge>
      )}
      <ProjectIcon>
        {project.web ? <FiGlobe /> : project.mobile ? <FiSmartphone /> : <FiPlay />}
      </ProjectIcon>
    </Visual>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showRestrictedModal, setShowRestrictedModal] = useState(false);
  const { t, language } = useLanguage();

  const projects = [
    {
      title: "Barberio",
      type: t("projects.liveProduct"),
      featured: true,
      phone: true,
      logo: "B",
      color: "linear-gradient(135deg, #101820, #00d4ff)",
      description:
        language === "fr"
          ? "Première application personnelle en production: réservation de coiffeurs en Tunisie pour clients, barbiers et gérants de salons."
          : "My first personal production app: barber booking in Tunisia for clients, barbers, and salon owners.",
      features:
        language === "fr"
          ? ["Publiée sur App Store et Google Play", "Réservation, rappels, avis et portfolios", "Planning, équipe, services et tableau de bord"]
          : ["Published on App Store and Google Play", "Bookings, reminders, reviews, and portfolios", "Scheduling, team, services, and dashboard"],
      tech: ["Flutter", "Dart", "Firebase", "Notifications", "Production"],
      appStore: "https://apps.apple.com/us/app/barberio/id6761790714",
      googlePlay: "https://play.google.com/store/apps/details?id=io.barberio.app",
      website: "https://barber-khaki-five.vercel.app/",
    },
    {
      title: "Medical App",
      type: t("projects.freelanceProject"),
      phone: true,
      logo: "M",
      color: "linear-gradient(135deg, #0fa3b1, #6fffe9)",
      description:
        language === "fr"
          ? "Application médicale mobile avec rendez-vous, messagerie, localisation et données temps réel."
          : "Medical mobile app with appointments, messaging, location features, and real-time data.",
      features: ["Appointments", "Firebase auth", "Messaging"],
      tech: ["Flutter", "Firebase"],
      github: "https://github.com/nidhalboumaiza-0/PFE-2025-Medical-App",
      hasScreenshots: true,
      screenshotCount: 27,
    },
    {
      title: "TeamFlow",
      type: t("projects.academicProject"),
      web: true,
      description:
        language === "fr"
          ? "Application web de gestion d'équipes, tâches, membres et équipements avec React et Express."
          : "Team, task, member, and equipment management web app with React and Express.",
      features: ["React UI", "Express API", "MongoDB"],
      tech: ["React", "Express.js", "MongoDB", "Node.js"],
      github: "https://github.com/nidhalboumaiza-0/PFA",
      hasScreenshots: true,
      screenshotCount: 15,
    },
    {
      title: "GASPINO",
      type: t("projects.freelanceProject"),
      phone: true,
      logo: "G",
      color: "linear-gradient(135deg, #1f7a4d, #ffd166)",
      description:
        language === "fr"
          ? "Application Flutter + Node.js pour réduire le gaspillage de produits alimentaires."
          : "Flutter + Node.js app for reducing food product waste.",
      features: ["Flutter app", "Express backend", "MongoDB"],
      tech: ["Flutter", "MongoDB", "Express.js", "Node.js"],
      github: "https://github.com/nidhalboumaiza-0/gaspino",
      hasScreenshots: true,
      screenshotCount: 11,
    },
    {
      title: "Gestion de Librairie",
      type: t("projects.academicProject"),
      web: true,
      description:
        language === "fr"
          ? "Gestion de livres, auteurs, emprunts et retours avec React, Flask et MySQL."
          : "Book, author, loan, and return management with React, Flask, and MySQL.",
      features: ["React UI", "Flask API", "MySQL"],
      tech: ["React", "Flask", "MySQL", "Python"],
      github: "https://github.com/nidhalboumaiza-0/Biblio_React",
      hasScreenshots: true,
      screenshotCount: 6,
    },
    {
      title: "HR Management System",
      type: t("projects.internshipProject"),
      phone: true,
      logo: "HR",
      color: "linear-gradient(135deg, #3a86ff, #8338ec)",
      description:
        language === "fr"
          ? "Plateforme RH mobile et backend pour workflows internes chez Neopolis."
          : "Mobile and backend HR platform for internal Neopolis workflows.",
      features: ["Flutter", "Express.js", "MongoDB"],
      tech: ["Flutter", "Express.js", "MongoDB"],
      github: "restricted",
    },
  ];

  const openGallery = (projectTitle) => setSelectedProject(projectTitle);
  const closeGallery = () => setSelectedProject(null);
  const openRestrictedModal = () => setShowRestrictedModal(true);
  const closeRestrictedModal = () => setShowRestrictedModal(false);

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <SectionTitle>{t("projects.title")}</SectionTitle>
          <SectionSubtitle>{t("projects.subtitle")}</SectionSubtitle>
        </SectionHeader>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              featured={project.featured}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <ProjectVisual project={project} />

              <Content featured={project.featured}>
                <Eyebrow>{project.type}</Eyebrow>
                <ProjectTitle featured={project.featured}>
                  {project.title}
                </ProjectTitle>
                <ProjectDescription featured={project.featured}>
                  {project.description}
                </ProjectDescription>

                <FeatureList>
                  {project.features.map((feature) => (
                    <Feature key={feature}>{feature}</Feature>
                  ))}
                </FeatureList>

                <TechStack>
                  {project.tech.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </TechStack>

                <Actions>
                  {project.appStore && (
                    <Action
                      className="primary"
                      href={project.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <FaApple />
                      {t("projects.appStore")}
                    </Action>
                  )}
                  {project.googlePlay && (
                    <Action
                      href={project.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <FaGooglePlay />
                      {t("projects.googlePlay")}
                    </Action>
                  )}
                  {project.website && (
                    <Action
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <FiExternalLink />
                      {t("projects.website")}
                    </Action>
                  )}
                  {project.hasScreenshots && (
                    <Action
                      as="button"
                      type="button"
                      onClick={() => openGallery(project.title)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <FiCamera />
                      {t("projects.screenshots")}
                    </Action>
                  )}
                  {project.github && (
                    <Action
                      href={project.github === "restricted" ? "#" : project.github}
                      target={project.github === "restricted" ? "_self" : "_blank"}
                      rel={project.github === "restricted" ? "" : "noopener noreferrer"}
                      onClick={(e) => {
                        if (project.github === "restricted") {
                          e.preventDefault();
                          openRestrictedModal();
                        }
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      {project.github === "restricted" ? <FiLock /> : <FiGithub />}
                      {t("projects.sourceCode")}
                    </Action>
                  )}
                </Actions>
              </Content>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>

      <ProjectGallery
        isOpen={!!selectedProject}
        onClose={closeGallery}
        projectTitle={selectedProject}
      />

      {showRestrictedModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeRestrictedModal}
        >
          <ModalContent
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalCloseButton onClick={closeRestrictedModal}>
              <FiX />
            </ModalCloseButton>
            <ModalIcon>
              <FiLock />
            </ModalIcon>
            <ModalTitle>
              {language === "fr" ? "Code non disponible" : "Code not available"}
            </ModalTitle>
            <ModalText>
              {language === "fr"
                ? "Le code source de ce projet ne peut pas être partagé à cause de restrictions client ou entreprise. Je peux toutefois expliquer l'architecture et les décisions techniques en entretien."
                : "The source code cannot be shared due to client or company restrictions. I can still walk through the architecture and technical decisions in an interview."}
            </ModalText>
            <ModalButton
              onClick={closeRestrictedModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === "fr" ? "Compris" : "Understood"}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </ProjectsSection>
  );
};

export default Projects;
