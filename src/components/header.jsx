import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
//import LogoEmpresa from '../assets/iconab.png';

export default function ColorTabs() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleLinkClick = (target) => {
        const targetElement = document.getElementById(target);
        if (targetElement) {
            const targetOffset = targetElement.offsetTop;
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;

            const aboutMeElement = document.getElementById('about-me');
            const projectsElement = document.getElementById('my-projects');
            const contactElement = document.getElementById('contact-me');

            const aboutMeOffset = aboutMeElement.getBoundingClientRect().top;
            const projectsOffset = projectsElement.getBoundingClientRect().top;
            const contactOffset = contactElement.getBoundingClientRect().top;

            if (aboutMeOffset >= 0 && aboutMeOffset < windowHeight) {
                setSelectedTab(0);
            } else if (projectsOffset >= 0 && projectsOffset < windowHeight) {
                setSelectedTab(1);
            } else if (contactOffset >= 0 && contactOffset < windowHeight) {
                setSelectedTab(2);
            }

            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box
            textColor="white"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(10px)' : 'none', // Aplica el efecto de desenfoque solo cuando se ha hecho scroll
            }}
        >
            <Tabs
                value={selectedTab}
                onChange={handleChange}
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                textColor="white"
                sx={{ '& .Mui-selected': { color: 'white', backgroundColor: 'transparent' }, '& .MuiTabs-indicator': { backgroundColor: 'secondary.main' } }}
            >
                <Tab
                    label="Sobre mi"
                    onClick={() => handleLinkClick('about-me')}
                />
                <Tab
                    label="Proyectos"
                    onClick={() => handleLinkClick('my-projects')}
                />
                <Tab
                    label="Contacto"
                    onClick={() => handleLinkClick('contact-me')}
                />
            </Tabs>
        </Box>
    );
}
