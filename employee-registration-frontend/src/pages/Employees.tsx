import { useEffect, useState } from "react";
import Table from "../components/Table";
import { Employee } from "../types/employeeTypes";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import "../styles/pages.css";
import { useNavigate } from "react-router-dom";
import { EmployeeSagaTypes } from "../store/employee/employeeSaga";
import {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  setEmployeeById,
  setIsDeleteEmployeeSuccess,
} from "../store/employee/employeeSlice";
const Employees = () => {
  const [paginate, setPaginate] = useState({ pageSize: 5, page: 0 });
  const dispatch = useAppDispatch();
  const { isLoading, responseGetEmployees, isDeleteEmployeeSuccess } =
    useAppSelector((state) => state.employee);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: EmployeeSagaTypes.GET_ALL,
      payload: {
        page: paginate.page,
        pageSize: paginate.pageSize,
        direction: "DESC",
      },
    });
    dispatch(setIsDeleteEmployeeSuccess(false));
  }, [paginate.page, paginate.pageSize, isDeleteEmployeeSuccess]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "isActive", headerName: "Active", width: 70 },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return <p>{params.row.department?.name || "N/A"}</p>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 300,
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
          <Button
            startIcon={<Delete />}
            color="primary"
            onClick={() => handleDetail(params)}
          >
            Detail
          </Button>
        </div>
      ),
    },
  ];

  const handleUpdate = (params: GridRenderCellParams) => {
    navigate(`/employee/${params.row.id}?pageMode=UPDATE`);
  };
  const handleDelete = (params: GridRenderCellParams) => {
    const id = params.row.id;
    dispatch({ type: EmployeeSagaTypes.DELETE, payload: id });
  };

  const handleDetail = (params: GridRenderCellParams) => {
    navigate(`/employee/${params.row.id}?pageMode=DETAIL`);
  };

  const onPaginationModelChange = (paginationModel: GridPaginationModel) => {
    setPaginate(paginationModel);
  };

  return (
    <div className="pages-container">
      <h2>Employees</h2>
      <div className="pages-btn-container">
        <div className="pages-btn-left">
          <button
            onClick={() => {
              dispatch(setEmployeeById(null));
              navigate("/employee?pageMode=CREATE");
            }}
            style={{ cursor: "pointer" }}
          >
            Create new
          </button>
        </div>
      </div>
      <Table<Employee>
        rows={responseGetEmployees?.content || []}
        columns={columns}
        isLoading={isLoading}
        pageSizeOptions={[5]}
        paginationMode="server"
        rowCount={responseGetEmployees?.totalElements}
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

export default Employees;
