import { Handle, Position } from 'reactflow'
import { Side } from '../../types'

export default (props: { id: string; visiblePorts: string[] }) => {
    const id = props.id
    const visiblePorts = props.visiblePorts
    const handle_left = id + '_' + Side.Left
    const handle_top = id + '_' + Side.Top
    const handle_right = id + '_' + Side.Right
    const handle_bottom = id + '_' + Side.Bottom

    const topHandle = visiblePorts.indexOf(handle_top) != -1
    const leftHandle = visiblePorts.indexOf(handle_left) != -1
    const rightHandle = visiblePorts.indexOf(handle_right) != -1
    const bottomHandle = visiblePorts.indexOf(handle_bottom) != -1

    return (
        <>
            <Handle
                style={{ visibility: topHandle ? 'visible' : 'hidden' }}
                id={handle_top}
                type="source"
                position={Position.Top}
            />
            <Handle
                style={{ visibility: leftHandle ? 'visible' : 'hidden' }}
                id={handle_left}
                type="source"
                position={Position.Left}
            />
            <Handle
                style={{ visibility: rightHandle ? 'visible' : 'hidden' }}
                id={handle_right}
                type="source"
                position={Position.Right}
            />
            <Handle
                style={{ visibility: bottomHandle ? 'visible' : 'hidden' }}
                id={handle_bottom}
                type="source"
                position={Position.Bottom}
            />
        </>
    )
}
