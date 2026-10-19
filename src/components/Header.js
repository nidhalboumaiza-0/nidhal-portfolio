import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 1rem;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  background: rgba(9, 13, 18, 0.95);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid
    ${(props) => props.$scrolled ? "rgba(255, 255, 255, 0.14)" : "transparent"};
  box-shadow: ${(props) =>
    props.$scrolled
      ? "0 12px 40px rgba(3, 5, 14, 0.6), inset 0 1px 0 rgba(255,255,255,0.06)"
      : "none"};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Logo = styled(motion.a)`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${(props) =>
    props.$active ? "#ffffff" : props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: ${(props) => (props.$active ? 600 : 500)};
  font-size: 0.92rem;
  cursor: pointer;
  position: relative;
  padding: 0.65rem 0.7rem;
  border-radius: 5px;
  transition: color 0.25s ease, background 0.25s ease,
    box-shadow 0.25s ease;

  ${(props) =>
    props.$active &&
    `
      background: rgba(255,255,255,0.08);
    `}

  &:hover {
    color: #ffffff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

const SocialLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 44px;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;

  @media (max-width: 1100px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(5, 6, 14, 0.97);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 999;
`;

const MobileNavLink = styled(motion.a)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
`;

const MobileSocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1100) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scrollspy: highlight the nav link of the section in view
      const sections = [
        "hero",
        "about",
        "skills",
        "experience",
        "projects",
        "education",
        "contact",
      ];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: t("nav.home"), id: "hero" },
    { label: t("nav.about"), id: "about" },
    { label: t("nav.skills"), id: "skills" },
    { label: t("nav.experience"), id: "experience" },
    { label: t("nav.projects"), id: "projects" },
    { label: t("nav.education"), id: "education" },
    { label: t("nav.contact"), id: "contact" },
  ];

  return (
    <>
      <HeaderContainer
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Nav $scrolled={scrolled}>
          <Logo
            href="#hero"
            aria-label={language === "fr" ? "Nidhal Boumaiza, accueil" : "Nidhal Boumaiza, home"}
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            NB
          </Logo>

          <NavLinks>
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={() => scrollToSection(item.id)}
                $active={activeSection === item.id}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <NavActions>
          <SocialLinks>
            <SocialLink
              href="https://github.com/nidhalboumaiza-0"
              aria-label="GitHub"
              title="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <FiGithub />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/nidhal-boumaiza"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <FiLinkedin />
            </SocialLink>
            <SocialLink
              href="mailto:nidhal.boumaiza@outlook.com"
              aria-label="Email"
              title="Email"
              whileHover={{ scale: 1.2 }}
            >
              <FiMail />
            </SocialLink>
          </SocialLinks>
          <LanguageToggle />

          <MobileMenuButton
            type="button"
            aria-label={mobileMenuOpen ? (language === "fr" ? "Fermer le menu" : "Close menu") : (language === "fr" ? "Ouvrir le menu" : "Open menu")}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
          </NavActions>
        </Nav>
      </HeaderContainer>

      {mobileMenuOpen && (
        <MobileMenu
          id="mobile-navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navItems.map((item) => (
            <MobileNavLink
              key={item.id}
              href={`#${item.id}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </MobileNavLink>
          ))}

          <MobileSocialLinks>
            <SocialLink
              href="https://github.com/nidhalboumaiza-0"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <FiGithub />
            </SocialLink>
            <SocialLink
              href="https://linkedin.com/in/nidhal-boumaiza"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <FiLinkedin />
            </SocialLink>
            <SocialLink
              href="mailto:nidhal.boumaiza@outlook.com"
              whileHover={{ scale: 1.2 }}
            >
              <FiMail />
            </SocialLink>
          </MobileSocialLinks>
        </MobileMenu>
      )}
    </>
  );
};

export default Header;
