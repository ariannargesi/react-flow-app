import CustomHandles from './CustomHandles'
import { IconButton, Tooltip } from '@mui/material'
import Typography from '@mui/material/Typography'
import { GroupData, NodeProps, Node, Direction } from '../../types'
import { Rotate90DegreesCcwOutlined } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { handleNodeChange } from '../../redux/reducer'
import { createLayout } from '../../helpers/elk'
import { getNodes } from '../../helpers'

export default (props: NodeProps<GroupData>) => {
    const dispatch = useDispatch()
    const label = props.data.label
    const id = props.id
    const visiblePorts = props.data.visiblePorts

    const rotateGroup = () => {
        localStorage.setItem('alg', 'box')
        const nodes: Node<any>[] = getNodes()
        nodes.map((node) => {
            if (node.id === id) {
                let group: Node<GroupData> = node
                if (group.data.direction === Direction.Vertical)
                    group.data.direction = Direction.Horizontal
                else group.data.direction = Direction.Vertical
            }
        })

        createLayout(nodes, (nodes) => {
            dispatch(handleNodeChange(nodes))
        })
    }

    const con = localStorage.getItem('alg') === 'box'

    return (
        <>
            {con && (
                <IconButton
                    onClick={rotateGroup}
                    style={{ position: 'absolute', right: -36, top: -16 }}
                >
                    <Rotate90DegreesCcwOutlined className="afdsf" />
                </IconButton>
            )}
            <Tooltip title={label}>
                <Typography component='span' width={96} mx={'auto'} noWrap variant="h5">
                    {label}
                </Typography>
            </Tooltip>
            <CustomHandles id={id} visiblePorts={visiblePorts} />
        </>
    )
}
