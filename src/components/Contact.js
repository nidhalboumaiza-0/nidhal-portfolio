import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiAlertCircle,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "../contexts/LanguageContext";

const ContactSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.05) 0%,
    rgba(0, 153, 204, 0.05) 100%
  );

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 2rem;
  background: ${(props) => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled(motion.div)`
  h3 {
    color: ${(props) => props.theme.colors.text};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  p {
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.8;
    margin-bottom: 2rem;
  }
`;

const ContactItems = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(26, 26, 26, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(0, 212, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  width: 24px;
  display: flex;
  justify-content: center;
`;

const ContactText = styled.div`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 50%;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.2rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: ${(props) => props.theme.colors.gradient};
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    font-size: 0.875rem;
  }
`;

// Zod validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const res = await fetch("https://formspree.io/f/mpwjgqvv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        reset();
        alert(t("contact.thankYou"));
        console.log("Form submitted successfully", res, "formData:", data);
      } else {
        console.error("Error submitting form:", res.statusText);
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: <FiMail />,
      text: "nidhal.boumaiza@outlook.com",
    },
    {
      icon: <FiPhone />,
      text: "+216 28 316 089",
    },
    {
      icon: <FiMapPin />,
      text: "Tunis, Tunisia",
    },
  ];

  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t("contact.title")}
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t("contact.description")}
        </SectionSubtitle>

        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>{t("contact.letsConnect")}</h3>
            <p>{t("contact.connectDescription")}</p>

            <ContactItems>
              {contactItems.map((item, index) => (
                <ContactItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ContactIcon>{item.icon}</ContactIcon>
                  <ContactText>{item.text}</ContactText>
                </ContactItem>
              ))}
            </ContactItems>

            <SocialLinks>
              <SocialLink
                href="https://github.com/NidhalBoumaiza"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub />
              </SocialLink>
              <SocialLink
                href="https://linkedin.com/in/nidhal-boumaiza"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiLinkedin />
              </SocialLink>
              <SocialLink
                href="mailto:nidhal.boumaiza@outlook.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMail />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup>
              <FormLabel htmlFor="name">{t("contact.name")}</FormLabel>
              <FormInput
                type="text"
                id="name"
                {...register("name")}
                placeholder={t("contact.placeholders.name")}
                style={{
                  borderColor: errors.name
                    ? "#ff6b6b"
                    : "rgba(0, 212, 255, 0.2)",
                }}
              />
              {errors.name && (
                <ErrorMessage>
                  <FiAlertCircle />
                  {errors.name.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="email">{t("contact.email")}</FormLabel>
              <FormInput
                type="email"
                id="email"
                {...register("email")}
                placeholder={t("contact.placeholders.email")}
                style={{
                  borderColor: errors.email
                    ? "#ff6b6b"
                    : "rgba(0, 212, 255, 0.2)",
                }}
              />
              {errors.email && (
                <ErrorMessage>
                  <FiAlertCircle />
                  {errors.email.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="subject">{t("contact.subject")}</FormLabel>
              <FormInput
                type="text"
                id="subject"
                {...register("subject")}
                placeholder={t("contact.placeholders.subject")}
                style={{
                  borderColor: errors.subject
                    ? "#ff6b6b"
                    : "rgba(0, 212, 255, 0.2)",
                }}
              />
              {errors.subject && (
                <ErrorMessage>
                  <FiAlertCircle />
                  {errors.subject.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="message">{t("contact.message")}</FormLabel>
              <FormTextarea
                id="message"
                {...register("message")}
                placeholder={t("contact.placeholders.message")}
                style={{
                  borderColor: errors.message
                    ? "#ff6b6b"
                    : "rgba(0, 212, 255, 0.2)",
                }}
              />
              {errors.message && (
                <ErrorMessage>
                  <FiAlertCircle />
                  {errors.message.message}
                </ErrorMessage>
              )}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            >
              <FiSend />
              {isSubmitting ? t("contact.sending") : t("contact.send")}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;
