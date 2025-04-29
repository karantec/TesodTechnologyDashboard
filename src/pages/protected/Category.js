import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

import ViewTeam from "../../features/leads copy 5/index copy";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Teams" }));
  }, []);

  return <ViewTeam />;
}

export default InternalPage;
