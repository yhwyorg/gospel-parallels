import React, { useState, useRef } from 'react';
import { Box, Typography, Paper, Slider, Button, Grid } from '@mui/material';
import { Event } from '../data/gospelEvents';

interface InteractiveTimelineProps {
  events: Event[];
}

// Approximate timeline dates (AD)
const TIMELINE_START = 0; // Start around birth of Christ
const TIMELINE_END = 36; // End a few years after crucifixion
const TIMELINE_STEPS = 12; // Number of year markers
const CHART_WIDTH = 1000;
const CHART_HEIGHT = 400;
const MARGIN = { top: 40, right: 40, bottom: 60, left: 60 };

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ events }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewportX, setViewportX] = useState<number>(0);
  const chartRef = useRef<SVGSVGElement>(null);
  
  // Filter events into their respective gospels
  const synopticEvents = events
    .filter(event => event.synopticOrder !== undefined)
    .sort((a, b) => (a.synopticOrder || 0) - (b.synopticOrder || 0));
    
  const johnEvents = events
    .filter(event => event.johnOrder !== undefined)
    .sort((a, b) => (a.johnOrder || 0) - (b.johnOrder || 0));
  
  // Estimate dates for events based on their order
  // This is an approximation for visualization purposes
  const estimateDate = (event: Event): number => {
    let estimatedYear = 0;
    
    if (event.id === "birth") return 0;
    if (event.id === "jesus-at-twelve") return 12;
    if (event.id === "baptism") return 28; // Commonly estimated start of ministry
    if (event.id === "resurrection" || event.id === "crucifixion") return 33; // Common estimation
    
    // For other events, estimate based on order and context
    if (event.synopticOrder !== undefined) {
      if (event.synopticOrder <= 4) { // Early life events
        return 0 + (event.synopticOrder * 3); 
      } else if (event.synopticOrder >= 37) { // Passion week events
        return 33; // Last week
      } else {
        // Scale the events between baptism (28 AD) and crucifixion (33 AD)
        const normalizedPosition = (event.synopticOrder - 5) / (37 - 5);
        return 28 + (normalizedPosition * 5);
      }
    } else if (event.johnOrder !== undefined) {
      if (event.johnOrder <= 2) {
        return 28; // Early ministry in John
      } else if (event.johnOrder >= 25) { 
        return 33; // Last week
      } else {
        // Scale the events between early ministry and crucifixion
        const normalizedPosition = (event.johnOrder - 2) / (25 - 2);
        return 28 + (normalizedPosition * 5);
      }
    }
    
    return estimatedYear;
  };
  
  // Calculate position on x-axis based on estimated date
  const getXPosition = (date: number): number => {
    const contentWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
    const scale = contentWidth / (TIMELINE_END - TIMELINE_START);
    return MARGIN.left + ((date - TIMELINE_START) * scale * (zoomLevel / 100));
  };
  
  // Y positions for the two timelines
  const synopticY = MARGIN.top + 80;
  const johnY = CHART_HEIGHT - MARGIN.bottom - 80;
  
  // Handle zoom
  const handleZoomChange = (_event: any, newValue: number | number[]) => {
    setZoomLevel(newValue as number);
  };
  
  // Reset the view
  const resetView = () => {
    setZoomLevel(100);
    setViewportX(0);
  };
  
  // Handle scrolling
  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY !== 0) {
      setViewportX(prev => Math.max(0, prev + e.deltaY));
    }
  };
  
  // Calculate total width based on zoom
  const getTotalWidth = () => CHART_WIDTH * (zoomLevel / 100);
  
  // Year markers for x-axis
  const yearMarkers = Array.from({ length: TIMELINE_STEPS + 1 }, (_, index) => {
    const year = TIMELINE_START + (index * ((TIMELINE_END - TIMELINE_START) / TIMELINE_STEPS));
    return Math.round(year);
  });
  
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" gutterBottom align="center" color="primary">
        Scientific Timeline Comparison
      </Typography>
      
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2">
          Zoom: {zoomLevel}%
        </Typography>
        <Slider
          value={zoomLevel}
          onChange={handleZoomChange}
          min={50}
          max={300}
          valueLabelDisplay="auto"
          sx={{ width: '60%', mx: 2 }}
        />
        <Button variant="outlined" size="small" onClick={resetView}>
          Reset View
        </Button>
      </Box>
      
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          mb: 4,
          '&::-webkit-scrollbar': {
            height: '8px',
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          }
        }}
        onWheel={handleScroll}
      >
        <Box sx={{ width: getTotalWidth(), height: CHART_HEIGHT, overflow: 'hidden' }}>
          <svg 
            width={getTotalWidth()} 
            height={CHART_HEIGHT} 
            ref={chartRef}
            style={{ transform: `translateX(-${viewportX}px)` }}
          >
            {/* Background grid */}
            <g className="grid">
              {yearMarkers.map((year) => (
                <line 
                  key={`grid-${year}`}
                  x1={getXPosition(year)}
                  y1={MARGIN.top}
                  x2={getXPosition(year)}
                  y2={CHART_HEIGHT - MARGIN.bottom}
                  stroke="#e5e5e5"
                  strokeWidth={1}
                />
              ))}
              {/* Horizontal divider line */}
              <line 
                x1={MARGIN.left}
                y1={CHART_HEIGHT / 2}
                x2={CHART_WIDTH - MARGIN.right}
                y2={CHART_HEIGHT / 2}
                stroke="#e0e0e0"
                strokeWidth={1}
                strokeDasharray="5,5"
              />
            </g>
            
            {/* X axis */}
            <g className="x-axis">
              <line 
                x1={MARGIN.left} 
                y1={CHART_HEIGHT - MARGIN.bottom}
                x2={CHART_WIDTH - MARGIN.right}
                y2={CHART_HEIGHT - MARGIN.bottom}
                stroke="#333"
                strokeWidth={2}
              />
              {yearMarkers.map((year) => (
                <g key={`year-${year}`}>
                  <line 
                    x1={getXPosition(year)}
                    y1={CHART_HEIGHT - MARGIN.bottom}
                    x2={getXPosition(year)}
                    y2={CHART_HEIGHT - MARGIN.bottom + 10}
                    stroke="#333"
                    strokeWidth={2}
                  />
                  <text
                    x={getXPosition(year)}
                    y={CHART_HEIGHT - MARGIN.bottom + 30}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="12px"
                  >
                    {year} AD
                  </text>
                </g>
              ))}
              <text
                x={CHART_WIDTH / 2}
                y={CHART_HEIGHT - 10}
                textAnchor="middle"
                fill="#333"
                fontSize="14px"
                fontWeight="bold"
              >
                Estimated Years (AD)
              </text>
            </g>
            
            {/* Y axis */}
            <g className="y-axis">
              <line 
                x1={MARGIN.left} 
                y1={MARGIN.top}
                x2={MARGIN.left}
                y2={CHART_HEIGHT - MARGIN.bottom}
                stroke="#333"
                strokeWidth={2}
              />
              
              {/* Synoptic label */}
              <text
                x={MARGIN.left - 10}
                y={synopticY}
                textAnchor="end"
                fill="#3f51b5"
                fontSize="14px"
                fontWeight="bold"
              >
                Synoptic
              </text>
              
              {/* John label */}
              <text
                x={MARGIN.left - 10}
                y={johnY}
                textAnchor="end"
                fill="#9c27b0"
                fontSize="14px"
                fontWeight="bold"
              >
                John
              </text>
              
              <text
                x={20}
                y={CHART_HEIGHT / 2}
                textAnchor="middle"
                fill="#333"
                fontSize="14px"
                fontWeight="bold"
                transform={`rotate(-90, 20, ${CHART_HEIGHT / 2})`}
              >
                Gospel Accounts
              </text>
            </g>
            
            {/* Event lines for Synoptic */}
            <path
              d={`M ${getXPosition(estimateDate(synopticEvents[0]))} ${synopticY} ${synopticEvents.slice(1).map(event => {
                return `L ${getXPosition(estimateDate(event))} ${synopticY}`;
              }).join(' ')}`}
              fill="none"
              stroke="#3f51b5"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeOpacity={0.7}
            />
            
            {/* Event lines for John */}
            <path
              d={`M ${getXPosition(estimateDate(johnEvents[0]))} ${johnY} ${johnEvents.slice(1).map(event => {
                return `L ${getXPosition(estimateDate(event))} ${johnY}`;
              }).join(' ')}`}
              fill="none"
              stroke="#9c27b0"
              strokeWidth={3}
              strokeLinejoin="round"
              strokeOpacity={0.7}
            />
            
            {/* Connection lines between matching events */}
            {events
              .filter(event => event.synopticOrder !== undefined && event.johnOrder !== undefined)
              .map(event => (
                <line
                  key={`connection-${event.id}`}
                  x1={getXPosition(estimateDate(event))}
                  y1={synopticY}
                  x2={getXPosition(estimateDate(event))}
                  y2={johnY}
                  stroke="#673ab7"
                  strokeWidth={1.5}
                  strokeDasharray="5,3"
                  strokeOpacity={0.6}
                />
              ))}
              
            {/* Synoptic events */}
            {synopticEvents.map(event => {
              const x = getXPosition(estimateDate(event));
              return (
                <g key={`synoptic-${event.id}`}>
                  <circle
                    cx={x}
                    cy={synopticY}
                    r={event.johnOrder !== undefined ? 6 : 4}
                    fill={event.johnOrder !== undefined ? "#673ab7" : "#3f51b5"}
                    stroke="white"
                    strokeWidth={2}
                    data-event-id={event.id}
                  />
                  <title>{event.title} - {estimateDate(event)} AD</title>
                </g>
              );
            })}
            
            {/* John events */}
            {johnEvents.map(event => {
              const x = getXPosition(estimateDate(event));
              return (
                <g key={`john-${event.id}`}>
                  <circle
                    cx={x}
                    cy={johnY}
                    r={event.synopticOrder !== undefined ? 6 : 4}
                    fill={event.synopticOrder !== undefined ? "#673ab7" : "#9c27b0"}
                    stroke="white"
                    strokeWidth={2}
                    data-event-id={event.id}
                  />
                  <title>{event.title} - {estimateDate(event)} AD</title>
                </g>
              );
            })}
            
            {/* Key events labels */}
            {['birth', 'baptism', 'crucifixion'].map(id => {
              const event = events.find(e => e.id === id);
              if (!event) return null;
              
              const x = getXPosition(estimateDate(event));
              return (
                <g key={`label-${id}`}>
                  <line
                    x1={x}
                    y1={MARGIN.top - 10}
                    x2={x}
                    y2={CHART_HEIGHT - MARGIN.bottom}
                    stroke="#333"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                  />
                  <text
                    x={x}
                    y={MARGIN.top - 15}
                    textAnchor="middle"
                    fill="#333"
                    fontSize="12px"
                    fontWeight="bold"
                  >
                    {event.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </Box>
      </Paper>
      
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>About This Timeline</Typography>
            <Typography variant="body2" paragraph>
              This scientific visualization maps the chronology of Jesus' life as presented in the synoptic gospels 
              (Matthew, Mark, and Luke) versus the Gospel of John, with estimated dates.
            </Typography>
            <Typography variant="body2" paragraph>
              The timeline uses scholarly approximations for key events: Jesus' birth (0 AD), 
              baptism (~28-30 AD), and crucifixion/resurrection (~33 AD). Other events are positioned 
              proportionally based on their narrative order in each gospel account.
            </Typography>
            <Typography variant="body2">
              Events appearing in both gospel traditions are connected with vertical lines, 
              highlighting differences in chronological placement.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>Legend</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#3f51b5', mr: 1 }} />
              <Typography variant="body2">Events in Synoptic Gospels only</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#9c27b0', mr: 1 }} />
              <Typography variant="body2">Events in John's Gospel only</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', backgroundColor: '#673ab7', mr: 1 }} />
              <Typography variant="body2">Events that appear in both gospel accounts</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ display: 'inline-block', width: 12, height: 2, borderRadius: '2px', backgroundColor: '#673ab7', mr: 1 }} />
              <Typography variant="body2">Connections between shared events</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Typography variant="caption" align="center" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
        Note: Dates are approximate and based on scholarly estimations for visualization purposes.
      </Typography>
    </Box>
  );
};

export default InteractiveTimeline;