import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiPlay,
  FiSmartphone,
  FiCamera,
  FiLock,
  FiX,
} from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";
import ProjectGallery from "./ProjectGallery";

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background: ${(props) => props.theme.colors.background};

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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.1) 0%,
    rgba(0, 153, 204, 0.1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectIcon = styled.div`
  font-size: 3rem;
  color: ${(props) => props.theme.colors.primary};
  opacity: 0.7;
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProjectType = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const ProjectDescription = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ProjectFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

const ProjectFeature = styled.li`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    flex-shrink: 0;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(0, 212, 255, 0.1);
  color: ${(props) => props.theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;

  &.primary {
    background: ${(props) => props.theme.colors.gradient};
    color: white;
  }

  &.secondary {
    background: transparent;
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  &.screenshots {
    background: rgba(0, 212, 255, 0.1);
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid rgba(0, 212, 255, 0.3);
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

const ScreenshotIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 212, 255, 0.9);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

// Modal styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
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
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const ModalIcon = styled.div`
  font-size: 4rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
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
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showRestrictedModal, setShowRestrictedModal] = useState(false);
  const { t, language } = useLanguage();

  const openGallery = (projectTitle) => {
    setSelectedProject(projectTitle);
  };

  const closeGallery = () => {
    setSelectedProject(null);
  };

  const openRestrictedModal = () => {
    setShowRestrictedModal(true);
  };

  const closeRestrictedModal = () => {
    setShowRestrictedModal(false);
  };

  const projects = [
    {
      title: "Medical App",
      type: t("projects.freelanceProject"),
      description: "Projet freelance",
      features: [
        "Complete medical management system",
        "Patient records and appointments",
        "Prescription management",
        "Medical history tracking",
        "Multi-role user system",
      ],
      tech: ["Flutter", "Firebase"],
      github: "https://github.com/NidhalBoumaiza/PFE-2025-Medical-App",
      hasScreenshots: true,
      screenshotCount: 27,
    },
    {
      title: "GASPINO",
      type: t("projects.freelanceProject"),
      description: "Projet freelance",
      features: [
        "Gas station management system",
        "Inventory tracking",
        "Sales management",
        "Customer management",
        "Reporting system",
      ],
      tech: ["Flutter", "MongoDB", "Express.js", "Node.js"],
      github: "https://github.com/NidhalBoumaiza/gaspino",
      hasScreenshots: true,
      screenshotCount: 11,
    },
    {
      title: "B.LOC APP",
      type: t("projects.freelanceProject"),
      description: "Projet freelance",
      features: [
        "Location-based services",
        "Real-time tracking",
        "User management system",
        "Interactive mapping",
        "Notification system",
      ],
      tech: ["Flutter", "Django", "PostgreSQL"],
      github: "https://github.com/NidhalBoumaiza/Bloc_Project",
      hasScreenshots: false,
    },
    {
      title: "TeamFlow",
      type: t("projects.academicProject"),
      description:
        language === "fr"
          ? "Développement d'une application web de gestion d'équipes appelée TeamFlow, avec un front-end en React et un back-end en Express.js. Elle permet de gérer les équipes, les membres, les tâches et les équipements de manière centralisée et efficace."
          : "Development of a team management web application called TeamFlow, with a React front-end and Express.js back-end. It allows managing teams, members, tasks and equipment in a centralized and efficient way.",
      features: [
        language === "fr" ? "Gestion des équipes" : "Team management",
        language === "fr" ? "Gestion des membres" : "Member management",
        language === "fr" ? "Gestion des tâches" : "Task management",
        language === "fr" ? "Gestion des équipements" : "Equipment management",
        language === "fr" ? "Interface centralisée" : "Centralized interface",
      ],
      tech: ["React", "Express.js", "MongoDB", "Node.js"],
      github: "https://github.com/NidhalBoumaiza/PFA",
      hasScreenshots: true,
      screenshotCount: 15,
    },
    {
      title: "Gestion de Librairie",
      type: t("projects.academicProject"),
      description:
        language === "fr"
          ? "Développement d'une application web de gestion de librairie avec un front-end en React et un back-end en Flask. Elle permet d'ajouter des livres et des auteurs, avec une liaison automatique entre les deux. L'application gère également les emprunts de livres, leur retour, et permet de suivre l'état de chaque emprunt."
          : "Development of a library management web application with a React front-end and Flask back-end. It allows adding books and authors, with automatic linking between them. The application also manages book loans, returns, and tracks the status of each loan.",
      features: [
        language === "fr"
          ? "Gestion des livres et auteurs"
          : "Book and author management",
        language === "fr"
          ? "Liaison automatique livre-auteur"
          : "Automatic book-author linking",
        language === "fr" ? "Gestion des emprunts" : "Loan management",
        language === "fr" ? "Suivi des retours" : "Return tracking",
        language === "fr" ? "État des emprunts" : "Loan status tracking",
      ],
      tech: ["React", "Flask", "MySQL", "Python", "Bootstrap"],
      github: "https://github.com/NidhalBoumaiza/Biblio_React",
      hasScreenshots: true,
      screenshotCount: 6,
    },
    {
      title: "HR Management System",
      type: t("projects.internshipProject"),
      description: "Projet de stage",
      features: [
        "Employee management",
        "Attendance tracking",
        "Payroll system",
        "Leave management",
        "Performance evaluation",
      ],
      tech: ["Flutter", "Express.js", "MongoDB"],
      github: "restricted", // Mark as restricted
      hasScreenshots: false,
    },
    {
      title: "Campfire Stories",
      type: t("projects.freelanceProject"),
      description: "Projet freelance",
      features: [
        "Story sharing platform",
        "User authentication",
        "Story categorization",
        "Rating system",
        "Social features",
      ],
      tech: ["Flutter", "Django", "PostgreSQL"],
      github: "https://github.com/NidhalBoumaiza/Camp_Project",
      demo: "https://campfire-stories-demo.netlify.app",
      hasScreenshots: false,
    },
  ];

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t("projects.title")}
        </SectionTitle>

        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectImage>
                {project.hasScreenshots && (
                  <ScreenshotIcon>
                    <FiCamera />
                  </ScreenshotIcon>
                )}
                <ProjectIcon>
                  {project.title.includes("Medical") ? (
                    <FiSmartphone />
                  ) : (
                    <FiPlay />
                  )}
                </ProjectIcon>
              </ProjectImage>

              <ProjectContent>
                <ProjectHeader>
                  <div>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectType>{project.type}</ProjectType>
                  </div>
                </ProjectHeader>

                <ProjectDescription>{project.description}</ProjectDescription>

                <ProjectFeatures>
                  {project.features.map((feature, idx) => (
                    <ProjectFeature key={idx}>{feature}</ProjectFeature>
                  ))}
                </ProjectFeatures>

                <TechStack>
                  {project.tech.map((tech, idx) => (
                    <TechTag key={idx}>{tech}</TechTag>
                  ))}
                </TechStack>

                <ProjectLinks>
                  {project.hasScreenshots && (
                    <ProjectLink
                      className="screenshots"
                      onClick={() => openGallery(project.title)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiCamera />
                      {t("projects.screenshots")}
                    </ProjectLink>
                  )}
                  <ProjectLink
                    className="secondary"
                    href={
                      project.github === "restricted" ? "#" : project.github
                    }
                    target={
                      project.github === "restricted" ? "_self" : "_blank"
                    }
                    rel={
                      project.github === "restricted"
                        ? ""
                        : "noopener noreferrer"
                    }
                    onClick={(e) => {
                      if (project.github === "restricted") {
                        e.preventDefault();
                        openRestrictedModal();
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {project.github === "restricted" ? (
                      <FiLock />
                    ) : (
                      <FiGithub />
                    )}
                    {t("projects.sourceCode")}
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>

      <ProjectGallery
        isOpen={!!selectedProject}
        onClose={closeGallery}
        projectTitle={selectedProject}
      />

      {/* Restricted Repository Modal */}
      {showRestrictedModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeRestrictedModal}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalCloseButton onClick={closeRestrictedModal}>
              <FiX />
            </ModalCloseButton>

            <ModalIcon>
              <FiLock />
            </ModalIcon>

            <ModalTitle>
              {language === "fr" ? "Code Non Disponible" : "Code Not Available"}
            </ModalTitle>

            <ModalText>
              {language === "fr"
                ? "Désolé, le code source de ce projet ne peut pas être partagé en raison de restrictions du client ou de l'entreprise. Cependant, je serais heureux de discuter des détails techniques et de l'architecture du projet lors d'un entretien."
                : "Sorry, the source code for this project cannot be shared due to client or company restrictions. However, I'd be happy to discuss the technical details and architecture of the project during an interview."}
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
