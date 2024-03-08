import React, { useState, useEffect } from 'react';
import '../styles/Projects.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/AlanBertinatDev/repos');
        setProjects(response.data);
      } catch (error) {
        console.error('Error cargando los proyectos:', error);
      }
    };
    fetchProjects();
  }, []);

  const [languages, setLanguages] = useState({});

  useEffect(() => {
    const fetchLanguages = async (url) => {
      try {
        const response = await axios.get(url);
        setLanguages(prevLanguages => ({
          ...prevLanguages,
          [url]: Object.keys(response.data)
        }));
      } catch (error) {
        console.error('Error cargando los lenguajes:', error);
      }
    };

    projects.forEach(project => {
      if (project.languages_url) {
        fetchLanguages(project.languages_url);
      }
    });
  }, [projects]);

  const totalPages = Math.ceil(projects.length / pageSize);
  const visibleProjects = projects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className='project-title'> <h1>Mis proyectos</h1>
      <Grid container spacing={2}>
      {visibleProjects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={6} lg={6}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent sx={{ height: 100, overflow: 'auto' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {project.name}
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                height="140"
                image="https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2017/12/gitHub.png"
                alt="repositories"
              />
              <CardContent sx={{ height: 100, overflow: 'auto' }}>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
                <Grid container spacing={0.5}>
                  {languages[project.languages_url] && languages[project.languages_url].map((language, index) => (
                    <Grid item xs={6} key={index}>
                      <Chip
                        label={language}
                        color="secondary"
                        variant="outlined"
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
              <CardActions>
                <Button href={project.html_url} target="_blank" rel="noopener noreferrer">Ver en GitHub</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button color="secondary" variant="outlined" key={page} onClick={() => goToPage(page)}>
            {page}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default Projects;