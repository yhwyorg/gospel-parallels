import React from 'react';
import { Chrono } from 'react-chrono';
import { Box, Typography, Paper } from '@mui/material';
import { Event } from '../data/gospelEvents';

interface TimelineProps {
  events: Event[];
  gospelType: 'synoptic' | 'john';
}

const GospelTimeline: React.FC<TimelineProps> = ({ events, gospelType }) => {
  // Filter and sort the events based on whether they appear in the given gospel type
  const filteredEvents = events
    .filter(event => 
      gospelType === 'synoptic' 
        ? event.synopticOrder !== undefined 
        : event.johnOrder !== undefined
    )
    .sort((a, b) => {
      const orderA = gospelType === 'synoptic' ? a.synopticOrder! : a.johnOrder!;
      const orderB = gospelType === 'synoptic' ? b.synopticOrder! : b.johnOrder!;
      return orderA - orderB;
    });

  // Format the events for the timeline component
  const timelineItems = filteredEvents.map(event => ({
    title: event.title,
    cardTitle: event.title,
    cardSubtitle: event.description,
    cardDetailedText: gospelType === 'synoptic' 
      ? Object.entries(event.synopticReferences)
          .filter(([_, reference]) => reference)
          .map(([gospel, reference]) => `${gospel.charAt(0).toUpperCase() + gospel.slice(1)}: ${reference}`)
          .join('\n')
      : `John: ${event.johnReference}`
  }));

  // Define theme colors based on gospel type
  const primaryColor = gospelType === 'synoptic' ? '#3f51b5' : '#9c27b0';
  const lightColor = gospelType === 'synoptic' ? '#e8eaf6' : '#f3e5f5';
  const darkColor = gospelType === 'synoptic' ? '#303f9f' : '#7b1fa2';
  
  return (
    <Box sx={{ height: '500px', width: '100%' }}>
      <Typography 
        variant="h6" 
        align="center" 
        gutterBottom 
        sx={{ 
          color: darkColor,
          fontWeight: 600,
          backgroundColor: lightColor,
          padding: '8px 16px',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        {gospelType === 'synoptic' ? 'Synoptic Gospels' : 'Gospel of John'} Timeline
      </Typography>
      <Paper 
        elevation={2} 
        sx={{ 
          height: '100%', 
          p: 2, 
          border: `1px solid ${lightColor}`,
          borderRadius: '8px'
        }}
      >
        <Chrono
          items={timelineItems}
          mode="VERTICAL"
          cardHeight={120} // Increase card height for better readability
          scrollable={{ scrollbar: true }}
          theme={{
            primary: primaryColor,
            secondary: lightColor,
            cardBgColor: '#fff',
            cardForeColor: '#333',
            titleColor: darkColor,
            titleColorActive: darkColor,
          }}
          fontSizes={{
            title: '0.95rem',
            cardTitle: '1.1rem',
            cardSubtitle: '0.9rem',
            cardText: '0.85rem'
          }}
          classNames={{
            card: 'timeline-card',
            cardTitle: 'timeline-card-title',
            cardSubtitle: 'timeline-card-subtitle',
            cardText: 'timeline-card-text'
          }}
        />
      </Paper>
    </Box>
  );
};

export default GospelTimeline;