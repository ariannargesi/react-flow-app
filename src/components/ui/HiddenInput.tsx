import { ChangeEvent, RefObject } from 'react'

interface Props {
    inputRef: RefObject<HTMLInputElement>
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default (props: Props) => {
    return (
        <input
            type="file"
            accept=".yaml"
            ref={props.inputRef}
            onChange={props.onChange}
            style={{ display: 'none' }}
        />
    )
}
