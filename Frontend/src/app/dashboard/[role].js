import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminView from '../components/AdminView';
import ManagerView from '../components/ManagerView';
import UserView from '../components/UserView';

const RoleBaseView = () => {
  const router = useRouter();
  const { role } = router.query;
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (role) setUserRole(role);  // Replace with actual role fetch logic
  }, [role]);

  if (userRole === 'admin') return <AdminView />;
  if (userRole === 'manager') return <ManagerView />;
  return <UserView />;
};

export default RoleBaseView;
