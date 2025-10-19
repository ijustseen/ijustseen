'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Contact.module.scss';
// Импортируем иконки из react-icons
import { MdEmail, MdCode, MdRocketLaunch } from 'react-icons/md';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaTelegram,
  FaBrain,
  FaServer,
  FaReact,
  FaNodeJs,
  FaDiscord,
} from 'react-icons/fa';

const Contact = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [techIcons, setTechIcons] = useState<React.ReactNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Генерируем технологические иконки только на клиентской стороне
  useEffect(() => {
    const icons = [
      <FaReact
        key="react"
        className={styles.floatingIcon}
        style={{ '--delay': '0s' } as React.CSSProperties}
      />,
      <FaNodeJs
        key="node"
        className={styles.floatingIcon}
        style={{ '--delay': '2s' } as React.CSSProperties}
      />,
      <FaBrain
        key="ai"
        className={styles.floatingIcon}
        style={{ '--delay': '4s' } as React.CSSProperties}
      />,
      <MdCode
        key="code"
        className={styles.floatingIcon}
        style={{ '--delay': '6s' } as React.CSSProperties}
      />,
      <FaServer
        key="server"
        className={styles.floatingIcon}
        style={{ '--delay': '8s' } as React.CSSProperties}
      />,
      <MdRocketLaunch
        key="rocket"
        className={styles.floatingIcon}
        style={{ '--delay': '10s' } as React.CSSProperties}
      />,
    ];
    setTechIcons(icons);
  }, []);

  // Определим массив карточек контактов с технологическими тегами
  const contactCards = [
    {
      id: 'email',
      icon: <MdEmail />,
      title: 'Email',
      link: 'mailto:anordgame@gmail.com',
      text: 'anordgame@gmail.com',
      tags: ['24/7 Response', 'Project Inquiries'],
    },
    {
      id: 'github',
      icon: <FaGithub />,
      title: 'GitHub',
      link: 'https://github.com/ijustseen',
      text: 'ijustseen',
      tags: ['Open Source', 'Code Repository'],
    },
    {
      id: 'linkedin',
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      link: 'https://www.linkedin.com/in/andrei-eroshenkov/',
      text: 'Andrew Eroshenkov',
      tags: ['Professional Network', 'Career'],
    },
    {
      id: 'twitter',
      icon: <FaTwitter />,
      title: 'Twitter',
      link: 'https://twitter.com/ijustseen_you',
      text: 'ijustseen_you',
      tags: ['Tech Updates', 'Networking'],
    },
    {
      id: 'telegram',
      icon: <FaTelegram />,
      title: 'Telegram',
      link: 'https://t.me/andr_ewt',
      text: 'andr_ewt',
      tags: ['Fastest Response', 'Direct Contact'],
    },
    {
      id: 'discord',
      icon: <FaDiscord />,
      title: 'Discord',
      link: 'https://discord.com/users/ijustseen',
      text: 'ijustseen',
      tags: ['Community', 'Games)'],
    },
  ];

  return (
    <section
      id="contact"
      className={`section ${styles.contact} ${isVisible ? styles.visible : ''}`}
      ref={containerRef}
    >
      <div className={styles.techBackground}>{techIcons}</div>

      <div className={styles.glowingHeading}>
        <h2>Connect & Collaborate</h2>
      </div>

      <p className={styles.subtitle}>
        Let&apos;s build the next big thing together! Hackathon enthusiast, problem solver, and code
        craftsman.
      </p>

      <div className={styles.contactCards}>
        {contactCards.map(card => (
          <a
            key={card.id}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.contactCard} ${activeCard === card.id ? styles.active : ''}`}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className={styles.iconWrapper}>{card.icon}</div>
            <div className={styles.cardContent}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <div className={styles.tags}>
                {card.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.shine}></div>
          </a>
        ))}
      </div>

      <div className={styles.hackathonBadge}>
        <div className={styles.badgeContent}>
          <MdRocketLaunch className={styles.badgeIcon} />
          <p>Hackathon Ready</p>
        </div>
      </div>

      <div className={styles.location}>
        <p>📍 Location: Novi Sad, Serbia | Available for Remote Collaboration</p>
      </div>
    </section>
  );
};

export default Contact;
