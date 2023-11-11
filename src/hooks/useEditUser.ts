import { KEY_USER } from "../store/user";

const useEditUser = (modifiedValues: any) => {
  const currentValues = JSON.parse(localStorage.getItem(KEY_USER) || "null");
  const editedValues = { ...currentValues, ...modifiedValues };
  localStorage.setItem(KEY_USER, JSON.stringify(editedValues));
};

export default useEditUser;
