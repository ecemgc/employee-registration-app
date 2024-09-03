import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { DepartmentSagaTypes } from "../store/department/departmentSaga";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setIsCreateDepartmentSuccess } from "../store/department/departmentSlice";
import { Grid } from "@mui/material";

type InputProps = {
  name: string;
  description: string;
};

export default function CreateNewDepartment() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isCreateDepartmentLoading, isCreateDepartmentSuccess } =
    useAppSelector((state) => state.department);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();

  useEffect(() => {
    if (isCreateDepartmentSuccess) {
      navigate("/departments");
      dispatch(setIsCreateDepartmentSuccess(null));
    }
  }, [isCreateDepartmentSuccess]);

  const onSubmit: SubmitHandler<InputProps> = (data) => {
    dispatch({ type: DepartmentSagaTypes.SAVE, payload: { ...data } });
  };

  return (
    <Grid
      container
      component="form"
      spacing={2}
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >

      <Grid item xs={6}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Department name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Department Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Department Description"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </Grid>


      <button type="submit">Create Department</button>

    </Grid>
  );
}
