
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  updateTask,
  setModalOpen,
} from "../../redux/slices/taskSlice";
import { taskValidation } from "../../utils/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomButton from "../../shared/custombutton";
import { api } from "../../api/client";

import { useState } from "react";
import CustomForm from "../../shared/form"; // <-- import your CustomForm
import FormGroup from "../../shared/FormGroup";

const TaskForm = ({ initialValues, onSubmit: onSubmitProp }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(taskValidation),
    defaultValues: initialValues,
  });

  const onSubmit = async (data) => {
    try {
      const taskData = {
        ...data,
        userId: currentUser.id,
      };
      console.log("Task data being submitted:", taskData);

      const response = initialValues.id
        ? await api.TASKS.update({ data: taskData, taskId: initialValues.id })
        : await api.TASKS.create({ data: taskData });
      console.log("Task response:", response.data);
      console.log('Response data:', initialValues.id ? 'Updating task' : 'Creating task');
      if (response.data) {
        if (initialValues.id) {
          dispatch(updateTask(response.data));
        } else {
          dispatch(addTask(response.data));
        }
        dispatch(setModalOpen(false));
        onSubmitProp();
      }
    } catch (error) {
      console.error("Error handling task:", error);
    }
  };

  const onClose = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <div className="bg-white-pure  rounded-lg ">
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Title"
          name="title"
          register={register}
          error={errors.title}
      
          placeholder="Enter task title"
        />
    <FormGroup
          label="Description"
          name="description"
          register={register}
          
          error={errors.description}
          placeholder="Enter task description"
          className="w-full mx-9 my-9 rounded-md border font-roboto"
        />
   

        <FormGroup
          label="Due Date"
          name="dueDate"
          type="date"
          error={errors.dueDate}
          register={register}
               className={`w-full px-4 py-2 rounded-md border font-roboto
              ${
                errors.dueDate
                  ? "border-status-error-main"
                  : "border-neutral-main"
              }
              focus:outline-none focus:border-primarymain`}
          />
  
        <div className="space-y-2">
          <label className="block font-roboto text-input-label font-medium text-white-pure">
            Status
          </label>
          <select
            {...register("status")}
            className={`w-full px-4 py-2 rounded-md border font-roboto
              ${
                errors.status
                  ? "border-status-error-main"
                  : "border-neutral-main"
              }
              focus:outline-none focus:border-primarymain`}
          >
            <option value="">Select status</option>
            <option value="In Progress">In Progress</option>
      
          </select>
          {errors.status && (
            <p className="text-sm text-status-error-main font-roboto">
              {errors.status.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <CustomButton
            label="Cancel"
            type="button"
            onClick={onClose}
            className="bg-neutral-main hover:bg-neutral-dark"
          />
          <CustomButton
            label={initialValues.id ? "Update Task" : "Create Task"}
            type="submit"
            disabled={isSubmitting}
            className="bg-primarymain hover:bg-primarydark"
          />
        </div>
      </CustomForm>
    </div>
  );
};

export default TaskForm;
