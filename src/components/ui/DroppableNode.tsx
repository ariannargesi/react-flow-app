import { Box, useTheme } from '@mui/material'
import { DroppableNode } from '../../types'

interface Props extends DroppableNode {
    label: string
    thumbnail: string
    containerProps: React.HTMLAttributes<HTMLDivElement>
}

const DropableNode = (props: Props) => {
    const theme = useTheme()
    console.log(props)
    return (
        <Box
            width={36}
            height={36}
            {...props.containerProps}
            sx={{
                
                ':hover': {
                    cursor: 'grab',
                    backgroundColor: theme.palette.grey[100],
                },
            }}
        >
             <img src={props.thumbnail}/>
         
        </Box>
    )
}

export default DropableNode
