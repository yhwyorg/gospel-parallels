import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
import { Box, Container, Typography, AppBar, Toolbar, Tabs, Tab, Paper, Divider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import GospelTimeline from './components/GospelTimeline'
import EventComparison from './components/EventComparison'
import InteractiveTimeline from './components/InteractiveTimeline'
import { gospelEvents } from './data/gospelEvents'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
import { ThemeProvider, createTheme } from '@mui/material/styles'
import GospelTimeline from './components/GospelTimeline'
import EventComparison from './components/EventComparison'
import InteractiveTimeline from './components/InteractiveTimeline'
import { gospelEvents } from './data/gospelEvents'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
import { useState } from 'react'
import { Box, Container, Typography, AppBar, Toolbar, Tabs, Tab, Paper, Divider } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import GospelTimeline from './components/GospelTimeline'
import EventComparison from './components/EventComparison'
import InteractiveTimeline from './components/InteractiveTimeline'
import { gospelEvents } from './data/gospelEvents'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
import EventComparison from './components/EventComparison'
import InteractiveTimeline from './components/InteractiveTimeline'
import { gospelEvents } from './data/gospelEvents'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
import GospelTimeline from './components/GospelTimeline'
import EventComparison from './components/EventComparison'
import InteractiveTimeline from './components/InteractiveTimeline'
import { gospelEvents } from './data/gospelEvents'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
import InteractiveTimeline from './components/InteractiveTimeline'
import { gospelEvents } from './data/gospelEvents'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
import { gospelEvents } from './data/gospelEvents'
import './App.css'

function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(gospelEvents[0].id);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5', // Blue for Synoptic Gospels
        dark: '#303f9f',
        light: '#7986cb',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#9c27b0', // Purple for John's Gospel (changed from pink for better readability)
        dark: '#7b1fa2',
        light: '#ba68c8',
        contrastText: '#ffffff'
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff'
      },
      text: {
        primary: '#212121',
        secondary: '#616161'
      }
    },
    components: {
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            fontSize: '0.95rem',
            '&.Mui-selected': {
              backgroundColor: 'rgba(63, 81, 181, 0.08)'
            },
            '&:hover': {
              backgroundColor: 'rgba(63, 81, 181, 0.04)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.05)'
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#303f9f', // Slightly darker blue for the app bar
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
          }
        }
      },
      MuiGrid: {
        defaultProps: {
          // Set default props for Grid to avoid type errors
        }
      }
    },
    typography: {
      h5: {
        fontWeight: 600,
        color: '#303f9f'
      },
      h6: {
        fontWeight: 600,
        marginBottom: '12px'
      }
    }
  });

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0: // Timeline View
        return (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <GospelTimeline events={gospelEvents} gospelType="synoptic" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <GospelTimeline events={gospelEvents} gospelType="john" />
            </Box>
          </Box>
        );
      case 1: // Event Comparison
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Key Events Comparison</Typography>
            <Tabs 
              value={selectedEvent} 
              onChange={(_, value) => setSelectedEvent(value)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                mb: 3,
                '& .MuiTab-root': {
                  minHeight: '48px',
                  padding: '6px 16px',
                  marginRight: '2px',
                  borderRadius: '4px 4px 0 0',
                  transition: 'all 0.2s ease',
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3
                }
              }}
            >
              {gospelEvents.map(event => (
                <Tab 
                  key={event.id} 
                  label={event.title} 
                  value={event.id} 
                  sx={{ 
                    border: '1px solid transparent',
                    borderBottom: 'none',
                    color: event.synopticOrder !== undefined && event.johnOrder !== undefined 
                      ? '#673ab7' 
                      : event.synopticOrder !== undefined 
                        ? '#3f51b5' 
                        : '#9c27b0',
                    fontWeight: 500,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(0,0,0,0.03)',
                      borderColor: 'rgba(0,0,0,0.1)',
                      borderBottomColor: 'transparent',
                      fontWeight: 600,
                    }
                  }}
                />
              ))}
            </Tabs>
            <EventComparison event={gospelEvents.find(e => e.id === selectedEvent)!} />
          </Box>
        );
      case 2: // Major Differences
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Major Chronological & Narrative Differences</Typography>
            <Typography variant="body1" paragraph>
              The chronology and narrative focus of Jesus' life differs significantly between the synoptic gospels (Matthew, Mark, and Luke) 
              and the Gospel of John. Here are the most notable differences:
            </Typography>

            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" color="primary">Temple Cleansing</Typography>
              <Typography variant="body2" paragraph>
                In the synoptic gospels, Jesus cleanses the temple near the end of his ministry, just before his crucifixion.
                However, in John's gospel, this event appears near the beginning of Jesus' ministry (John 2:13-22).
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>Synoptics:</strong> Near end of ministry (Matthew 21:12-17, Mark 11:15-19, Luke 19:45-48)</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>John:</strong> Beginning of ministry (John 2:13-22)</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" color="primary">Ministry Duration & Geography</Typography>
              <Typography variant="body2" paragraph>
                The synoptics imply Jesus' ministry lasted about one year, with only one Passover mentioned.
                John's gospel mentions three Passovers (John 2:13, 6:4, 11:55), suggesting a ministry of about three years.
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>Synoptics:</strong> Focus on Galilean ministry with one final journey to Jerusalem</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>John:</strong> Multiple trips between Galilee and Jerusalem, emphasis on Judean ministry</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" color="primary">Unique Events in John</Typography>
              <Typography variant="body2" paragraph>
                John includes several significant events not found in the synoptics:
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2">• Wedding at Cana (Jesus' first miracle - John 2:1-11)</Typography>
                <Typography variant="body2">• Conversation with Nicodemus (John 3:1-21)</Typography>
                <Typography variant="body2">• Samaritan woman at the well (John 4:1-42)</Typography>
                <Typography variant="body2">• Healing at the Pool of Bethesda (John 5:1-15)</Typography>
                <Typography variant="body2">• Bread of Life discourse (John 6:22-71)</Typography>
                <Typography variant="body2">• Jesus at the Feast of Tabernacles (John 7:1-52)</Typography>
                <Typography variant="body2">• Healing of man born blind (John 9:1-41)</Typography>
                <Typography variant="body2">• Good Shepherd discourse (John 10:1-21)</Typography>
                <Typography variant="body2">• Raising of Lazarus (John 11:1-44)</Typography>
              </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" color="primary">Unique Events in Synoptics</Typography>
              <Typography variant="body2" paragraph>
                The synoptic gospels include important events and teachings not found in John:
              </Typography>
              <Box sx={{ ml: 2 }}>
                <Typography variant="body2">• Birth narratives (Matthew 1-2, Luke 1-2)</Typography>
                <Typography variant="body2">• Jesus' baptism (described directly in Matthew 3:13-17, Mark 1:9-11, Luke 3:21-22)</Typography>
                <Typography variant="body2">• Temptation in the wilderness (Matthew 4:1-11, Mark 1:12-13, Luke 4:1-13)</Typography>
                <Typography variant="body2">• Sermon on the Mount/Plain (Matthew 5-7, Luke 6:17-49)</Typography>
                <Typography variant="body2">• Most parables about the Kingdom of God</Typography>
                <Typography variant="body2">• Transfiguration (Matthew 17:1-13, Mark 9:2-13, Luke 9:28-36)</Typography>
                <Typography variant="body2">• Institution of the Lord's Supper (Matthew 26:26-30, Mark 14:22-26, Luke 22:14-23)</Typography>
              </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" color="primary">Last Supper & Crucifixion Timing</Typography>
              <Typography variant="body2" paragraph>
                In the synoptics, the Last Supper is a Passover meal. In John, it takes place before the Passover,
                with Jesus crucified on the day of Passover preparation when lambs were being slaughtered - presenting 
                Jesus as the true Passover lamb.
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>Synoptics:</strong> Last Supper is a Passover meal (Mark 14:12)</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>John:</strong> Last Supper before Passover; crucifixion on Preparation Day (John 13:1, 18:28, 19:14)</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" color="primary">Calling of the Disciples</Typography>
              <Typography variant="body2" paragraph>
                The accounts of how the disciples were called differ significantly between John and the synoptics.
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>Synoptics:</strong> Jesus calls fishermen by the Sea of Galilee who immediately follow him (Matthew 4:18-22, Mark 1:16-20)</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>John:</strong> More gradual process beginning with disciples of John the Baptist (John 1:35-51)</Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" color="primary">Theological Emphases</Typography>
              <Typography variant="body2" paragraph>
                While all gospels present Jesus as the Messiah and Son of God, they emphasize different aspects of his identity and ministry:
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>Synoptics:</strong> Focus on Jesus' teachings about the Kingdom of God, parables, ethical instruction, and actions</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2"><strong>John:</strong> Emphasis on Jesus' divine identity through the "I am" statements, extended discourses, and signs pointing to his divinity</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        );
      case 3: // Interactive Timeline
        return (
          <Box>
            <InteractiveTimeline events={gospelEvents} />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Jesus Chronology Comparison: Synoptics vs John
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>Comparing Gospel Chronologies</Typography>
            <Typography variant="body1" paragraph>
              This application compares the chronology of Jesus' life as presented in the synoptic gospels
              (Matthew, Mark, and Luke) versus the Gospel of John. The synoptic gospels share a similar structure
              and chronology, while John's gospel presents a different timeline of events.
            </Typography>
            <Typography variant="body1">
              Use the tabs below to explore different ways of comparing these chronologies.
            </Typography>
          </Paper>
          
          <Tabs 
            value={selectedTab} 
            onChange={handleTabChange} 
            sx={{ 
              mb: 3,
              '& .MuiTabs-indicator': {
                height: 3,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3
              }
            }}
            TabIndicatorProps={{
              style: {
                backgroundColor: selectedTab === 2 ? '#8e24aa' : selectedTab === 3 ? '#ff9800' : '#3949ab'
              }
            }}
          >
            <Tab 
              label="Timeline View" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '1rem',
                '&.Mui-selected': { color: '#3949ab' }
              }} 
            />
            <Tab 
              label="Event Comparison" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '1rem',
                '&.Mui-selected': { color: '#3949ab' }
              }} 
            />
            <Tab 
              label="Major Differences" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '1rem',
                '&.Mui-selected': { color: '#8e24aa' }
              }} 
            />
            <Tab 
              label="Interactive Timeline" 
              sx={{ 
                fontWeight: 600, 
                fontSize: '1rem',
                '&.Mui-selected': { color: '#ff9800' }
              }} 
            />
          </Tabs>
          
          {renderTabContent()}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
