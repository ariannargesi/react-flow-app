import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import store from './redux/store'

import App from './App'
import theme from './theme'
import './styles.css'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Provider>
)
