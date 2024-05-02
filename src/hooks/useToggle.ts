import { useState } from 'react'
const useToggle = (value: boolean) => {
    const [state, setState] = useState<boolean>(value)

    const toggler = () => {
        setState((prev) => !prev)
    }

    return [state, toggler] as const
}

export default useToggle
