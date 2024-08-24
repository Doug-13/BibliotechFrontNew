import React from 'react';
import { Card, CardContent, CardHeader, Avatar, Typography, Grid } from '@mui/material';

// Exemplo de dados de comunidades
const communities = [
  { id: 1, name: 'Comunidade de Leitura', description: 'Discussões sobre livros e autores.' },
  { id: 2, name: 'Grupo de Estudos', description: 'Estudos colaborativos e grupos de debate.' },
  { id: 3, name: 'Tecnologia e Inovação', description: 'Fórum para trocar ideias sobre tecnologia.' },
  { id: 3, name: 'Tecnologia e Inovação', description: 'Fórum para trocar ideias sobre tecnologia.' },
  { id: 3, name: 'Tecnologia e Inovação', description: 'Fórum para trocar ideias sobre tecnologia.' },
  { id: 3, name: 'Tecnologia e Inovação', description: 'Fórum para trocar ideias sobre tecnologia.' },
];

const CommunityList = () => {
  return (
    <Grid container spacing={3} padding={2}>
      {communities.map((community) => (
        <Grid item xs={12} sm={6} md={4} key={community.id}>
          <Card>
            <CardHeader
              avatar={<Avatar>{community.name[0]}</Avatar>}
              title={community.name}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {community.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommunityList;
