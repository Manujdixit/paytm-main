import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sendmoney from "./pages/Sendmoney";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PaymentSuccess from "./pages/PaymentSuccess";
import Protected from "./components/Protected";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Protected Component={Signup} />} />
          <Route path="/signin" element={<Protected Component={Signin} />} />
          <Route path="/" element={<Protected Component={Dashboard} />} />
          <Route path="send" element={<Sendmoney />} />
          <Route path="paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
