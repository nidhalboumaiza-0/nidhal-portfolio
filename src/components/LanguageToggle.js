import React from "react";
import styled from "styled-components";
import { useLanguage } from "../contexts/LanguageContext";

const Group = styled.div`
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  flex-shrink: 0;
`;

const Option = styled.button`
  min-width: 42px;
  min-height: 38px;
  border: 0;
  border-radius: 3px;
  background: ${(props) => props.$active ? "#86e5c4" : "transparent"};
  color: ${(props) => props.$active ? "#071d16" : props.theme.colors.textSecondary};
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: ${(props) => props.$active ? "#9aeccc" : "rgba(255,255,255,0.08)"}; }
`;

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <Group role="group" aria-label={language === "fr" ? "Langue du site" : "Site language"}>
      <Option type="button" $active={language === "en"} aria-pressed={language === "en"} aria-label="English" title="English" onClick={() => { if (language !== "en") toggleLanguage(); }}>EN</Option>
      <Option type="button" $active={language === "fr"} aria-pressed={language === "fr"} aria-label="Français" title="Français" onClick={() => { if (language !== "fr") toggleLanguage(); }}>FR</Option>
    </Group>
  );
}
