import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import Icon from "@/components/Icon";
import { ChoiceRowProps } from "@/types";

const ItemType = "CHOICE";

const ChoiceRow: React.FC<ChoiceRowProps> = ({
  choice,
  index,
  moveChoice,
  onChange,
  onDelete,
  shouldFocus = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current || item.index === index) return;
      moveChoice(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className={`flex items-center space-x-2 w-full mb-4 ${
        isDragging ? "opacity-50 bg-gray-100" : ""
      }`}
    >
      <span
        ref={(node: HTMLSpanElement | null) => {
          if (node) drag(node);
        }}
        className="cursor-move text-gray-500 select-none"
      >
        ☰
      </span>
      <input
        ref={inputRef}
        type="text"
        value={choice}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1"
      />
      <button type="button" onClick={onDelete} className="text-red-500">
        <Icon type="trash" className="size-5 ml-2" />
      </button>
    </div>
  );
};

export default ChoiceRow;
