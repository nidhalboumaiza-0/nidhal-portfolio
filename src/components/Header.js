import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: ${(props) =>
    props.scrolled ? "rgba(10, 10, 10, 0.95)" : "transparent"};
  backdrop-filter: blur(10px);
  border-bottom: ${(props) =>
    props.scrolled ? "1px solid rgba(0, 212, 255, 0.2)" : "none"};
  transition: all 0.3s ease;

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
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${(props) => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
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

const SocialLink = styled(motion.a)`
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

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 10, 0.98);
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
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
        scrolled={scrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Nav>
          <Logo
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            NB
          </Logo>

          <NavLinks>
            {navItems.map((item, index) => (
              <NavLink
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <SocialLinks>
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
          </SocialLinks>

          <MobileMenuButton
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </Nav>
      </HeaderContainer>

      {mobileMenuOpen && (
        <MobileMenu
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {navItems.map((item, index) => (
            <MobileNavLink
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
