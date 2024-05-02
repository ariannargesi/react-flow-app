import { DragEvent, useEffect, useState } from 'react'
import { Box, Typography, Grid, Stack, useTheme } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import DropableNode from '../../ui/DroppableNode'

import { NodeType } from '../../../types'

interface Props {
    list: any[],
    searchQuery: string,
}


const handleDrag = (event: DragEvent, value: any) => {
    event.dataTransfer.setData(
        'application/reactflow',
        JSON.stringify(value)
    )
}

const NewGroup = () => {
    const theme = useTheme()
    return (
        <Stack
            draggable
            onDragStart={event => {
                handleDrag(event, {
                    type: NodeType.Group,
                    data: { label: 'New group' },
                })
            }}
            m={1} direction='row' alignItems='center' justifyContent={'center'} spacing={1} border={`1px solid ${theme.palette.primary.main}`} p={1} borderRadius={1}>
            <AddOutlined color='primary' fontSize='small' />
            <Typography variant='body2' component='span' color='primary'>Drag a new group</Typography>
        </Stack>
    )
}

const Components = (props: Props) => {


    const bgColor = useTheme().palette.grey[100]
    const { list, searchQuery } = props
    const [result, setResult] = useState(list)
    useEffect(() => {
        setResult(list.filter(item => item.product.indexOf(searchQuery) != -1))
    }, [searchQuery, list])
    return (
        <Box bgcolor={bgColor} p={1}>
            <Typography component='h5' fontWeight={600}>Components</Typography>
            <br/>
            {result.length === 0 && (
                <Typography variant='body1' component='h5' m={1} >No result for "{searchQuery}"</Typography>
            )}
            <NewGroup />
            <Grid container rowSpacing={1} columnGap={1.4} p={1}>
                {result.map(item => {
                    item.type = NodeType.Component
                    return (
                        <Grid item key={item.key}>
                            <DropableNode
                                type={item.type}
                                label={item.product}
                                thumbnail={item.thumbnail}
                                containerProps={{
                                    draggable: true,
                                    onDragStart: (event) => {
                                        handleDrag(event, item)
                                    }
                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default Components