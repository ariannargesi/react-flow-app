import { Box, Tooltip } from '@mui/material'
import { ComponentData, NodeProps } from '../../types'
import CustomHandle from './CustomHandles'
import { Typography } from '@mui/material'

const imageWidth = 64
const labelTranslateX = `translateX(calc(-50% + ${imageWidth / 2}px))`

export default (props: NodeProps<ComponentData>) => {
    const id = props.id
    const { label, thumbnail, visiblePorts } = props.data

    return (
        <Box style={{ position: 'relative' }}>
            
            <div style={{ position: 'relative' }}>
                <CustomHandle id={id} visiblePorts={visiblePorts} />
                <img src={thumbnail} width={64} style={{ display: 'block' }} />
            </div>
            <Tooltip title={label}>
                <Typography
                    variant="h5"
                    component={'span'}
                    width={96}
                    textAlign={'center'}
                    noWrap
                    position="absolute"
                    top={72}
                    style={{
                        transform: labelTranslateX,
                    }}
                >
                    {label}
                </Typography>
            </Tooltip>
        </Box>
    )
}
