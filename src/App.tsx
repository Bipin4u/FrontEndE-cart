
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./component/pages/layout/Register";
import Login from "./component/pages/layout/Login";
import Header from "./component/common/layout/Header";
import PrivateRoute from "./component/utils/PrivateRoute";
import AuthProvider from "./component/context/AuthContext";
import HomeComponent from "./component/pages/layout/HomeComponent";
import SingleItemPage from "./component/pages/layout/SingleItemPage";
import CategoryList from "./component/pages/layout/CategoryList";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import Cart from "./component/pages/layout/Cart";


const App = () => {
  return (
    <Router>
       <PrimeReactProvider>
      <AuthProvider>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/item/:id" element={<SingleItemPage />} />
          <Route path="/category-list/:category" element={<CategoryList />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
      </AuthProvider>
      </PrimeReactProvider>
    </Router>
  );
};

export default App;