import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const ExperienceSection = styled.section`
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

const Timeline = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${(props) => props.theme.colors.primary};
    transform: translateX(-50%);

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      left: 2rem;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;

  &:nth-child(even) {
    flex-direction: row-reverse;

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      flex-direction: row;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-left: 4rem;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  width: 16px;
  height: 16px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: ${(props) => props.theme.colors.background};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    left: 2rem;
  }
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  width: 45%;
  margin: 0 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: calc(100% - 4rem);
    margin: 0;
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ExperienceIcon = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const ExperienceTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.3rem;
  font-weight: 600;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Company = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 500;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Achievements = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`;

const Achievement = styled.li`
  color: ${(props) => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 50%;
    margin-top: 0.5rem;
    flex-shrink: 0;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: rgba(0, 212, 255, 0.1);
  color: ${(props) => props.theme.colors.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      title: t("experience.experiences.freelance.title"),
      company: t("experience.experiences.freelance.company"),
      duration: t("experience.experiences.freelance.duration"),
      location: t("experience.experiences.freelance.location"),
      description: t("experience.experiences.freelance.description"),
      achievements: t("experience.experiences.freelance.achievements"),
      technologies: [
        "Flutter",
        "Dart",
        "Firebase",
        "MongoDB",
        "Express.js",
        "Node.js",
      ],
    },
    {
      title: t("experience.experiences.endOfStudies.title"),
      company: t("experience.experiences.endOfStudies.company"),
      duration: t("experience.experiences.endOfStudies.duration"),
      location: t("experience.experiences.endOfStudies.location"),
      description: t("experience.experiences.endOfStudies.description"),
      achievements: t("experience.experiences.endOfStudies.achievements"),
      technologies: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js"],
    },
    {
      title: t("experience.experiences.development.title"),
      company: t("experience.experiences.development.company"),
      duration: t("experience.experiences.development.duration"),
      location: t("experience.experiences.development.location"),
      description: t("experience.experiences.development.description"),
      achievements: t("experience.experiences.development.achievements"),
      technologies: ["Flutter", "Node.js", "MongoDB", "Express.js"],
    },
    {
      title: t("experience.experiences.initiation.title"),
      company: t("experience.experiences.initiation.company"),
      duration: t("experience.experiences.initiation.duration"),
      location: t("experience.experiences.initiation.location"),
      description: t("experience.experiences.initiation.description"),
      achievements: t("experience.experiences.initiation.achievements"),
      technologies: ["Prestashop"],
    },
  ];

  return (
    <ExperienceSection id="experience">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t("experience.professionalExperience")}
        </SectionTitle>

        <Timeline>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TimelineDot />
              <ExperienceCard
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ExperienceHeader>
                  <ExperienceIcon>
                    <FiBriefcase />
                  </ExperienceIcon>
                  <ExperienceTitle>{exp.title}</ExperienceTitle>
                </ExperienceHeader>

                <CompanyInfo>
                  <Company>{exp.company}</Company>
                  <Duration>
                    <FiCalendar />
                    {exp.duration}
                  </Duration>
                  <Location>
                    <FiMapPin />
                    {exp.location}
                  </Location>
                </CompanyInfo>

                <Description>{exp.description}</Description>

                <Achievements>
                  {exp.achievements.map((achievement, achIndex) => (
                    <Achievement key={achIndex}>{achievement}</Achievement>
                  ))}
                </Achievements>

                <TechStack>
                  {exp.technologies.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechStack>
              </ExperienceCard>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </ExperienceSection>
  );
};

export default Experience;
