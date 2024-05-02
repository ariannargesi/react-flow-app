import { ChangeEvent } from 'react'
import { Stack, FormLabel, Typography, Switch } from '@mui/material'

interface Props {
    label: string
    checked: boolean
    readOnly: boolean
    showValueOnReadOnly?: true
    onChange: (value: string) => void
}

const CustomSwitch = (props: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        props.onChange(value)
    }

    return (
        <Stack direction="row" alignItems="center" height={38}>
            <FormLabel style={{ minWidth: 140 }}>{props.label}</FormLabel>
            {props.readOnly ? (
                <Typography component='span' fontWeight={700} variant="h5">
                    {props.checked ? 'Yes' : 'No'}
                </Typography>
            ) : (
                <Switch checked={props.checked} onChange={handleChange} />
            )}
        </Stack>
    )
}

export default CustomSwitch
