import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
// mui
import {
    HighlightAltOutlined,
    ViewSidebarOutlined,
    BalanceOutlined,
} from '@mui/icons-material'
import { Box, IconButton, Tooltip, Divider, useTheme } from '@mui/material'

// helper functions
import {
    assignPositionInGroup,
    createNewGroup,
    findNodeByID,
    getNewGroupRect,
    getNodes,
    isGroupingAllowed,
} from '../helpers'
// reudx
import store from '../redux/store'
import {
    toggleSidebar,
    handleNodeChange,
} from '../redux/reducer'

import { RootState, Node, StorageKey, AligningAlgorithm } from '../types'
import { createLayout } from '../helpers/elk'

const ActionBar = () => {

    const bgColor = useTheme().palette.grey[100]
    const dispatch = useDispatch()

    const allowGrouping = useSelector((state: RootState) =>
        isGroupingAllowed(state.selectedNodes)
    )
    const allowAlinging = useSelector(
        (state: RootState) => state.diagram.nodes.length > 0
    )

    const sidebarIsVisible = useSelector((state: RootState) => {
        return state.sidebarIsVisible
    })
    
    const handleGroupNodes = () => {
        localStorage.setItem(StorageKey.Algorithm, AligningAlgorithm.Fixed)
        const selectedNodes: Node[] = store
            .getState()
            .diagram.nodes.filter((node: Node) => node.selected)
        const nodes: Node[] = getNodes()
        const parentNode = selectedNodes[0].parentNode
        const newGroupID = uuidv4()
        const newGroupRect = getNewGroupRect(selectedNodes)

        const newGroup = createNewGroup({
            height: newGroupRect.height,
            width: newGroupRect.width,
            id: newGroupID,
            parent: parentNode,
            x: newGroupRect.x,
            y: newGroupRect.y,
        })

        newGroup.data.visiblePorts = []

        if (parentNode)
            newGroup.position = assignPositionInGroup(
                newGroup,
                findNodeByID(nodes, parentNode)!
            )

        nodes.filter(node => node.selected === true ).forEach((node) => {
            if (node.parentNode === parentNode) {
                node.parentNode = newGroupID
                node.position = assignPositionInGroup(node, newGroup)
            }
            node.selected = false
        })
        nodes.push(newGroup)
        createLayout(nodes, (data) => {
            dispatch(handleNodeChange(data))
        })
    }

    const handleAlinging = () => {
        localStorage.setItem(StorageKey.Algorithm, AligningAlgorithm.Box)
        const nodes = getNodes()
        createLayout(nodes, (data) => {
            dispatch(handleNodeChange(data))
        })
    }

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            bgcolor={bgColor}
        >
            <Box display={'flex'}>
                <Tooltip
                    title={sidebarIsVisible ? 'Show sidebar' : 'Hide sidebar'}
                >
                    <IconButton
                        children={
                            <ViewSidebarOutlined
                                color={sidebarIsVisible ? 'primary' : undefined}
                                style={{ transform: 'rotate(180deg)' }}
                            />
                        }
                        onClick={() => dispatch(toggleSidebar())}
                    />
                </Tooltip>
                <Divider orientation="vertical" flexItem />
                <Tooltip title={'Group selected nodes'}>
                    <IconButton
                        disabled={!allowGrouping}
                        children={<HighlightAltOutlined />}
                        onClick={handleGroupNodes}
                    />
                </Tooltip>
                <Tooltip title={'Align nodes'}>
                    <IconButton
                        disabled={!allowAlinging}
                        children={<BalanceOutlined />}
                        onClick={handleAlinging}
                    />
                </Tooltip>
            </Box>
        </Box>
    )
}

export default ActionBar
