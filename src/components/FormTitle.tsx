import { FormTitleProps } from "@/types";

const FormTitle = ({ title }: FormTitleProps) => {
  return (
    <h2 className="text-xl border-b border-gray-300 bg-gray-50 text-gray-600 px-6 p-3">
      {title}
    </h2>
  );
};

export default FormTitle;
