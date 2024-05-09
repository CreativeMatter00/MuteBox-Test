import CreateUser from "@/components/admin/CreateUser";
import Navbar from "@/components/ui/Navbar";

const page = () => {
  return (
    <div>
      <Navbar className="top-2" />
      <CreateUser />
    </div>
  );
};

export default page;
