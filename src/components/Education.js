import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const EducationSection = styled.section`
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
  margin-bottom: 1rem;
  background: ${(props) => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.2rem;
  margin-bottom: 4rem;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${(props) => props.theme.colors.primary};
    transform: translateX(-50%);

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      left: 20px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;

  &:nth-child(odd) {
    flex-direction: row;

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      flex-direction: row;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      flex-direction: row;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-left: 40px;
  }
`;

const TimelineContent = styled(motion.div)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 15px;
  padding: 2rem;
  width: calc(50% - 40px);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    transform: translateY(-50%);
  }

  ${TimelineItem}:nth-child(odd) & {
    margin-right: 40px;

    &::before {
      right: -20px;
      border-left-color: rgba(0, 212, 255, 0.2);
    }
  }

  ${TimelineItem}:nth-child(even) & {
    margin-left: 40px;

    &::before {
      left: -20px;
      border-right-color: rgba(0, 212, 255, 0.2);
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: calc(100% - 40px);
    margin-left: 0 !important;
    margin-right: 0 !important;

    &::before {
      left: -20px !important;
      right: auto !important;
      border-left-color: transparent !important;
      border-right-color: rgba(0, 212, 255, 0.2) !important;
    }
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-5px);
    transition: all 0.3s ease;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  border: 4px solid ${(props) => props.theme.colors.background};
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    left: 20px;
  }
`;

const EducationTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Institution = styled.h4`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const EducationDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Achievements = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Achievement = styled.li`
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

const Education = () => {
  const { t, language } = useLanguage();

  const educationData = [
    {
      title:
        language === "fr"
          ? "Cycle Ingénieure en Génie Logiciel – 2ème année"
          : "Software Engineering Degree – 2nd Year",
      institution: "Iteam University",
      period: "09/2023 - 05/2026",
      location: "Tunisia",
      description:
        language === "fr"
          ? "Formation d'ingénieur en génie logiciel avec spécialisation dans le développement d'applications modernes et les technologies avancées."
          : "Software engineering degree with specialization in modern application development and advanced technologies.",
      achievements:
        language === "fr"
          ? [
              "Formation avancée en génie logiciel",
              "Développement d'applications web et mobiles",
              "Méthodologies de développement Agile",
              "Architecture logicielle et design patterns",
              "Technologies de pointe et frameworks modernes",
            ]
          : [
              "Advanced software engineering training",
              "Web and mobile application development",
              "Agile development methodologies",
              "Software architecture and design patterns",
              "Cutting-edge technologies and modern frameworks",
            ],
    },
    {
      title:
        language === "fr"
          ? "Licence en Développement des Systèmes d'Informations"
          : "Bachelor's in Information Systems Development",
      institution:
        "Institut Supérieur des Études Technologiques de Nabeul",
      period: "09/2022 - 06/2023",
      location: "Nabeul, Tunisia",
      description:
        language === "fr"
          ? "Formation spécialisée dans le développement des systèmes d'information et la programmation."
          : "Specialized training in information systems development and programming.",
      achievements:
        language === "fr"
          ? [
              "Développement de systèmes d'information",
              "Programmation et bases de données",
              "Analyse et conception de systèmes",
              "Projets pratiques en développement logiciel",
            ]
          : [
              "Information systems development",
              "Programming and databases",
              "Systems analysis and design",
              "Practical software development projects",
            ],
    },
    {
      title:
        language === "fr"
          ? "Baccalauréat en Sciences de l'Informatique"
          : "Computer Science Baccalaureate",
      institution: "Lycée Abd Laaziz El Akremi Gafsa",
      period: "09/2019 - 06/2020",
      location: "Gafsa, Tunisia",
      description:
        language === "fr"
          ? "Formation en sciences de l'informatique avec introduction aux concepts fondamentaux de la programmation."
          : "Computer science education with introduction to fundamental programming concepts.",
      achievements:
        language === "fr"
          ? [
              "Fondamentaux de l'informatique",
              "Introduction à la programmation",
              "Mathématiques appliquées",
              "Logique et algorithmes de base",
            ]
          : [
              "Computer science fundamentals",
              "Introduction to programming",
              "Applied mathematics",
              "Logic and basic algorithms",
            ],
    },
  ];

  return (
    <EducationSection id="education">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t("education.title")}
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t("education.subtitle")}
        </SectionSubtitle>

        <Timeline>
          {educationData.map((item, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              <TimelineContent
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <EducationTitle>{item.title}</EducationTitle>
                <Institution>{item.institution}</Institution>

                <EducationDetails>
                  <DetailItem>
                    <FiCalendar />
                    {item.period}
                  </DetailItem>
                  <DetailItem>
                    <FiMapPin />
                    {item.location}
                  </DetailItem>
                </EducationDetails>

                <Description>{item.description}</Description>

                <Achievements>
                  {item.achievements.map((achievement, idx) => (
                    <Achievement key={idx}>{achievement}</Achievement>
                  ))}
                </Achievements>
              </TimelineContent>

              <TimelineDot />
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </EducationSection>
  );
};

export default Education;
