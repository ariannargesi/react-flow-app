import { Box } from '@mui/material'

interface Props {
    children: React.ReactNode
}

const BlueBox = (props: Props) => (
    <Box
        p={2}
        my={2}
        bgcolor="rgba(244, 247, 254, 0.7)"
        boxShadow="0px 1px 0px rgba(55, 91, 211, 0.5)"
    >
        {props.children}
    </Box>
)

export default BlueBox
