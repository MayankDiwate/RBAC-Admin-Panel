import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import PermissionList from "./components/PermissionList";
import RoleList from "./components/RoleList";
import Sidebar from "./components/Sidebar";
import UserList from "./components/UserList";
import { RBACProvider } from "./context/RBACContext";

function App() {
  return (
    <RBACProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/roles" element={<RoleList />} />
                <Route path="/permissions" element={<PermissionList />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </RBACProvider>
  );
}

export default App;
