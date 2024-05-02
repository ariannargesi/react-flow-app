import {  useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Divider, Drawer, CircularProgress } from '@mui/material'
import { RootState } from '../../../types'

// import axios from 'axios'
import Search from './Search'
import Components from './Components'

import {components} from '../../../../mockdata'

const SideBar = () => {
    const [componentsList] = useState<null | any[]>(components)
    const [searchQuery, setSearchQuery] = useState('')

    const visible = useSelector((state: RootState) => {
        return state.sidebarIsVisible
    })
    
    return (
        <Drawer
            anchor="left"
            open={visible}
            variant="persistent"
            PaperProps={{
                style: {
                    height: 'calc(100% - 38px)',
                    marginTop: 38,
                },
            }}
        >
            <Box width={212} height='100%'>
                {componentsList === null && (
                    <Box
                        display={'flex'}
                        alignItems="center"
                        justifyContent={'center'}
                        height={'100%'}
                    >
                        <CircularProgress />
                    </Box>
                )}
                {Array.isArray(componentsList) && (
                    <>
                        <Search value={searchQuery} onChange={setSearchQuery} />
                        <Divider />
                      
                        <Components
                            searchQuery={searchQuery}
                            list={
                                     componentsList
                            }                                    
                        />
                    </>
                )}
            </Box>
        </Drawer>
    )
}

export default SideBar
