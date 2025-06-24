import Routing from "./routes";
import { DrawerProvider } from "./context/DrawerContext/index";
const App = () => {
  return (
    <>
      <DrawerProvider>
      <div className="min-h-screen">
        <Routing />
        </div>
      </DrawerProvider>
    </>
  );
};

export default App;
