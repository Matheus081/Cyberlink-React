import { useLocation } from 'react-router-dom';

const KeepAlive = ({ children, path }) => {
  const location = useLocation();
  const isMatch = location.pathname === path;

  return (
    <div style={{ display: isMatch ? 'block' : 'none' }}>
      {children}
    </div>
  );
};

export default KeepAlive;
