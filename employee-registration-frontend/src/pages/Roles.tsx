import { useEffect, useState } from "react";
import "../styles/pages.css";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RoleSagaTypes } from "../store/role/roleSaga";
import {
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { Role } from "../types/roleTypes";
import Table from "../components/Table";

const Roles = () => {
  const [paginate, setPaginate] = useState({ pageSize: 5, page: 0 });
  const dispatch = useAppDispatch();
  const { isLoading, responseGetRoles } = useAppSelector((state) => state.role);

  useEffect(() => {
    dispatch({
      type: RoleSagaTypes.GET_ALL,
      payload: {
        page: paginate.page,
        pageSize: paginate.pageSize,
        direction: "DESC",
      },
    });
  }, [paginate.page, paginate.pageSize]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Role Name", width: 350 },
  ];
  const onPaginationModelChange = (paginationModel: GridPaginationModel) => {
    setPaginate(paginationModel);
  };

  return (
    <div className="pages-container">
      <h2>Roles</h2>
      <Table<Role>
        rows={responseGetRoles?.content || []}
        columns={columns}
        isLoading={isLoading}
        pageSizeOptions={[5]}
        paginationMode="server"
        rowCount={responseGetRoles?.totalElements}
        onPaginationModelChange={onPaginationModelChange}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
      />
    </div>
  );
};

export default Roles;
