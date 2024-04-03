import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sendmoney from "./pages/Sendmoney";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="send" element={<Sendmoney />} />
          <Route path="paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
