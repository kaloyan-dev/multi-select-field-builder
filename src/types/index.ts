type ChoicesListProps = {
  choices: string[];
  setChoices: (choices: string[]) => void;
};

type ChoiceRowProps = {
  choice: string;
  index: number;
  moveChoice: (from: number, to: number) => void;
  onChange: (value: string) => void;
  onDelete: () => void;
  shouldFocus?: boolean;
};

type FormBuilderFormProps = {
  title: string;
};

type FormData = {
  label: string;
  required: boolean;
  defaultValue: string;
  choices: string[];
  order: string;
};

type FormContainerProps = {
  children: React.ReactNode;
  formData: FormData;
  validationErrors: string[];
  onSubmit: (formData: FormData) => void;
  onReset: () => void;
  loading: boolean;
};

type FormRowProps = {
  children: React.ReactNode;
  label?: string;
  forAttr?: boolean;
  className?: string;
  hint?: string;
};

type FormTitleProps = {
  title: string;
};

type IconProps = {
  type: string;
  className?: string;
};

export type {
  ChoicesListProps,
  ChoiceRowProps,
  IconProps,
  FormBuilderFormProps,
  FormContainerProps,
  FormRowProps,
  FormTitleProps,
};
