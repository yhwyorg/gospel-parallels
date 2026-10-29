import React from 'react';
import { Box, Typography, Card, CardContent, Divider } from '@mui/material';
import { Event } from '../data/gospelEvents';

interface EventComparisonProps {
  event: Event;
}

const EventComparison: React.FC<EventComparisonProps> = ({ event }) => {
  const hasSynopticReference = event.synopticOrder !== undefined;
  const hasJohnReference = event.johnOrder !== undefined;

  return (
    <Card variant="outlined" sx={{ mb: 2, p: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {event.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {event.description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box display="flex" justifyContent="space-between">
          <Box width="48%">
            <Typography variant="h6" color="primary" gutterBottom>
              Synoptic Gospels
            </Typography>
            
            {hasSynopticReference ? (
              <>
                <Typography variant="body2">
                  <strong>Chronological Position:</strong> {event.synopticOrder}
                </Typography>
                
                {Object.entries(event.synopticReferences).map(([gospel, reference]) => (
                  reference && (
                    <Typography key={gospel} variant="body2">
                      <strong>{gospel.charAt(0).toUpperCase() + gospel.slice(1)}:</strong> {reference}
                    </Typography>
                  )
                ))}
              </>
            ) : (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                Not mentioned in synoptic gospels
              </Typography>
            )}
          </Box>
          
          <Box width="48%">
            <Typography variant="h6" color="secondary" gutterBottom>
              Gospel of John
            </Typography>
            
            {hasJohnReference ? (
              <>
                <Typography variant="body2">
                  <strong>Chronological Position:</strong> {event.johnOrder}
                </Typography>
                
                <Typography variant="body2">
                  <strong>Reference:</strong> {event.johnReference}
                </Typography>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                Not mentioned in John's gospel
              </Typography>
            )}
          </Box>
        </Box>
        
        {hasSynopticReference && hasJohnReference && (
          <Box sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Chronological Difference: 
              {event.synopticOrder !== event.johnOrder ? 
                ` ${Math.abs(event.synopticOrder! - event.johnOrder!)} positions apart` : 
                ' Same position in both gospels'}
            </Typography>
            
            {/* Major differences section */}
            {event.id === "temple-cleansing-john" && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                <strong>Major Difference:</strong> The temple cleansing appears early in John's gospel (during Jesus' first visit to Jerusalem) but near the end of his ministry in the synoptic gospels (during the final week).
              </Typography>
            )}
            {event.id === "baptism" && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                <strong>Major Difference:</strong> In John, John the Baptist's testimony about Jesus is emphasized more than the baptism event itself.
              </Typography>
            )}
            {event.id === "feeding-5000" && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                <strong>Major Difference:</strong> In John, this miracle leads directly to the Bread of Life discourse, while the synoptics emphasize different aspects and continue with different events.
              </Typography>
            )}
            {event.id === "last-supper" && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                <strong>Major Difference:</strong> John includes the extended farewell discourse and high priestly prayer (John 13-17) not found in the synoptics, while the synoptics include the institution of the Lord's Supper not explicitly mentioned in John.
              </Typography>
            )}
            {event.id === "calling-disciples" && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                <strong>Major Difference:</strong> John presents a more gradual process of the disciples following Jesus, while the synoptic accounts emphasize an immediate response to Jesus' call.
              </Typography>
            )}
          </Box>
        )}
        
        {/* Add a section for unique events that demonstrate major gospel differences */}
        {((event.id === "water-wine" || 
           event.id === "nicodemus" || 
           event.id === "samaritan-woman" || 
           event.id === "bethesda-healing" || 
           event.id === "bread-of-life" || 
           event.id === "light-of-world" || 
           event.id === "good-shepherd" || 
           event.id === "lazarus") && hasJohnReference && !hasSynopticReference) && (
          <Box sx={{ mt: 2, p: 1, bgcolor: '#fff3e0', borderRadius: 1 }}>
            <Typography variant="body2" color="error">
              <strong>Major Difference:</strong> This significant event/discourse is unique to John's gospel and shows John's emphasis on Jesus' divinity and identity as the Messiah.
            </Typography>
          </Box>
        )}
        
        {(event.id === "kingdom-parables" || 
          event.id === "sermon-mount" || 
          event.id === "transfiguration") && hasSynopticReference && !hasJohnReference && (
          <Box sx={{ mt: 2, p: 1, bgcolor: '#e1f5fe', borderRadius: 1 }}>
            <Typography variant="body2" color="primary">
              <strong>Major Difference:</strong> This significant event is featured prominently in the synoptic gospels but omitted in John, highlighting the synoptics' focus on Jesus' teachings about the kingdom.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default EventComparison;