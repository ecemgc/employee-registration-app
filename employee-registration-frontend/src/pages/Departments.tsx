import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { DepartmentSagaTypes } from "../store/department/departmentSaga";
import { Department } from "../types/departmentTypes";
import {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import "../styles/pages.css";
import Table from "../components/Table";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setIsDeleteDepartmentSuccess, setSelectedDepartment } from "../store/department/departmentSlice";

const Departments = () => {
  const [paginate, setPaginate] = useState({ pageSize: 5, page: 0 });
  const dispatch = useAppDispatch();
  const { isLoading, responseGetDepartmens, isDeleteDepartmentSuccess } =
    useAppSelector((state) => state.department);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: DepartmentSagaTypes.GET_ALL,
      payload: {
        page: paginate.page,
        pageSize: paginate.pageSize,
        direction: "DESC",
      },
    });
    dispatch(setIsDeleteDepartmentSuccess(false));
  }, [paginate.page, paginate.pageSize, isDeleteDepartmentSuccess]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Department Name", width: 200 },
    { field: "description", headerName: "Department Description", width: 350 },
    { field: "updatedAt", headerName: "Update Date", width: 200 },
    { field: "createdAt", headerName: "Create Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Button
            startIcon={<Edit />}
            color="primary"
            onClick={() => handleUpdate(params)}
          >
            Update
          </Button>
          <Button
            startIcon={<Delete />}
            color="secondary"
            onClick={() => handleDelete(params)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleUpdate = (params: GridRenderCellParams) => {
    dispatch(setSelectedDepartment(params.row));
    navigate("/update-department");
  };
  const handleDelete = (params: GridRenderCellParams) => {
    const id = params.row.id;
    dispatch({ type: DepartmentSagaTypes.DELETE, payload: id });
  };

  const onPaginationModelChange = (paginationModel: GridPaginationModel) => {
    setPaginate(paginationModel);
  };
  return (
    <div className="pages-container">
      <h2>Departments</h2>
      <div className="pages-btn-container">
        <div
          onClick={() => navigate("/new-department")}
          className="pages-btn-left"
        >
          <button style={{ cursor: "pointer" }}>Create new</button>
        </div>
      </div>
      <Table<Department>
        rows={responseGetDepartmens?.content || []}
        columns={columns}
        isLoading={isLoading}
        pageSizeOptions={[5]}
        paginationMode="server"
        rowCount={responseGetDepartmens?.totalElements}
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

export default Departments;
