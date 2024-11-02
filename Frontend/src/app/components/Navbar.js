import { logout } from "../actions";
import Button from '@mui/material/Button';
export default function NavBar() {
  return (
    <div className="navbar">
      <p className="navbarCurrentPage">Dashboad</p>
      {/* <div className="navProfile"> */}
        <div className="flex ">
          <p className="m-2">admin</p>

            <Button variant="contained" onClick={()=>logout()}>Logout</Button>
        </div>
      {/* </div> */}
    </div>
  );
}
