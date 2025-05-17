
import { Navigate } from "react-router-dom";

const Index = () => {
  // Simply redirect to the Home component
  return <Navigate to="/" replace />;
};

export default Index;
