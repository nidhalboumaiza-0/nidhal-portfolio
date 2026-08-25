import React from "react";
import { Routes, Route } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";

// Components
import ParticleBackground from "./components/ParticleBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RoleFit from "./components/RoleFit";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

// Theme
const theme = {
  colors: {
    primary: "#8B5CF6",
    secondary: "#22D3EE",
    accent: "#F472B6",
    background: "#05060E",
    surface: "#0D1020",
    card: "rgba(17, 21, 38, 0.72)",
    border: "rgba(255, 255, 255, 0.08)",
    text: "#F4F6FF",
    textSecondary: "#9BA3C2",
    gradient:
      "linear-gradient(120deg, #A78BFA 0%, #8B5CF6 30%, #22D3EE 100%)",
    glow: "rgba(139, 92, 246, 0.35)",
  },
  fonts: {
    primary:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "'Sora', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4 {
    font-family: ${(props) => props.theme.fonts.display};
    letter-spacing: -0.02em;
  }

  ::selection {
    background: rgba(139, 92, 246, 0.45);
    color: #ffffff;
  }

  :focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.secondary};
    outline-offset: 3px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #8b5cf6, #22d3ee);
    border-radius: 8px;
    border: 2px solid ${(props) => props.theme.colors.background};
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

/* Gradient progress bar pinned to the top of the viewport */
const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: ${(props) => props.progress}%;
  background: linear-gradient(90deg, #8b5cf6, #22d3ee, #f472b6);
  z-index: 2000;
  border-radius: 0 999px 999px 0;
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.7);
  transition: width 0.08s linear;
`;

function App() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <LanguageProvider>
        <AppContainer>
          <ParticleBackground />
          <ProgressBar progress={progress} />
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
                    <RoleFit />
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
