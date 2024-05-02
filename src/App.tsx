import { ReactFlowProvider } from 'reactflow'
import 'reactflow/dist/style.css'

import Diagram from './components/diagram'
import ActionBar from './components/ActionBar'
import Sidebar from './components/diagram/Sidebar'

import { Box, Divider } from '@mui/material'

const App = () => {
    return (
        <>
            <ActionBar />
            <Divider />
            <Box
                height={'calc(100vh - 86px)'}
            >
                <Sidebar />
                <Box height="100%" display={'flex'} justifyContent='space-between' flexDirection={'column'}>
                    <Divider/>
                    <ReactFlowProvider>
                        <Diagram />
                    </ReactFlowProvider>
                </Box>
            </Box>
        </>
    )
}

export default App
