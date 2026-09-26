import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import {
  FiSmartphone,
  FiMonitor,
  FiMaximize2,
} from "react-icons/fi";
import { useLanguage } from "../contexts/LanguageContext";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(4, 7, 18, 0.92);
  backdrop-filter: blur(14px);

  @media (max-width: 640px) {
    padding: 0;
  }
`;

const GalleryContainer = styled(motion.div)`
  width: min(1200px, calc(100vw - 2rem));
  height: min(860px, calc(100dvh - 2rem));
  min-height: 0;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  overflow: hidden;
  color: #f8fafc;
  background: #0d1122;
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 8px;
  box-shadow:
    0 30px 90px rgba(0, 0, 0, 0.75),
    0 0 50px rgba(139, 92, 246, 0.15);

  @media (max-width: 640px) {
    width: 100vw;
    height: 100dvh;
    border-radius: 0;
    border: none;
  }
`;

const Header = styled.header`
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #13182b;

  @media (max-width: 640px) {
    gap: 0.5rem;
    padding: 0.75rem 0.9rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const TitleBlock = styled.div`
  min-width: 0;
`;

const Title = styled.h2`
  margin: 0;
  overflow: hidden;
  color: #ffffff;
  font-size: 1.25rem;
  letter-spacing: 0;
  font-weight: 700;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: rgba(139, 92, 246, 0.18);
  border: 1px solid rgba(167, 139, 250, 0.3);
  color: #c4b5fd;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;

  @media (max-width: 640px) {
    display: none;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
`;

const Counter = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  font-size: 0.8rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;

  @media (max-width: 640px) {
    padding: 0.3rem 0.4rem;
  }
`;

const HeaderButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 38px;
  padding: 0 0.85rem;
  color: ${(props) => (props.$active ? "#a78bfa" : "#cbd5e1")};
  background: ${(props) =>
    props.$active ? "rgba(139, 92, 246, 0.2)" : "rgba(255, 255, 255, 0.06)"};
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(167, 139, 250, 0.45)" : "rgba(255, 255, 255, 0.1)"};
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 180ms ease;

  &:hover {
    background: rgba(139, 92, 246, 0.28);
    border-color: rgba(167, 139, 250, 0.6);
    color: #ffffff;
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    span {
      display: none;
    }
    padding: 0 0.6rem;
  }
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  padding: 0;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  cursor: pointer;
  transition: all 180ms ease;

  &:hover {
    background: rgba(239, 68, 68, 0.25);
    border-color: rgba(248, 113, 113, 0.6);
    color: #ff6b6b;
    transform: scale(1.06);
  }
`;

const Stage = styled.div`
  position: relative;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  place-items: center;
  overflow: hidden;
  touch-action: pan-y;
  padding: 1.2rem 4.5rem;
  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(139, 92, 246, 0.08),
      transparent 70%
    ),
    #070a14;

  @media (max-width: 640px) {
    padding: 0.8rem 0.5rem;
  }
`;

/* ===== PHONE MOCKUP STYLING ===== */
const PhoneWrapper = styled.div`
  min-height: 0;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: 100%;
`;

const PhoneFrame = styled(motion.div)`
  position: relative;
  height: min(640px, 100%);
  aspect-ratio: 9 / 19.5;
  background: #000000;
  border: 8px solid #1c2237;
  border-radius: 40px;
  box-shadow:
    0 25px 70px rgba(0, 0, 0, 0.75),
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 0 35px rgba(139, 92, 246, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 640px) {
    height: min(520px, calc(100dvh - 210px));
    border-width: 6px;
    border-radius: 32px;
  }
`;

const PhoneScreen = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 32px;
  background: #000000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 640px) {
    border-radius: 26px;
  }
`;

const PhoneImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  object-position: top;
`;

/* ===== BROWSER MOCKUP STYLING ===== */
const BrowserWrapper = styled.div`
  min-height: 0;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1020px;
`;

const BrowserWindow = styled(motion.div)`
  width: 100%;
  max-height: min(620px, calc(100vh - 240px));
  display: flex;
  flex-direction: column;
  background: #0f1426;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.7),
    0 0 30px rgba(139, 92, 246, 0.15);

  @media (max-width: 640px) {
    max-height: min(500px, calc(100dvh - 210px));
    border-radius: 8px;
  }
`;

const BrowserHeader = styled.div`
  height: 36px;
  background: #181d33;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  gap: 1rem;
`;

const TrafficDots = styled.div`
  display: flex;
  gap: 6px;
`;

const TrafficDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.$color};
  opacity: 0.85;
`;

const BrowserUrl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 1.2rem;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: #94a3b8;
  font-size: 0.72rem;
  font-family: ${(props) => props.theme?.fonts?.mono || "monospace"};
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 640px) {
    display: none;
  }
`;

