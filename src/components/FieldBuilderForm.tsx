import { useState } from "react";
import { ChoicesList, FormContainer, FormRow, FormTitle } from "@/components";
import { FormBuilderFormProps } from "@/types";

const FieldBuilderForm = ({ title }: FormBuilderFormProps) => {
  const [label, setLabel] = useState("");
  const [required, setRequired] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [choices, setChoices] = useState<string[]>([]);
  const [order, setOrder] = useState("custom");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = (formData: {
    label: string;
    required: boolean;
    defaultValue: string;
    choices: string[];
    order: string;
  }) => {
    const errors: string[] = [];

    if (!formData.label.trim()) {
      errors.push("Label is required.");
    }

    const choicesToLowerCase = formData.choices.map((c) =>
      c.trim().toLowerCase()
    );
    const choiceSet = new Set(choicesToLowerCase);

    if (choiceSet.size < formData.choices.length) {
      errors.push("Choices must be unique.");
    }

    if (
      formData.choices.length === 0 ||
      formData.choices.some((c) => !c.trim())
    ) {
      errors.push("Choices cannot be empty.");
    }

    if (formData.choices.length > 50) {
      errors.push("You can only have up to 50 choices.");
    }

    setValidationErrors(errors);

    if (errors.length) {
      return;
    }

    if (
      formData.defaultValue &&
      !formData.choices.includes(formData.defaultValue)
    ) {
      setChoices([...formData.choices, formData.defaultValue]);
    }
  };

  const handleReset = () => {
    setLabel("");
    setRequired(false);
    setDefaultValue("");
    setChoices([]);
    setOrder("custom");
    setValidationErrors([]);
  };

  return (
    <div className="m-8 border border-gray-300 overflow-hidden">
      <FormTitle title={title} />
      <FormContainer
        formData={{ label, required, defaultValue, choices, order }}
        validationErrors={validationErrors}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <FormRow label="Label">
          <input
            id="label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </FormRow>

        <FormRow label="Type" forAttr={false}>
          <div>
            <span
              className="border-b border-dotted cursor-help"
              title="In a real app this can be clicked to change the field type"
            >
              Multi-select
            </span>
            <label className="select-none">
              <input
                type="checkbox"
                checked={required}
                onChange={(e) => setRequired(e.target.checked)}
                className="mx-2"
              />
              A value is required
            </label>
          </div>
        </FormRow>

        <FormRow label="Default Value">
          <input
            id="defaultValue"
            type="text"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
        </FormRow>

        <FormRow
          label="Choices"
          hint={
            'Choices order will only be respected if "Display choices in custom order" is selected from the dropdown below.'
          }
          className="!items-start"
        >
          <ChoicesList choices={choices} setChoices={setChoices} />
        </FormRow>

        <FormRow>
          <label htmlFor="order">Order</label>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            id="order"
          >
            <option value="custom">Display choices in custom order</option>
            <option value="alphabetical">
              Display choices in alphabetical order
            </option>
            <option value="reverse-alphabetical">
              Display choices in reverse alphabetical order
            </option>
          </select>
        </FormRow>
      </FormContainer>
    </div>
  );
};

export default FieldBuilderForm;
