import { useRef, useEffect, useState } from "react";
import ChoiceRow from "@/components/ChoiceRow";
import Icon from "@/components/Icon";

type ChoicesListProps = {
  choices: string[];
  setChoices: (choices: string[]) => void;
};

const ChoicesList: React.FC<ChoicesListProps> = ({ choices, setChoices }) => {
  const lastChoicesLength = useRef(choices.length);
  const [lastAddedIndex, setLastAddedIndex] = useState<number | null>(null);

  const moveChoice = (from: number, to: number) => {
    const updated = [...choices];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setChoices(updated);
  };

  useEffect(() => {
    if (choices.length > lastChoicesLength.current) {
      // A new choice was added
      setLastAddedIndex(choices.length - 1);
      lastChoicesLength.current = choices.length;
    } else if (choices.length < lastChoicesLength.current) {
      // A choice was deleted
      lastChoicesLength.current = choices.length;
      setLastAddedIndex(null);
    }
  }, [choices.length]);

  return (
    <div className="space-y-2 w-full">
      {choices.map((choice, index) => (
        <ChoiceRow
          key={index}
          index={index}
          choice={choice}
          moveChoice={moveChoice}
          shouldFocus={index === lastAddedIndex}
          onChange={(value) => {
            const updated = [...choices];
            updated[index] = value;
            setChoices(updated);
            // Clear the focus after the user starts typing
            if (index === lastAddedIndex) {
              setLastAddedIndex(null);
            }
          }}
          onDelete={() => {
            const updated = choices.filter((_, i) => i !== index);
            setChoices(updated);
          }}
        />
      ))}

      <button
        type="button"
        onClick={() => setChoices([...choices, ""])}
        className="px-4 py-2 bg-gray-500 text-white flex items-center justify-start"
      >
        <Icon type="plus" className="size-6 mr-2" />
        Add Choice
      </button>
    </div>
  );
};

export default ChoicesList;
