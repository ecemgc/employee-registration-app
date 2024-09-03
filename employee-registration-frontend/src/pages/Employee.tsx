import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Checkbox, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { EmployeeSagaTypes } from "../store/employee/employeeSaga";
import { DepartmentSagaTypes } from "../store/department/departmentSaga";
import { RoleSagaTypes } from "../store/role/roleSaga";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  setEmployeeById,
  setIsCreateEmployeeSuccess,
  setIsUpdateEmployeeSuccess,
} from "../store/employee/employeeSlice";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PageMode } from "../constants";
import { Employee } from "../types/employeeTypes";

type InputProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean;
  departmentId: number;
  roles: number[];
};

const EmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { responseEmployeeById, isCreateEmployeeSuccess, isUpdateEmployeeSuccess } = useAppSelector(
    (state) => state.employee
  );
  const navigate = useNavigate();
  const departments = useAppSelector(
    (state) => state.department.allDepartments
  );

  const roles = useAppSelector((state) => state.role.allRoles);
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [pageMode, setPageMode] = useState(PageMode.CREATE);
  const [isActive, setIsActive] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InputProps>();

  useEffect(() => {
    if (pageMode === PageMode.CREATE) {
      dispatch(setEmployeeById(null));
    }
  }, [pageMode]);

  useEffect(() => {
    const pageModeParam = searchParams.get("pageMode") as PageMode;
    if (!pageModeParam) {
      dispatch(setEmployeeById(null));
      navigate("/employees");
    }
    if (!Object.values(PageMode).includes(pageModeParam)) {
      dispatch(setEmployeeById(null));
      navigate("/employees");
    }
    setPageMode(pageModeParam);
    fillDeparmentsAndRoles();
  }, [searchParams]);

  useEffect(() => {
    dispatch(setEmployeeById(null));
    if (!id) {
      return;
    }
    dispatch({
      type: EmployeeSagaTypes.GET_BY_ID,
      payload: Number(id),
    });
  }, [id, dispatch]);

  useEffect(() => {
    if (isCreateEmployeeSuccess) {
      navigate("/employees");
      dispatch(setIsCreateEmployeeSuccess(null));
    }
  }, [isCreateEmployeeSuccess]);

  useEffect(() => {
    if (isUpdateEmployeeSuccess) {
      navigate("/employees");
      dispatch(setIsUpdateEmployeeSuccess(null));
    }
  }, [isUpdateEmployeeSuccess]);


  useEffect(() => {
    if (!responseEmployeeById) {
      return;
    }
    fillEmployeeInformation(responseEmployeeById);
  }, [responseEmployeeById]);

  const fillEmployeeInformation = (employee: Employee) => {
    setStartDate(employee.startDate ? new Date(employee.startDate) : null);
    setEndDate(employee.endDate ? new Date(employee.endDate) : null);
    setIsActive(employee.isActive);
    reset({
      ...employee,
      departmentId: employee.department?.id,
      roles: employee.roles.map((roleObject) => roleObject.id),
    });
  };

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    const formattedRoles = data.roles.map((roleId) => {
      return { id: roleId };
    });
    const payload = {
      ...data,
      roles: formattedRoles,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      isActive,
      departmentId: data.departmentId,
    };

    if (pageMode === PageMode.CREATE) {
      dispatch({
        type: EmployeeSagaTypes.SAVE,
        payload: payload,
      });
    } else if (pageMode === PageMode.UPDATE) {
      dispatch({
        type: EmployeeSagaTypes.UPDATE,
        payload: { id: id, data: payload },
      });
    }
  };

  const fillDeparmentsAndRoles = () => {
    dispatch({
      type: DepartmentSagaTypes.GET_ALL_WITHOUT_PAGINATION,
    });
    dispatch({
      type: RoleSagaTypes.GET_ALL_ROLES_WITHOUT_PAGINATION,
    });
  };

  if (id && !responseEmployeeById) {
    return <p>Loading...</p>;
  }

  return (
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      {/* <Grid item xs={12}>
        {Object.values(errors).map((err) => (
          <p style={{ color: "red" }}>{err.message}</p>
        ))}
      </Grid> */}

      <Grid item xs={4}>
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "First Name is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Last Name is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}></Grid>

      <Grid item xs={4}>
        <Controller
          name="phone"
          control={control}
          rules={{ required: "Phone is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <ReactDatePicker
          placeholderText="Start Date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          disabled={PageMode.DETAIL === pageMode}
          wrapperClassName="full-width-datepicker-wrapper"
        />
      </Grid>
      <Grid item xs={4} style={{ width: "100%" }}>
        <ReactDatePicker
          placeholderText="End Date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          disabled={PageMode.DETAIL === pageMode}
          wrapperClassName="full-width-datepicker-wrapper"
        />
      </Grid>
      <Grid item xs={4}>
        <span>Active</span>
        <Controller
          name="isActive"
          control={control}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <Checkbox
              {...field}
              onChange={(e) => setIsActive(e.target.checked)}
              checked={isActive}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name="departmentId"
          control={control}
          rules={{ required: "Department is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              displayEmpty
              value={field.value ?? ""}
              error={!!errors.departmentId}
            >
              <MenuItem value="" disabled>
                Department
              </MenuItem>
              {departments?.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Grid>

      <Grid item xs={4}>
        <Controller
          name="roles"
          control={control}
          rules={{ required: "Role is required" }}
          disabled={PageMode.DETAIL === pageMode}
          render={({ field }) => (
            <Select
              {...field}
              multiple
              fullWidth
              displayEmpty
              value={field.value ?? []}
              error={!!errors.roles}
            >
              <MenuItem value="" disabled>
                Role
              </MenuItem>
              {roles?.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </Grid>

      {PageMode.DETAIL !== pageMode && (
        <button type="submit">{pageMode} EMPLOYEE</button>
      )}

      <button onClick={() => navigate("/employees")}>Cancel</button>
    </Grid>
  );
};

export default EmployeePage;
