import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Divider,
  Chip,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
  SelectChangeEvent
} from '@mui/material';
import {
  Storage,
  Add,
  Delete,
  Edit,
  Refresh,
  Star,
  StarBorder,
  Link as LinkIcon,
  ArrowBack,
  Save,
  Storage as DatabaseIcon
} from '@mui/icons-material';

// Define connection types with their default ports
interface ConnectionType {
  name: string;
  port: number;
  icon: React.ReactElement;
  color: string;
}

const connectionTypes: Record<string, ConnectionType> = {
  mysql: { 
    name: 'MySQL', 
    port: 3306,
    icon: <Storage sx={{ color: '#00758F' }} />,
    color: '#00758F' 
  },
  postgresql: { 
    name: 'PostgreSQL', 
    port: 5432,
    icon: <Storage sx={{ color: '#336791' }} />,
    color: '#336791' 
  },
  mongodb: { 
    name: 'MongoDB', 
    port: 27017,
    icon: <Storage sx={{ color: '#4DB33D' }} />,
    color: '#4DB33D' 
  }
};

// Interface for database connection
interface DbConnection {
  id: string;
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  favorite: boolean;
  lastConnected?: string;
}

// Mock data for saved connections
const initialConnections: DbConnection[] = [
  {
    id: '1',
    name: 'Local MySQL',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'mydatabase',
    favorite: true,
    lastConnected: '2 hours ago'
  },
  {
    id: '2',
    name: 'Production PostgreSQL',
    type: 'postgresql',
    host: 'db.example.com',
    port: 5432,
    username: 'admin',
    password: 'securepass',
    database: 'production_db',
    favorite: false,
    lastConnected: 'Yesterday'
  },
  {
    id: '3',
    name: 'MongoDB Atlas',
    type: 'mongodb',
    host: 'cluster0.mongodb.net',
    port: 27017,
    username: 'dbuser',
    password: 'atlas123',
    database: 'analytics',
    favorite: true,
    lastConnected: '3 days ago'
  }
];

// Connection steps for stepper
const connectionSteps = ['Validating input', 'Connecting to server', 'Authenticating', 'Connecting to database'];

