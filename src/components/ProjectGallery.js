import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const GalleryContainer = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: #1a1a1a;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 24px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 212, 255, 0.8);
  border: none;
  color: white;
  font-size: 24px;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  transition: all 0.3s ease;
  ${(props) =>
    props.direction === "left" ? "left: 20px;" : "right: 20px;"}

  &:hover {
    background: rgba(0, 212, 255, 1);
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ImageInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 30px 20px 20px;
  text-align: center;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  padding: 20px;
  max-height: 400px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00d4ff;
    border-radius: 4px;
  }
`;

const Thumbnail = styled(motion.img)`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00d4ff;
    transform: scale(1.05);
  }
`;

const ProjectGallery = ({ isOpen, onClose, projectTitle }) => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { t } = useLanguage();

  const imageMap = useMemo(
    () => ({
      "Medical App": [
        "lwdfhsed.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.37_b8ca24cf.jpg",
        "dfhkne.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.37_ce370290.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.36_f0a2ea7b.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.32_577bfefe.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.32_70e4ec19.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.31_e893df79.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.31_de1bbe2c.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.31_31cb5b17.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.31_9b9c0868.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.31_41d69702.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.31_e1bf89bb.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.30_5c42a3f1.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.30_e6164dbf.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.30_6c151698.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.30_e721f703.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.30_1e497a01.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.30_f8cdc6d1.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.30_02e46822.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.29_655527ef.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.29_9d927180.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.28_8f055653.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.27_4bea8e00.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.27_5f6d4595.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.27_d2cf8dea.jpg",
        "WhatsApp Image 2025-06-21 à 19.49.27_fb73c248.jpg",
      ],
      GASPINO: [
        "inoo.jpg",
        "pino.jpg",
        "gasp.jpg",
        "gaaaaaaaaaasss.jpg",
        "iiinooo.jpg",
        "piiiinooo.jpg",
        "spinooo.jpg",
        "pinoo.jpg",
        "gaaa.jpg",
        "gas.jpg",
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
        { length: 6 },
        (_, i) => `library${i + 1}.png`
      ),
    }),
    []
  );

  useEffect(() => {
    if (isOpen && projectTitle && imageMap[projectTitle]) {
      const loadImages = async () => {
        const projectImages = [];
        const folderMap = {
          "Medical App": "medilink",
          GASPINO: "gaspino",
          TeamFlow: "teamflow",
          "Gestion de Librairie": "library",
        };

        const folder = folderMap[projectTitle];

        for (const filename of imageMap[projectTitle]) {
          try {
            const image = require(`../assets/projects/${folder}/${filename}`);
            projectImages.push(image);
          } catch (error) {
            console.warn(`Could not load image: ${filename}`);
          }
        }

        setImages(projectImages);
        setCurrentImageIndex(0);
      };

      loadImages();
    }
  }, [isOpen, projectTitle, imageMap]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    },
    [isLightboxOpen, onClose, images.length]
  );

  useEffect(() => {
    if (isOpen || isLightboxOpen) {
      document.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isLightboxOpen, handleKeyPress]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <GalleryContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>

          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #333",
            }}
          >
            <h2
              style={{
                color: "white",
                margin: 0,
                textAlign: "center",
              }}
            >
              {projectTitle} - {t("projects.screenshots")}
            </h2>
          </div>

          <ThumbnailGrid>
            {images.map((image, index) => (
              <Thumbnail
                key={index}
                src={image}
                alt={`${projectTitle} screenshot ${index + 1}`}
                onClick={() => openLightbox(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </ThumbnailGrid>
        </GalleryContainer>

        {/* Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && (
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              style={{ zIndex: 1100 }}
            >
              <GalleryContainer
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: "95vw", maxHeight: "95vh" }}
              >
                <CloseButton onClick={closeLightbox}>
                  <FaTimes />
                </CloseButton>

                {images.length > 1 && (
                  <>
                    <NavButton
                      direction="left"
                      onClick={prevImage}
                      disabled={images.length <= 1}
                    >
                      <FaChevronLeft />
                    </NavButton>
                    <NavButton
                      direction="right"
                      onClick={nextImage}
                      disabled={images.length <= 1}
                    >
                      <FaChevronRight />
                    </NavButton>
                  </>
                )}

                <ImageContainer>
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${projectTitle} screenshot ${
                      currentImageIndex + 1
                    }`}
                  />
                </ImageContainer>

                <ImageInfo>
                  <p style={{ margin: 0, fontSize: "16px" }}>
                    {t("gallery.imageOf")
                      .replace("{current}", currentImageIndex + 1)
                      .replace("{total}", images.length)}
                  </p>
                </ImageInfo>
              </GalleryContainer>
            </Overlay>
          )}
        </AnimatePresence>
      </Overlay>
    </AnimatePresence>
  );
};

export default ProjectGallery;
