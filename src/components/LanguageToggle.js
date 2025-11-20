import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const ToggleContainer = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 2px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  border: none;
  border-radius: 25px;
  padding: 4px;
  cursor: pointer;
  box-shadow: 
    0 4px 15px rgba(0, 212, 255, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(0, 212, 255, 0.4),
      0 3px 10px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: 15px;
    right: 15px;
    padding: 3px;
  }
`;

const LanguageOption = styled(motion.div)`
  min-width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  background: ${(props) => (props.active ? "#ffffff" : "transparent")};
  color: ${(props) => (props.active ? "#0099cc" : "rgba(255, 255, 255, 0.9)")};
  box-shadow: ${(props) =>
    props.active ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none"};
  padding: 0 12px;

  &:hover {
    background: ${(props) =>
      props.active ? "#ffffff" : "rgba(255, 255, 255, 0.15)"};
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-width: 35px;
    height: 28px;
    font-size: 11px;
    padding: 0 10px;
  }
`;


const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <ToggleContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 200,
      }}
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <LanguageOption
        active={language === "en"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </LanguageOption>
      <LanguageOption
        active={language === "fr"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        FR
      </LanguageOption>
    </ToggleContainer>
  );
};

export default LanguageToggle;
