import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    components: {
        MuiTooltip: {
            defaultProps: {
                PopperProps: {
                    disablePortal: true 
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(0,0,0,0)',
                },
            },
        },

        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: '#535B6B',
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    marginLeft: 0,
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#535B6B',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: 48,
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    height: 'unset',
                    borderRadius: 4,
                    fontSize: 14,
                    backgroundColor: '#F4F7FE',
                    boxShadow: '0 0 1px 1px #E3E6EE',
                    color: '#3F4254',
                },
                deleteIcon: {
                    color: '##707C9D',
                },
            },
        },
    },
    typography: {
        allVariants: {
            fontFamily: 'Inter'
        },
        button: {
            textTransform: 'none'
        },
        h1: {
            fontSize: 32,
            lineHeight: '48px',
        },
        h2: {
            fontSize: 24,
            lineHeight: '40px',
        },
        h3: {
            fontSize: 18,

            lineHeight: '32px',
        },
        h4: {
            fontSize: 16,
            lineHeight: '28px',
        },
        h5: {
            fontSize: '1rem',
        },
    },
    palette: {
        grey: {
            100: '#F6F8FA',
            700: '#3F4254'
        },
        primary:{
            500: '#3763D3'
        }
    }
})

export default theme
