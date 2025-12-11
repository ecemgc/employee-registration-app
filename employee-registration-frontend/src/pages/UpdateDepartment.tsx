import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { DepartmentSagaTypes } from "../store/department/departmentSaga";

type InputProps = {
  name: string;
  description: string;
};

const UpdateDepartment = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {isUpdateDepartmentSuccess, selectedDepartment} = useAppSelector((state) => state.department);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm<InputProps>({
        defaultValues: {
            name: selectedDepartment?.name || "",
            description: selectedDepartment?.description || "",
        }
      });

      useEffect(() => {
        if (selectedDepartment) {
            setValue("name", selectedDepartment.name);
            setValue("description", selectedDepartment.description);
          }
      }, [selectedDepartment, setValue]);

      useEffect(() => {
        if (isUpdateDepartmentSuccess) {
          navigate("/departments");
        }
      }, [isUpdateDepartmentSuccess]);

      const onSubmit: SubmitHandler<InputProps> = (data:any) => {
        dispatch({
            type: DepartmentSagaTypes.UPDATE,
            payload: {id: selectedDepartment?.id, data }
        })
      }
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


      <button type="submit">Update Department</button>

    </Grid>
  )
}

export default UpdateDepartment