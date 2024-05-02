import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import { ClearOutlined } from '@mui/icons-material';

interface Props {
  value: string,
  onChange: (value: string) => void 
}

const Input = (props: Props) => {
  return (
    <Stack
      direction={'row'}
      height={46}
      color='#D1D1D1'
      ml={1}
    >
      <InputBase
        placeholder="Search Shapes"
        value={props.value}
        onChange={event => {
          const value = event.target.value 
          if(value.length < 24)
              props.onChange(event.target.value)
        }}
      />
      <IconButton color='inherit' type="button" aria-label="search">
        {props.value ? <ClearOutlined color='inherit' onClick={() => props.onChange('')} /> : <SearchIcon color='inherit' /> }   
      </IconButton>
    </Stack>
  );
}

export default Input 