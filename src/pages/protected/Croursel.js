import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ViewCategoriesPage from '../../features/leads copy 5'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Crousel" }))
      }, [])


return(
        <ViewCategoriesPage/>
    )
}

export default InternalPage