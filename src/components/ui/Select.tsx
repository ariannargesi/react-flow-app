import { Stack, FormControl, InputLabel, Chip, Box, Select as MuiSelect, MenuItem, ListItemText, Checkbox, SelectChangeEvent, Divider } from '@mui/material'
import { ClearOutlined } from '@mui/icons-material'

interface SelectProps {
    id: string
    value: string[] | string
    options: string[]
    onChange: (value: string[] | string | undefined) => void
    readOnly: boolean
}



const Select = (props: SelectProps) => {
    const handleChange = (
        event: SelectChangeEvent<typeof props.value>
    ) => {
        const value = event.target.value
        props.onChange(value)
    }

    const handleDeleteSingle = () => {
        props.onChange(undefined)
    }

    const handleDeleteMultiple = (selected: string[], value: string) => {
        props.onChange(selected.filter((item) => item != value))
    }

    const isEmpty = props.value?.length === 0

    return (
        <>
            {isEmpty && (
                <InputLabel shrink={false}>
                    {props.readOnly ? 'Read-only' : 'Please select'}
                </InputLabel>
            )}

            <MuiSelect
                labelId={props.id}
                style={{ backgroundColor: 'white' }}
                multiple={Array.isArray(props.value)}
                IconComponent={props.readOnly ? () => null : undefined}
                readOnly={props.readOnly}
                value={props.value}
                onChange={handleChange}
                renderValue={(selected) => {
                    if (Array.isArray(selected)) {
                        const copy: string[] = [...selected]
                        copy.splice(4)
                        return (
                            <Box display="flex" flexWrap="wrap" gap={2}>
                                {copy.map((value) => (
                                    <Chip
                                        key={value}
                                        size="small"
                                        label={value}
                                        onDelete={
                                            props.readOnly
                                                ? undefined
                                                : () =>
                                                    handleDeleteMultiple(
                                                        selected,
                                                        value
                                                    )
                                        }
                                        deleteIcon={
                                            <ClearOutlined fontSize="small" />
                                        }
                                        onMouseDown={(e) => {
                                            e.stopPropagation()
                                        }}
                                    />
                                ))}
                                {selected.length > 4 && (
                                    <Chip
                                        size="small"
                                        label={`+ ${selected.length - 4}`}
                                    />
                                )}
                            </Box>
                        )
                    }

                    return (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {selected && Array.isArray(selected) === false && (
                                <Chip
                                    size="small"
                                    label={selected}
                                    onDelete={
                                        props.readOnly
                                            ? undefined
                                            : handleDeleteSingle
                                    }
                                    deleteIcon={
                                        <ClearOutlined fontSize="small" />
                                    }
                                    onMouseDown={(e) => {
                                        e.stopPropagation()
                                    }}
                                />
                            )}
                        </Box>
                    )
                }}
            >
                {props.options.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox
                            checked={
                                Array.isArray(props.value)
                                    ? props.value.indexOf(name) > -1
                                    : props.value === name
                            }
                        />
                        <ListItemText sx={{ fontSize: '14px' }}>
                            {name}
                        </ListItemText>
                    </MenuItem>
                ))}
            </MuiSelect>
        </>
    )
}

interface ExtendedProps extends SelectProps {
    label: string,
    labelEnd?: JSX.Element
}
// ExtendedProps without id 
type Props = Omit<ExtendedProps, 'id'>

const CustomSelect = (props: Props) => {

    const id = Math.random() + ''

    return (
        <Stack
            direction="row"
            alignItems={'baseline'}
            my={3}
            justifyContent="space-between"
        >
            {props.labelEnd && (
                <Stack direction='row' spacing={2}>
                    <InputLabel id={id}>{props.label}</InputLabel>
                    <Divider orientation="vertical" flexItem />
                    {props.labelEnd}
                </Stack>
            )}
            {!props.labelEnd && (
                <InputLabel id={id}>{props.label}</InputLabel>
            )}
            <FormControl size="small" sx={{ width: 800 }}>
                <Select
                    id={id}
                    options={props.options}
                    value={props.value}
                    readOnly={props.readOnly}
                    onChange={props.onChange}
                />
            </FormControl>
        </Stack>
    )
}

export default CustomSelect
