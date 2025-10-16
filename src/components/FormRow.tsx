import { toCamelCase } from "@/utils";
import { FormRowProps } from "@/types";

const FormRow = ({
  children,
  label,
  forAttr = true,
  className = "",
  hint,
}: FormRowProps) => {
  const labelToCamelCase = toCamelCase(label);

  const Label = () => {
    if (!labelToCamelCase) {
      return null;
    }

    const LabelOnly = (
      <label {...(forAttr ? { htmlFor: labelToCamelCase } : {})}>{label}</label>
    );

    return hint ? (
      <div className="flex-shrink-0 md:w-[200px] md:pr-5">
        {LabelOnly}
        <p className="text-xs text-gray-500 pt-2 pb-4 md:pb-0">{hint}</p>
      </div>
    ) : (
      LabelOnly
    );
  };

  return (
    <div className={`form-row ${className}`}>
      {Label()}
      {children}
    </div>
  );
};

export default FormRow;
