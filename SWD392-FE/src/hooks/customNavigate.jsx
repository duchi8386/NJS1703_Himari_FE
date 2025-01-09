import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();
  
  return (path) => {
    navigate(path);
  };
};