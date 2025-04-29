import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
// import AboutList from '../../features/leads copy 6'

import Blog from "../../features/leads copy 6/index copy 3";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Blogs" }));
  }, []);

  return <Blog />;
}

export default InternalPage;
