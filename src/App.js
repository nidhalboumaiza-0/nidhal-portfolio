import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";

// Components
import ParticleBackground from "./components/ParticleBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

// Theme
const theme = {
  colors: {
    primary: "#00D4FF",
    secondary: "#0099CC",
    accent: "#FF6B6B",
    background: "#0A0A0A",
    surface: "#1A1A1A",
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
    gradient: "linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)",
  },
  fonts: {
    primary:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Fira Code', 'Consolas', monospace",
  },
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1440px",
  },
};

// Global Styles
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: ${(props) => props.theme.fonts.primary};
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.secondary};
  }
`;

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

const MainContent = styled(motion.main)`
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LanguageProvider>
        <AppContainer>
          <ParticleBackground />
          <LanguageToggle />
          <Header />
          <MainContent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <About />
                    <Skills />
                    <Experience />
                    <Projects />
                    <Education />
                    <Contact />
                  </>
                }
              />
            </Routes>
          </MainContent>
        </AppContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
