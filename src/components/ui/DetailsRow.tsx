import { Stack, Typography } from "@mui/material";

export const DetailsRow = (props: { title: string; description: string }) => {
    return (
        <Stack direction="row" my={2} py={2} >
            <Typography
                style={{ color: 'black' }}
                minWidth={170}
                fontWeight={600}
                variant='h5'
            >
                {props.title}
            </Typography>
            <Typography>{props.description}</Typography>
        </Stack>
    )
}

export default DetailsRow