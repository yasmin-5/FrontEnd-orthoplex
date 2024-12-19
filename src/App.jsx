import AuthenticatedRouterProvider from "./authProviderRouter/AuthenticatedRouterProvider";
import router from "./routes";
function App() {
  return (
    <AuthenticatedRouterProvider router={router}></AuthenticatedRouterProvider>
  );
}

export default App;
