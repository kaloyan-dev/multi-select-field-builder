import { FormRow, Icon } from "@/components";
import { FormContainerProps } from "@/types";

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  formData,
  validationErrors,
  onSubmit,
  onReset,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    if (!confirm("Are you sure you want to reset the form?")) {
      return;
    }
    onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}

      <FormRow>
        <div className="flex space-x-4 justify-start items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white flex items-center justify-start"
          >
            <Icon type="save" className="inline size-4 mr-2" />
            Save Changes
          </button>
          <span>Or</span>
          <button
            type="button"
            className="py-2 text-red-500"
            onClick={handleReset}
          >
            Cancel
          </button>
        </div>
      </FormRow>

      {validationErrors.length > 0 && (
        <FormRow className="text-red-500">
          <ul className="list-inside">
            {validationErrors.map((error, index) => (
              <li key={index} className="flex items-center justify-start">
                <Icon type="error" className="size-5 mr-2" />
                {error}
              </li>
            ))}
          </ul>
        </FormRow>
      )}
    </form>
  );
};

export default FormContainer;
