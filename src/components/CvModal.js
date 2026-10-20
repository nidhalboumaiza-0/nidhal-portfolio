import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiDownload, FiExternalLink, FiFileText, FiX } from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(4, 7, 12, 0.82);
  backdrop-filter: blur(8px);
  @media (max-width: 540px) { padding: 0.75rem; }
`;

const Dialog = styled(motion.div)`
  width: min(780px, 100%);
  max-height: calc(100dvh - 2.5rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.surface || "#11171f"};
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
  @media (max-width: 540px) { max-height: calc(100dvh - 1.5rem); }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  h2 { font-size: 1.4rem; line-height: 1.4; margin-bottom: 0.3rem; }
  p { font-size: 0.9rem; color: ${(props) => props.theme.colors.textSecondary}; }
  @media (max-width: 540px) { padding: 1.1rem; }
`;

const Close = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover { background: rgba(255, 255, 255, 0.08); }
`;

const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 1.75rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  min-height: 0;
  padding: 0 1.5rem;
  @media (max-width: 680px) { grid-template-columns: 1fr; }
  @media (max-width: 540px) { padding: 0 1.1rem; }
`;

const Option = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem 0;
  min-width: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  h3 {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: 1rem;
    line-height: 1.5;
    text-wrap: balance;
  }
  h3 svg { color: ${(props) => props.theme.colors.secondary}; flex-shrink: 0; margin-top: 0.25rem; }
  p { color: ${(props) => props.theme.colors.textSecondary}; font-size: 0.85rem; line-height: 1.65; }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.3rem;
`;

const Action = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 44px;
  padding: 0.55rem 0.8rem;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background 180ms ease;
  &:hover { background: rgba(255, 255, 255, 0.08); }
  &.download {
    background: #86e5c4;
    border-color: transparent;
    color: #071d16;
    &:hover { background: #a3efda; }
  }
`;

const cvOptions = [
  { id: "canada-en", title: "Canadian Resume (English)", titleFr: "CV canadien (anglais)", file: "NIDHAL_BOUMAIZA_CV_CANADA",
    description: "English resume in a single-column, no-photo format for Canada and the US.",
    descriptionFr: "CV en anglais, sur une colonne et sans photo, pour le Canada et les États-Unis." },
  { id: "canada-fr", title: "Canadian Resume (French)", titleFr: "CV canadien (français)", file: "NIDHAL_BOUMAIZA_CV_CANADA_FR",
    description: "French version of the Canadian resume, with the same experience and projects.",
    descriptionFr: "Version française du CV canadien, avec les mêmes expériences et projets." },
  { id: "classic-en", title: "Classic CV Format (English)", titleFr: "CV classique (anglais)", file: "NIDHAL_BOUMAIZA_CV_CLASSIC_EN",
    description: "English CV with a photo and a two-column layout.",
    descriptionFr: "CV en anglais avec photo et mise en page sur deux colonnes." },
  { id: "classic-fr", title: "Classic CV Format (French)", titleFr: "CV classique (français)", file: "NIDHAL_BOUMAIZA_CV_CLASSIC_FR",
    description: "French CV with a photo and a two-column layout.",
    descriptionFr: "CV en français avec photo et mise en page sur deux colonnes." },
];

export default function CvModal({ isOpen, onClose }) {
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = dialogRef.current?.querySelectorAll("button, a[href]");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      const outside = !dialogRef.current.contains(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const french = language === "fr";
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.15 }} onClick={onClose}>
          <Dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="cv-modal-title" aria-describedby="cv-modal-description"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }} onClick={(event) => event.stopPropagation()}>
            <Header>
              <div>
                <h2 id="cv-modal-title">{french ? "Télécharger le CV" : "Download CV"}</h2>
                <p id="cv-modal-description">{french ? "Deux formats, disponibles en anglais et en français." : "Two formats, available in English and French."}</p>
              </div>
              <Close ref={closeRef} type="button" onClick={onClose} aria-label={french ? "Fermer le CV" : "Close CV"} title={french ? "Fermer" : "Close"}><FiX aria-hidden="true" /></Close>
            </Header>
            <Options>
              {cvOptions.map((option) => (
                <Option key={option.id} aria-labelledby={`cv-${option.id}`}>
                  <h3 id={`cv-${option.id}`}><FiFileText aria-hidden="true" /> {french ? option.titleFr : option.title}</h3>
                  <p>{french ? option.descriptionFr : option.description}</p>
                  <Actions>
                    <Action className="download" href={`/${option.file}.pdf`} download={`${option.file}.pdf`}><FiDownload aria-hidden="true" /> {french ? "Télécharger (PDF)" : "Download (PDF)"}</Action>
                    <Action href={`/${option.file}.pdf`} target="_blank" rel="noopener noreferrer"><FiExternalLink aria-hidden="true" /> {french ? "Aperçu" : "Preview"}</Action>
                  </Actions>
                </Option>
              ))}
            </Options>
          </Dialog>
        </Overlay>
      )}
    </AnimatePresence>, document.body
  );
}
