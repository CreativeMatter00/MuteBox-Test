import { SparklesPreviewLogin } from "@/components/home/SparklesPreviewLogin";
import UserLogin from "@/components/userLogin/UserLogin";

const page = () => {
  return (
    <section className="bg-white relative ">
      <div className="h-screen lg:overflow-hidden ">
        <div className="h-full w-full  p-[1vh] container">
          <div className="flex max-lg:flex-col h-full w-full ">
            <div className="w-5/12 max-lg:w-full flex justify-center items-center">
              <SparklesPreviewLogin />
            </div>
            <div className="w-7/12 max-lg:w-full p-[1vh] flex items-center justify-center lg:mx-24">
              <UserLogin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