const BrowserBody = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080b16;
  overflow: hidden;
`;

const BrowserImage = styled(motion.img)`
  max-width: 100%;
  max-height: min(560px, calc(100vh - 280px));
  object-fit: contain;
  display: block;
`;

/* ===== RAW FIT STYLING (TOGGLEABLE) ===== */
const RawImage = styled(motion.img)`
  display: block;
  min-height: 0;
  min-width: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
`;

/* ===== NAVIGATION CONTROLS ===== */
const NavButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.$direction === "left" ? "left: 1.2rem;" : "right: 1.2rem;")}
  transform: translateY(-50%);
  z-index: 20;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  padding: 0;
  color: #ffffff;
  background: rgba(19, 24, 43, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 180ms ease;

  &:hover {
    background: rgba(139, 92, 246, 0.35);
    border-color: rgba(167, 139, 250, 0.7);
    transform: translateY(-50%) scale(1.08);
  }

  @media (max-width: 640px) {
    width: 36px;
    height: 36px;
    top: auto;
    bottom: 0.5rem;
    transform: none;
    ${(props) =>
      props.$direction === "left" ? "left: 0.5rem;" : "right: 0.5rem;"}

    &:hover {
      transform: scale(1.08);
    }
  }
`;

const EmptyState = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 0.95rem;
`;

/* ===== THUMBNAIL RAIL STYLING ===== */
const ThumbnailRail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  overflow-x: auto;
  padding: 0.85rem 1.2rem 1rem;
  background: #13182b;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  scrollbar-color: #8b5cf6 #1e2438;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #1e2438;
  }

  &::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 3px;
  }

  @media (max-width: 640px) {
    gap: 0.45rem;
    padding: 0.6rem 0.8rem;
  }
`;

const ThumbnailButton = styled.button`
  position: relative;
  flex: 0 0 auto;
  /* Adaptive aspect ratio: portrait for mobile apps, landscape for web apps */
  width: ${(props) => (props.$isMobile ? "46px" : "102px")};
  height: ${(props) => (props.$isMobile ? "82px" : "62px")};
  overflow: hidden;
  padding: 0;
  background: #080b16;
  border: 2px solid
    ${(props) =>
      props.$active ? "#a78bfa" : "rgba(255, 255, 255, 0.12)"};
  border-radius: 8px;
  cursor: pointer;
  opacity: ${(props) => (props.$active ? 1 : 0.68)};
  box-shadow: ${(props) =>
    props.$active
      ? "0 0 16px rgba(167, 139, 250, 0.45), 0 4px 12px rgba(0,0,0,0.5)"
      : "none"};
  transform: ${(props) =>
    props.$active ? "translateY(-2px) scale(1.03)" : "none"};
  transition: all 180ms ease;

  &:hover {
    border-color: #8b5cf6;
    opacity: 1;
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    width: ${(props) => (props.$isMobile ? "38px" : "78px")};
    height: ${(props) => (props.$isMobile ? "68px" : "50px")};
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: ${(props) => (props.$isMobile ? "top center" : "top left")};
`;

