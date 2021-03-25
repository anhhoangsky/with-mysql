import { useMemo } from "react";
import useDataManager from "../../../hooks/useListView";

function useSelect({
  isUserAllowedToEditField,
  isUserAllowedToReadField,
  name,
}) {
  // console.log(useDataManager());
  const {
    isCreatingEntry,
    createActionAllowedFields,
    readActionAllowedFields,
    updateActionAllowedFields,
  } = useDataManager();

  const isFieldAllowed = useMemo(() => {
    return true;
    if (isUserAllowedToEditField === true) {
      return true;
    }

    const allowedFields = isCreatingEntry ? ["username"] : ["username"];
    // ? createActionAllowedFields
    // : updateActionAllowedFields;

    return allowedFields.includes(name);
  }, [
    isCreatingEntry,
    createActionAllowedFields,
    name,
    isUserAllowedToEditField,
    updateActionAllowedFields,
  ]);

  const isFieldReadable = useMemo(() => {
    return true;
    if (isUserAllowedToReadField) {
      return true;
    }

    const allowedFields = isCreatingEntry ? [] : ["username"]; //readActionAllowedFields;

    return allowedFields.includes(name);
  }, [
    isCreatingEntry,
    isUserAllowedToReadField,
    name,
    readActionAllowedFields,
  ]);

  return {
    isCreatingEntry,
    isFieldAllowed,
    isFieldReadable,
  };
}

export default useSelect;
