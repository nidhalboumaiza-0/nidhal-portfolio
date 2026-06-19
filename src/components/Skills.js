import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiReact,
} from "react-icons/si";
import {
  FiBox,
  FiCheckCircle,
  FiCode,
  FiGitBranch,
  FiLayers,
  FiMonitor,
  FiPenTool,
  FiSmartphone,
} from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const SkillsSection = styled.section`
  padding: 7rem 2rem;
  background: ${(props) => props.theme.colors.background};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionIntro = styled(motion.div)`
  text-align: center;
  max-width: 720px;
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

const ClusterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Cluster = styled(motion.div)`
  background: linear-gradient(180deg, rgba(26, 26, 26, 0.92), rgba(14, 18, 22, 0.92));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 1.5rem;
  min-height: 260px;

  h3 {
    color: ${(props) => props.theme.colors.text};
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  h3 svg {
    color: ${(props) => props.theme.colors.primary};
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: 0.92rem;
    line-height: 1.6;
    margin-bottom: 1.1rem;
  }
`;

const PillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const Pill = styled.span`
  color: ${(props) => props.theme.colors.text};
  background: rgba(0, 212, 255, 0.09);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 999px;
  padding: 0.42rem 0.72rem;
  font-size: 0.82rem;
  font-weight: 600;
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
  gap: 0.85rem;
`;

const Tool = styled(motion.div)`
  height: 112px;
  background: rgba(26, 26, 26, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 0.8rem;

  svg {
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.8rem;
    margin-bottom: 0.45rem;
  }

  span {
    color: ${(props) => props.theme.colors.text};
    font-size: 0.82rem;
    font-weight: 700;
  }
`;

const Skills = () => {
  const { t, language } = useLanguage();

  const clusters =
    language === "fr"
      ? [
          {
            title: "Mobile & Web",
            icon: <FiSmartphone />,
            text: "Apps Flutter multi-plateformes, interfaces React, responsive design et UI fidèle aux maquettes.",
            skills: ["Flutter", "Dart", "React", "Figma to UI", "Bloc/GetX", "Responsive UI"],
          },
          {
            title: "Backend & Data",
            icon: <FiLayers />,
            text: "APIs REST avec Express.js, intégrations Firebase/MongoDB/MySQL, auth, notifications et workflows métier.",
            skills: ["TypeScript", "Node.js", "Express.js", "REST APIs", "MongoDB", "Firebase"],
          },
          {
            title: "Qualité & Livraison",
            icon: <FiCheckCircle />,
            text: "Code propre, Git, revues, debugging, tests et pratiques de livraison prêtes à monter en puissance.",
            skills: ["Jest", "flutter_test", "Docker", "GitHub Actions", "Postman", "Code Reviews"],
          },
        ]
      : [
          {
            title: "Mobile & Web",
            icon: <FiSmartphone />,
            text: "Cross-platform Flutter apps, React interfaces, responsive design, and Figma-matching screens.",
            skills: ["Flutter", "Dart", "React", "Figma to UI", "Bloc/GetX", "Responsive UI"],
          },
          {
            title: "Backend & Data",
            icon: <FiLayers />,
            text: "REST APIs with Express.js, Firebase/MongoDB/MySQL integrations, auth, notifications, and business flows.",
            skills: ["TypeScript", "Node.js", "Express.js", "REST APIs", "MongoDB", "Firebase"],
          },
          {
            title: "Quality & Delivery",
            icon: <FiCheckCircle />,
            text: "Clean code, Git, reviews, debugging, tests, and deployment practices ready to grow fast.",
            skills: ["Jest", "flutter_test", "Docker", "GitHub Actions", "Postman", "Code Reviews"],
          },
        ];

  const tools = [
    { name: "Flutter", icon: <SiFlutter /> },
    { name: "Dart", icon: <SiDart /> },
    { name: "TypeScript", icon: <FiCode /> },
    { name: "React", icon: <SiReact /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "Express.js", icon: <SiExpress /> },
    { name: "Docker", icon: <FiBox /> },
    { name: "Jest", icon: <FiCheckCircle /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Git", icon: <FiGitBranch /> },
    { name: "Postman", icon: <SiPostman /> },
    { name: "DevTools", icon: <FiMonitor /> },
    { name: "Figma", icon: <FiPenTool /> },
  ];

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionIntro
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <SectionTitle>{t("skills.title")}</SectionTitle>
          <SectionSubtitle>{t("skills.subtitle")}</SectionSubtitle>
        </SectionIntro>

        <ClusterGrid>
          {clusters.map((cluster, index) => (
            <Cluster
              key={cluster.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <h3>
                {cluster.icon}
                {cluster.title}
              </h3>
              <p>{cluster.text}</p>
              <PillList>
                {cluster.skills.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </PillList>
            </Cluster>
          ))}
        </ClusterGrid>

        <ToolGrid>
          {tools.map((tool, index) => (
            <Tool
              key={tool.name}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: index * 0.025 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div>
                {tool.icon}
                <span>{tool.name}</span>
              </div>
            </Tool>
          ))}
        </ToolGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