const ProjectGallery = ({ isOpen, onClose, projectTitle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [useDeviceFrame, setUseDeviceFrame] = useState(false);
  const { language } = useLanguage();
  const thumbnailRefs = useRef([]);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const touchStartRef = useRef(null);

  const isMobileProject = useMemo(() => {
    return [
      "Medical App",
      "GASPINO",
      "Barberio",
      "HR Management System",
      "Maqra'at Al-Rajhi",
    ].includes(projectTitle);
  }, [projectTitle]);

  const isImageMobileAt = useCallback(
    (index) => {
      if (projectTitle === "Maqra'at Al-Rajhi") return true;
      if (projectTitle === "CIRO Pizza Platform") {
        return [0, 1, 2, 3, 4, 9].includes(index);
      }
      return isMobileProject;
    },
    [projectTitle, isMobileProject]
  );

  const isCurrentMobile = isImageMobileAt(currentImageIndex);

  const imageMap = useMemo(
    () => ({
      "Medical App": Array.from(
        { length: 24 },
        (_, i) => `medical-${String(i + 1).padStart(2, "0")}.jpg`
      ),
      "AASD Medical Platform": ["doctor-dashboard.png", "login.png"],
      HajMoto: ["dashboard.png", "login.png"],
      GASPINO: [
        "pino.jpg",
        "gas.jpg",
        "inoo.jpg",
        "gasp.jpg",
        "gaaaaaaaaaasss.jpg",
        "iiinooo.jpg",
        "piiiinooo.jpg",
        "spinooo.jpg",
        "pinoo.jpg",
        "gaaa.jpg",
        "gaspinooooo.jpg",
      ],
      TeamFlow: [
        "zieakbf.png",
        "kuqefi.png",
        "kezfbz.png",
        "ueho.png",
        "eyizrg.png",
        "bzebf.png",
        "smkf,zs.png",
        "dqucqa.png",
        "cuez.png",
        "zbcksvb.png",
        "vndsvn.png",
        "djkjf.png",
        "fjkf.png",
        "2.png",
        "1.png",
      ],
      "Gestion de Librairie": Array.from(
        { length: 7 },
        (_, index) => `library${index + 1}.png`
      ),
      Barberio: Array.from(
        { length: 6 },
        (_, i) => `barberio-${String(i + 1).padStart(2, "0")}.png`
      ),
      "Maqra'at Al-Rajhi": Array.from(
        { length: 9 },
        (_, i) => `maqari-${String(i + 1).padStart(2, "0")}.png`
      ),
      "CIRO Pizza Platform": Array.from(
        { length: 11 },
        (_, i) => `ciro-${String(i + 1).padStart(2, "0")}.png`
      ),
    }),
    []
  );

  const images = useMemo(() => {
    if (!projectTitle || !imageMap[projectTitle]) {
      return [];
    }

    const folderMap = {
      "Medical App": "medilink",
      "AASD Medical Platform": "aasd",
      HajMoto: "hajmoto",
      GASPINO: "gaspino",
      TeamFlow: "teamflow",
      "Gestion de Librairie": "library",
      Barberio: "barberio",
      "Maqra'at Al-Rajhi": "maqari",
      "CIRO Pizza Platform": "ciro",
    };

    const folder = folderMap[projectTitle];
    const projectImages = imageMap[projectTitle].flatMap((filename) => {
      try {
        const mod = require(`../assets/projects/${folder}/${filename}`);
        const src = mod.default || mod;
        return typeof src === "string" ? [src] : [];
      } catch (error) {
        console.warn(`Could not load image: ${folder}/${filename}`);
        return [];
      }
    });

    return projectImages;
  }, [imageMap, projectTitle]);

  const nextImage = useCallback(() => {
    if (images.length < 2) return;
    setCurrentImageIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  const previousImage = useCallback(() => {
    if (images.length < 2) return;
    setCurrentImageIndex(
      (current) => (current - 1 + images.length) % images.length
    );
  }, [images.length]);

  // Keyboard navigation & scroll lock
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextImage();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousImage();
      }
      if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll("button:not([disabled])");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, nextImage, onClose, previousImage]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [isOpen]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[currentImageIndex]) {
      thumbnailRefs.current[currentImageIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentImageIndex]);

  if (!isOpen) return null;

  const closeLabel = language === "fr" ? "Fermer la galerie" : "Close gallery";
  const previousLabel =
    language === "fr" ? "Image précédente" : "Previous image";
  const nextLabel = language === "fr" ? "Image suivante" : "Next image";
  const imageCounterText =
    images.length > 0
      ? `${currentImageIndex + 1} / ${images.length}`
      : "";

  let imageTag;
  if (projectTitle === "CIRO Pizza Platform") {
    if ([7, 8].includes(currentImageIndex)) {
      imageTag = {
        icon: <FiMonitor />,
        text: "Next.js 16 Web Admin",
      };
    } else if (currentImageIndex === 10) {
      imageTag = {
        icon: <FiMonitor />,
        text: language === "fr" ? "Supervision SCADA" : "SCADA Supervision",
      };
    } else if ([5, 6].includes(currentImageIndex)) {
      imageTag = {
        icon: <FiMonitor />,
        text: language === "fr" ? "Borne Totem Kiosk" : "Totem Kiosk UI",
      };
    } else if (currentImageIndex === 9) {
      imageTag = {
        icon: <FiSmartphone />,
        text: language === "fr" ? "App Livreur Rider" : "Rider Delivery App",
      };
    } else {
      imageTag = {
        icon: <FiSmartphone />,
        text: language === "fr" ? "App Client Mobile" : "Customer Mobile App",
      };
    }
  } else if (projectTitle === "Maqra'at Al-Rajhi") {
    imageTag = {
      icon: <FiSmartphone />,
      text: language === "fr" ? "App en Production" : "Live Production App",
    };
  } else if (projectTitle === "Barberio") {
    imageTag = {
      icon: <FiSmartphone />,
      text: "App Store & Play Store",
    };
  } else {
    imageTag = isCurrentMobile
      ? { icon: <FiSmartphone />, text: "Mobile UI" }
      : { icon: <FiMonitor />, text: "Web UI" };
  }

  return createPortal(
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <GalleryContainer
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-gallery-title"
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          onClick={(event) => event.stopPropagation()}
        >
          <Header>
            <HeaderLeft>
              <TitleBlock>
                <Title id="project-gallery-title">{projectTitle}</Title>
              </TitleBlock>
              <Badge>
                {imageTag.icon} {imageTag.text}
              </Badge>
            </HeaderLeft>

            <HeaderRight>
              <Counter aria-live="polite">{imageCounterText}</Counter>

              <HeaderButton
                type="button"
                $active={useDeviceFrame}
                aria-label={language === "fr" ? "Cadre appareil" : "Device frame"}
                aria-pressed={useDeviceFrame}
                onClick={() => setUseDeviceFrame((prev) => !prev)}
                title={
                  useDeviceFrame
                    ? language === "fr"
                      ? "Affichage brut"
                      : "Raw view"
                    : language === "fr"
                    ? "Affichage avec cadre"
                    : "Device frame view"
                }
              >
                {useDeviceFrame ? (
                  <>
                    <FiMaximize2 />
                    <span>{language === "fr" ? "Capture originale" : "Original screenshot"}</span>
                  </>
                ) : (
                  <>
                    {isCurrentMobile ? <FiSmartphone /> : <FiMonitor />}
                    <span>{language === "fr" ? "Cadre appareil" : "Device frame"}</span>
                  </>
                )}
              </HeaderButton>

              <CloseButton
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                title={closeLabel}
              >
                <FaTimes />
              </CloseButton>
            </HeaderRight>
          </Header>

          <Stage
            onTouchStart={(event) => {
              const touch = event.touches[0];
              touchStartRef.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchEnd={(event) => {
              if (!touchStartRef.current) return;
              const touch = event.changedTouches[0];
              const deltaX = touch.clientX - touchStartRef.current.x;
              const deltaY = touch.clientY - touchStartRef.current.y;
              touchStartRef.current = null;
              if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX < 0) nextImage();
                else previousImage();
              }
            }}
          >
            {images.length > 0 ? (
              useDeviceFrame ? (
                isCurrentMobile ? (
                  /* Mobile Smartphone Mockup */
                  <PhoneWrapper>
                    <PhoneFrame
                      key={`phone-${currentImageIndex}`}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PhoneScreen>
                        <PhoneImage
                          src={images[currentImageIndex]}
                          alt={`${projectTitle} screenshot ${currentImageIndex + 1}`}
                        />
                      </PhoneScreen>
                    </PhoneFrame>
                  </PhoneWrapper>
                ) : (
                  /* Web Browser Window Mockup */
                  <BrowserWrapper>
                    <BrowserWindow
                      key={`browser-${currentImageIndex}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BrowserHeader>
                        <TrafficDots>
                          <TrafficDot $color="#ff5f56" />
                          <TrafficDot $color="#ffbd2e" />
                          <TrafficDot $color="#27c93f" />
                        </TrafficDots>
                        <BrowserUrl>
                          <span>{projectTitle}</span>
                        </BrowserUrl>
                        <div style={{ width: 40 }} />
                      </BrowserHeader>
                      <BrowserBody>
                        <BrowserImage
                          src={images[currentImageIndex]}
                          alt={`${projectTitle} screenshot ${currentImageIndex + 1}`}
                        />
                      </BrowserBody>
                    </BrowserWindow>
                  </BrowserWrapper>
                )
              ) : (
                /* Raw Image Fit */
                <RawImage
                  key={`raw-${currentImageIndex}`}
                  src={images[currentImageIndex]}
                  alt={`${projectTitle} screenshot ${currentImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )
            ) : (
              <EmptyState>
                {language === "fr"
                  ? "Aucune capture disponible."
                  : "No screenshots available."}
              </EmptyState>
            )}

            {images.length > 1 && (
              <>
                <NavButton
                  type="button"
                  $direction="left"
                  onClick={previousImage}
                  aria-label={previousLabel}
                  title={previousLabel}
                >
                  <FaChevronLeft />
                </NavButton>
                <NavButton
                  type="button"
                  $direction="right"
                  onClick={nextImage}
                  aria-label={nextLabel}
                  title={nextLabel}
                >
                  <FaChevronRight />
                </NavButton>
              </>
            )}
          </Stage>

          {images.length > 0 && (
            <ThumbnailRail aria-label={`${projectTitle} screenshots`}>
              {images.map((image, index) => (
                <ThumbnailButton
                  key={image + index}
                  ref={(element) => {
                    thumbnailRefs.current[index] = element;
                  }}
                  type="button"
                  $isMobile={isImageMobileAt(index)}
                  $active={index === currentImageIndex}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`${projectTitle} screenshot ${index + 1}`}
                  aria-current={index === currentImageIndex ? "true" : undefined}
                >
                  <ThumbnailImage
                    src={image}
                    alt=""
                    $isMobile={isImageMobileAt(index)}
                    loading="lazy"
                  />
                </ThumbnailButton>
              ))}
            </ThumbnailRail>
          )}
        </GalleryContainer>
      </Overlay>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectGallery;
