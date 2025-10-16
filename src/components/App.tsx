import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FieldBuilderForm } from "@/components";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FieldBuilderForm title="Field Builder" />
    </DndProvider>
  );
};

export default App;
