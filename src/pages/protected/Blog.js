
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import { useEffect } from 'react'
import BlogList from '../../features/leads copy 8'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Order" }))
      }, [])


    return(
        <BlogList />
    )
}

export default InternalPage