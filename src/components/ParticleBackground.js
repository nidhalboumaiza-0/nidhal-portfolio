import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    const mouse = { x: null, y: null };

    // Aurora palette
    const palette = ["#8B5CF6", "#22D3EE", "#F472B6", "#A78BFA"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 45 : 80;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius =
          Math.random() < 0.15
            ? Math.random() * 2.4 + 1.6
            : Math.random() * 1.6 + 0.4;
        this.opacity = Math.random() * 0.5 + 0.25;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        this.depth = Math.random() * 0.6 + 0.4; // parallax depth factor
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Gentle repulsion from the cursor
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = ((120 - dist) / 120) * 0.6 * this.depth;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.radius > 2 ? 10 : 4;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.save();
            ctx.globalAlpha = ((110 - distance) / 110) * 0.14;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#8B5CF6";
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default ParticleBackground;
