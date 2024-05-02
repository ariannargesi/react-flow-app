import { useState, useEffect } from 'react'
import { Check, Close, KeyboardArrowDown, Search } from '@mui/icons-material'
import {
    Select as MuiSelect,
    Stack,
    Typography,
    styled,
    List,
    Divider,
    InputBase,
    ListItemText,
    ListItemButton,
    Box,
    IconButton,
    ListItemIcon,
    Button,
    useTheme,
} from '@mui/material'
import useToggle from '../../../hooks/useToggle'

const Select = styled(MuiSelect)(() => ({
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}))

interface Props {
    list: string[]
    values: string[]
    onChange: (value: string) => void
}

const LibrarySelect = (props: Props) => {
    const bgColor = useTheme().palette.grey[100]
    const [renderList, setRenderList] = useState<string[]>(props.list)
    const [searchQuery, setSearchQuery] = useState('')
    const [showAll, toggleShowAll] = useToggle(false)

    useEffect(() => {
        setRenderList(() => {
            let listCopy = [...props.list]
            if (searchQuery)
                listCopy = listCopy.filter(
                    (item) => item.indexOf(searchQuery) != -1
                )
            return listCopy
        })
    }, [searchQuery, showAll, props.list])

    const clearInput = () => {
        setSearchQuery('')
    }

    const handleChange = (item: string) => {
        props.onChange(item)
    }

    const handleOpen = () => {
        if (props.values.length) {
            let mainCopy = [...renderList]
            mainCopy = mainCopy.filter((item) => {
                if (props.values.indexOf(item) != -1) return false
                return true
            })
            setRenderList([...props.values, ...mainCopy])
        }
    }

    const handleClose = () => {
        if (showAll) toggleShowAll()
        setSearchQuery('')
    }

    return (
        <Stack
            height={34}
            bgcolor={bgColor}
            direction="row"
            alignItems={'center'}
            pl={1}
        >
            <Typography component="label" color={'gray'}>
                Library:
            </Typography>
            <Select
                onOpen={handleOpen}
                onClose={handleClose}
                IconComponent={KeyboardArrowDown}
                displayEmpty
                renderValue={() => {
                    const list = props.values as string[]
                    const label = list.map((item, index) => {
                        let res = item
                        if (index != list.length - 1) res += ', '
                        return res
                    })
                    return (
                        <Typography fontWeight={700} noWrap width={100}>
                            {list.length === 0 ? 'All' : label}
                        </Typography>
                    )
                }}
            >
                <Box display="flex" flexDirection="column" height={'315px'}>
                    <Box>
                        <Stack px={2} direction="row" alignItems={'center'}>
                            <InputBase
                                autoFocus
                                placeholder="Search Libraries"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value.trim())
                                }
                            />
                            <IconButton
                                onClick={searchQuery ? clearInput : undefined}
                            >
                                {searchQuery ? (
                                    <Close onClick={() => clearInput()} />
                                ) : (
                                    <Search />
                                )}
                            </IconButton>
                        </Stack>
                    </Box>
                    <Divider />

                    {!renderList.length && (
                        <Box p={3}>
                            <Typography>Nothing found!</Typography>
                        </Box>
                    )}

                    <List sx={{ flex: 1, overflow: 'auto' }}>
                        {(showAll ? renderList : [...renderList].splice(0, 5)).map(
                            (item) => (
                                        <ListItemButton
                                            key={item}
                                            selected={
                                                props.values.indexOf(item) != -1
                                            }
                                            sx={{
                                                color:
                                                    props.values.indexOf(
                                                        item
                                                    ) != -1
                                                        ? 'primary'
                                                        : null,
                                            }}
                                            onClick={() => handleChange(item)}
                                        >
                                            <ListItemText primary={item} />
                                            {props.values.indexOf(item) !=
                                                -1 && (
                                                    <ListItemIcon color="success">
                                                        <Check color="success" />
                                                    </ListItemIcon>
                                                )}
                                        </ListItemButton>
                                )
                            
                        )}
                    </List>
                    <Box px={2}>
                        {renderList.length > 5 && (
                            <Button
                                size="small"
                                onClick={toggleShowAll}
                                fullWidth
                            >
                                {showAll ? 'See less' : 'See more'}
                                {
                                props.values.length > 0
                                    ? `( ${props.values.length} selected )`
                                    : ''}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Select>
        </Stack>
    )
}

export default LibrarySelect
