import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  SiFlutter,
  SiDart,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiExpress,
  SiReact,
  SiPython,
  SiAndroidstudio,
  SiPostman,
  SiFirebase,
} from "react-icons/si";
import { FiCode, FiSettings, FiGitBranch, FiImage } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const SkillCategory = styled(motion.div)`
  h3 {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 2rem;
    text-align: center;
  }
`;

const SkillItem = styled(motion.div)`
  margin-bottom: 2rem;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
`;

const SkillPercentage = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
`;

const SkillBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: ${(props) => props.theme.colors.gradient};
  border-radius: 4px;
`;

const TechStack = styled(motion.div)`
  margin-top: 4rem;
`;

const TechTitle = styled.h3`
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
  margin-bottom: 2rem;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
`;

const TechCard = styled(motion.div)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateY(-5px);
  }
`;

const TechIcon = styled.div`
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const TechName = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Skills = () => {
  const { t, language } = useLanguage();

  const programmingSkills = [
    { name: "Flutter/Dart", percentage: 90 },
    { name: "React/JavaScript", percentage: 65 },
    { name: "HTML/CSS", percentage: 75 },
    { name: "TypeScript", percentage: 80 },
  ];

  const backendSkills = [
    { name: "Express.js/Node.js", percentage: 90 },
    { name: "Flask/Python", percentage: 80 },
    { name: "MongoDB", percentage: 80 },
    { name: "Firebase", percentage: 80 },
  ];

  const technologies = [
    { name: "Flutter", icon: <SiFlutter /> },
    { name: "Dart", icon: <SiDart /> },
    { name: "React", icon: <SiReact /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "Node.js", icon: <FiCode /> },
    { name: "Flask", icon: <SiPython /> },
    { name: "Python", icon: <SiPython /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Android Studio", icon: <SiAndroidstudio /> },
    { name: "VS Code", icon: <FiSettings /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "Git", icon: <FiGitBranch /> },
    { name: "Figma", icon: <FiImage /> },
  ];

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t("skills.title")}
        </SectionTitle>

        <SkillsGrid>
          <SkillCategory
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>
              {language === "fr"
                ? "Technologies Frontend"
                : "Frontend Technologies"}
            </h3>
            {programmingSkills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillHeader>
                  <SkillName>{skill.name}</SkillName>
                  <SkillPercentage>{skill.percentage}%</SkillPercentage>
                </SkillHeader>
                <SkillBar>
                  <SkillProgress
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </SkillBar>
              </SkillItem>
            ))}
          </SkillCategory>

          <SkillCategory
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>
              {language === "fr"
                ? "Technologies Backend"
                : "Backend Technologies"}
            </h3>
            {backendSkills.map((skill, index) => (
              <SkillItem
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillHeader>
                  <SkillName>{skill.name}</SkillName>
                  <SkillPercentage>{skill.percentage}%</SkillPercentage>
                </SkillHeader>
                <SkillBar>
                  <SkillProgress
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </SkillBar>
              </SkillItem>
            ))}
          </SkillCategory>
        </SkillsGrid>

        <TechStack
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <TechTitle>Technologies & Tools</TechTitle>
          <TechGrid>
            {technologies.map((tech, index) => (
              <TechCard
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <TechIcon>{tech.icon}</TechIcon>
                <TechName>{tech.name}</TechName>
              </TechCard>
            ))}
          </TechGrid>
        </TechStack>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