const DatabaseConnection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for connections list
  const [connections, setConnections] = useState<DbConnection[]>(initialConnections);
  const [selectedConnection, setSelectedConnection] = useState<DbConnection | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // State for connection form
  const [formValues, setFormValues] = useState<Partial<DbConnection>>({
    name: '',
    type: 'mysql',
    host: '',
    port: 3306,
    username: '',
    password: '',
    database: '',
    favorite: false
  });
  
  // State for connection dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  
  // State for alerts
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  // Update port when connection type changes
  useEffect(() => {
    if (formValues.type && connectionTypes[formValues.type]) {
      setFormValues(prev => ({
        ...prev,
        port: connectionTypes[formValues.type!].port
      }));
    }
  }, [formValues.type]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setConnections(connections.map(conn => 
      conn.id === id ? { ...conn, favorite: !conn.favorite } : conn
    ));
  };

  // Delete a connection
  const deleteConnection = (id: string) => {
    setConnections(connections.filter(conn => conn.id !== id));
    showAlert('Connection deleted successfully', 'success');
  };

  // Edit connection
  const editConnection = (connection: DbConnection) => {
    setSelectedConnection(connection);
    setFormValues(connection);
    setIsEditing(true);
  };

  // Save edited connection
  const saveConnection = () => {
    if (!formValues.name || !formValues.host || !formValues.username) {
      showAlert('Please fill all required fields', 'error');
      return;
    }

    if (isEditing && selectedConnection) {
      setConnections(connections.map(conn => 
        conn.id === selectedConnection.id ? { ...conn, ...formValues as DbConnection } : conn
      ));
      showAlert('Connection updated successfully', 'success');
    } else {
      const newConnection: DbConnection = {
        id: Date.now().toString(),
        name: formValues.name!,
        type: formValues.type!,
        host: formValues.host!,
        port: formValues.port!,
        username: formValues.username!,
        password: formValues.password!,
        database: formValues.database!,
        favorite: formValues.favorite!
      };
      setConnections([...connections, newConnection]);
      showAlert('New connection added successfully', 'success');
    }
    
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setFormValues({
      name: '',
      type: 'mysql',
      host: '',
      port: 3306,
      username: '',
      password: '',
      database: '',
      favorite: false
    });
    setSelectedConnection(null);
    setIsEditing(false);
  };

  // Show alert
  const showAlert = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  // Test connection
  const testConnection = () => {
    if (!formValues.name || !formValues.host || !formValues.username) {
      showAlert('Please fill all required fields', 'error');
      return;
    }

    setConnectionError(null);
    setConnectionSuccess(false);
    setOpenDialog(true);
    setIsConnecting(true);
    setActiveStep(0);

    // Simulate connection steps
    const simulateStep = (step: number, maxSteps: number) => {
      setTimeout(() => {
        setActiveStep(step);
        
        // Simulate random failure at authentication (step 2) with 20% probability
        if (step === 2 && Math.random() < 0.2) {
          setConnectionError('Authentication failed. Please check your credentials.');
          setIsConnecting(false);
          return;
        }
        
        if (step < maxSteps - 1) {
          simulateStep(step + 1, maxSteps);
        } else {
          // Connection successful
          setConnectionSuccess(true);
          setIsConnecting(false);
        }
      }, 1000); // Each step takes 1 second
    };

    simulateStep(0, connectionSteps.length);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    if (connectionSuccess) {
      // If connection was successful, update the last connected time for new connections
      if (!isEditing) {
        saveConnection();
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 1, sm: 3 } }} className="fade-in">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          component="h1" 
          variant="h4" 
          fontWeight="bold" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            color: 'primary.main' 
          }}
        >
          <LinkIcon fontSize="large" />
          Database Connections
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={!isEditing ? <Add /> : <ArrowBack />}
          onClick={isEditing ? resetForm : () => {}}
          color={!isEditing ? 'primary' : 'secondary'}
        >
          {!isEditing ? 'New Connection' : 'Cancel Edit'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Saved Connections List */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper 
            sx={{ 
              borderRadius: '12px',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ 
              p: 2, 
              borderBottom: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              bgcolor: 'background.paper',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Saved Connections
              </Typography>
              <Chip 
                label={`${connections.length} total`} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
            </Box>
            
            {connections.length > 0 ? (
              <List sx={{ flexGrow: 1, p: 0, overflow: 'auto' }}>
                {connections.map((connection) => (
                  <React.Fragment key={connection.id}>
                    <ListItem 
                      disablePadding 
                      secondaryAction={
                        <Box>
                          <Tooltip title="Toggle favorite">
                            <IconButton 
                              edge="end" 
                              onClick={() => toggleFavorite(connection.id)}
                              size="small"
                            >
                              {connection.favorite ? (
                                <Star sx={{ color: theme.palette.warning.main }} />
                              ) : (
                                <StarBorder />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit connection">
                            <IconButton 
                              edge="end" 
                              onClick={() => editConnection(connection)}
                              size="small"
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete connection">
                            <IconButton 
                              edge="end" 
                              onClick={() => deleteConnection(connection.id)}
                              size="small"
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      }
                    >
                      <ListItemButton 
                        selected={selectedConnection?.id === connection.id}
                        onClick={() => editConnection(connection)}
                        sx={{ py: 1.5 }}
                      >
                        <ListItemIcon>
                          {connectionTypes[connection.type].icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography variant="body1" fontWeight={500} sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}>
                              {connection.name}
                              {connection.favorite && (
                                <Star 
                                  sx={{ 
                                    fontSize: '0.8rem', 
                                    color: theme.palette.warning.main,
                                    ml: 0.5
                                  }} 
                                />
                              )}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography variant="body2" component="span">
                                {connection.host}:{connection.port}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                component="p" 
                                sx={{ 
                                  color: 'text.secondary',
                                  mt: 0.5,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <Badge 
                                  variant="dot" 
                                  color="success" 
                                  sx={{ 
                                    '& .MuiBadge-dot': { 
                                      backgroundColor: alpha(theme.palette.success.main, 0.8) 
                                    }
                                  }}
                                />
                                Last connected: {connection.lastConnected || 'Never'}
                              </Typography>
                            </>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <DatabaseIcon sx={{ fontSize: 60, color: alpha(theme.palette.text.secondary, 0.2), mb: 2, mx: 'auto' }} />
                <Typography color="text.secondary">
                  No connections saved yet
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<Add />} 
                  sx={{ mt: 2, mx: 'auto' }}
                  onClick={resetForm}
                >
                  Add your first connection
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Connection Form */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper 
            sx={{ 
              p: { xs: 2, md: 3 }, 
              borderRadius: '12px',
              height: '100%'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" fontWeight="bold">
                {isEditing ? 'Edit Connection' : 'New Connection'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isEditing 
                  ? 'Update your database connection details' 
                  : 'Configure a new connection to your database server'}
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              {/* Connection Name */}
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="Connection Name"
                  placeholder="e.g., Production Database"
                  value={formValues.name || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              
              {/* Database Type */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Database Type</InputLabel>
                  <Select
                    labelId="type-label"
                    name="type"
                    value={formValues.type || 'mysql'}
                    onChange={handleInputChange}
                    label="Database Type"
                    variant="outlined"
                  >
                    {Object.entries(connectionTypes).map(([key, type]) => (
                      <MenuItem value={key} key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {React.cloneElement(type.icon, { fontSize: 'small' })}
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Host */}
              <Grid item xs={12} md={5}>
                <TextField
                  required
                  fullWidth
                  name="host"
                  label="Host"
                  placeholder="localhost or db.example.com"
                  value={formValues.host || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              
              {/* Port */}
              <Grid item xs={12} md={3}>
                <TextField
                  required
                  fullWidth
                  name="port"
                  label="Port"
                  type="number"
                  value={formValues.port || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              
              {/* Username */}
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  value={formValues.username || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              
              {/* Password */}
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formValues.password || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              
              {/* Database Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="database"
                  label="Database Name"
                  placeholder="Leave empty to list all databases"
                  value={formValues.database || ''}
                  onChange={handleInputChange}
                  variant="outlined"
                  helperText="Specify the database to connect to, or leave empty to list all available databases"
                />
              </Grid>
              
              {/* Actions */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={resetForm}
                  >
                    {isEditing ? 'Cancel' : 'Clear Form'}
                  </Button>
                  
                  <Box>
                    <Button 
                      variant="outlined" 
                      sx={{ mr: 2 }}
                      onClick={testConnection}
                      startIcon={<Refresh />}
                    >
                      Test Connection
                    </Button>
                    
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={saveConnection}
                      startIcon={<Save />}
                    >
                      {isEditing ? 'Save Changes' : 'Save Connection'}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Connection Test Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '12px' }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {connectionTypes[formValues.type || 'mysql'].icon}
            <Typography variant="h6" component="span">
              {connectionSuccess 
                ? 'Connection Successful!' 
                : connectionError 
                  ? 'Connection Failed' 
                  : 'Testing Connection'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            p: 2,
            borderRadius: '8px',
            mb: 2
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Connection Details:
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Type:</span> <span>{connectionTypes[formValues.type || 'mysql'].name}</span>
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Host:</span> <span>{formValues.host}:{formValues.port}</span>
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>User:</span> <span>{formValues.username}</span>
            </Typography>
            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Database:</span> <span>{formValues.database || '(all databases)'}</span>
            </Typography>
          </Box>
          
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {connectionSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {isConnecting && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <CircularProgress />
            </Box>
          )}
          
          {connectionError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {connectionError}
            </Alert>
          )}
          
          {connectionSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Successfully connected to {formValues.type} server at {formValues.host}:{formValues.port}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>
            {connectionSuccess ? 'Close' : 'Cancel'}
          </Button>
          {connectionSuccess && (
            <Button 
              onClick={() => {
                handleCloseDialog();
                // Connect to the database (in a real app)
              }}
              variant="contained" 
              color="primary"
              startIcon={<LinkIcon />}
            >
              Connect Now
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Alert Message */}
      <Snackbar 
        open={alertOpen} 
        autoHideDuration={5000} 
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setAlertOpen(false)} 
          severity={alertSeverity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DatabaseConnection; 