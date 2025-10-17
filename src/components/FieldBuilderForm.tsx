import { useState, useEffect } from "react";
import { ChoicesList, FormContainer, FormRow, FormTitle } from "@/components";
import { storageGet, storageSet, storageClean } from "@/utils";
import { FormBuilderFormProps } from "@/types";

const FieldBuilderForm = ({ title }: FormBuilderFormProps) => {
  const storageData = storageGet("fieldBuilderFormData");

  const [label, setLabel] = useState(storageData?.label || "");
  const [required, setRequired] = useState(storageData?.required || false);
  const [defaultValue, setDefaultValue] = useState(storageData?.default || "");
  const [choices, setChoices] = useState<string[]>(storageData?.choices || []);
  const [order, setOrder] = useState(
    storageData?.alpha ? "alphabetical" : "custom"
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    storageSet("fieldBuilderFormData", {
      label,
      required,
      default: defaultValue,
      choices,
      alpha: "alphabetical" === order,
    });
  }, [label, required, defaultValue, choices, order]);

  const handleSubmit = (formData: {
    label: string;
    required: boolean;
    defaultValue: string;
    choices: string[];
    order: string;
  }) => {
    const errors: string[] = [];

    // Validates if label is not empty
    if (!formData.label.trim()) {
      errors.push("Label is required.");
    }

    const choicesToLowerCase = formData.choices.map((choice) =>
      choice.trim().toLowerCase()
    );
    const choiceSet = new Set(choicesToLowerCase);

    if (choiceSet.size < formData.choices.length) {
      errors.push("Choices must be unique.");
    }

    if (
      formData.choices.length === 0 ||
      formData.choices.some((choice) => !choice.trim())
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

    const newChoices = [...formData.choices];

    if (
      formData.defaultValue &&
      !formData.choices.includes(formData.defaultValue)
    ) {
      newChoices.push(formData.defaultValue);
      setChoices(newChoices);
    }

    const submitData = {
      label: formData.label,
      required: formData.required,
      default: formData.defaultValue,
      choices: newChoices,
      displayAlpha: formData.order === "alphabetical",
    };

    saveField(submitData);
  };

  const handleReset = () => {
    setLabel("");
    setRequired(false);
    setDefaultValue("");
    setChoices([]);
    setOrder("custom");
    setValidationErrors([]);

    storageClean("fieldBuilderFormData");
  };

  const saveField = async (data: {
    label: string;
    required: boolean;
    default: string;
    choices: string[];
    displayAlpha: boolean;
  }) => {
    setLoading(true);

    try {
      console.log("Post data:", data);

      const response = await fetch(
        "https://68f11c040b966ad500356939.mockapi.io/field",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.text();
      console.log("MockAPI Response:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4 border border-gray-300 overflow-hidden">
      <FormTitle title={title} />
      <FormContainer
        formData={{ label, required, defaultValue, choices, order }}
        validationErrors={validationErrors}
        onSubmit={handleSubmit}
        onReset={handleReset}
        loading={loading}
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
            <label className="select-none !font-normal">
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
          </select>
        </FormRow>
      </FormContainer>
    </div>
  );
};

export default FieldBuilderForm;
