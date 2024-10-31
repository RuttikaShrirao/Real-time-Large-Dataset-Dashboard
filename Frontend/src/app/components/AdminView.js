import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), { ssr: false });
const DataTable = dynamic(() => import('./DataTable'), { ssr: false });

const AdminView = () => {
  const data = [{ name: 'Jan', value: 30 }, { name: 'Feb', value: 50 }]; // Placeholder data

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Chart data={data} />
      <DataTable data={data} />
    </div>
  );
};

export default AdminView;
