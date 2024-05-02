import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { InputLabel } from '@mui/material'

interface Props {
    label: string
    readOnly: boolean
    value: string
    onChange: (value: string) => void
}

const CustomTextField = (props: Props) => {
    const id = Math.random() + ''
    return (
        <Stack
            direction="row"
            alignItems={'center'}
            my={3}
            justifyContent={'space-between'}
        >
            <InputLabel htmlFor={id}>{props.label}</InputLabel>
            <FormControl>
                <TextField
                    id={id}
                    disabled={props.readOnly}
                    style={{ width: 800 }}
                    size="small"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                />
            </FormControl>
        </Stack>
    )
}

export default CustomTextField
