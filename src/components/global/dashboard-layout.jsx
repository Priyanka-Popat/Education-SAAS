import TopRightBar from "./top-right-bar";
import SideBar from "./side-bar";
import Breadcrumbs from "./bread-crumbs";

function DashboardLayout({ children, className = "", headerComponent,  breadcrumbs = [] }) {
  return (
    <>
      <div className="parent p-3 grid lg:grid-cols-[auto_1fr] gird-cols-1">
        <div className="bg-white rounded-tl-[0px] rounded-tr-[40px] rounded-br-[0px] rounded-bl-[0px] pr-3 hidden lg:block">
          <div className="c5 w-60 h-full bg-primary py-4 px-3 flex flex-col justify-between items-center gap-y-7 sideBar">
            <SideBar />
          </div>
        </div>
        <div
          className={`${className} h-[96.5vh] rounded-[40px] grid grid-cols-12 grid-rows-[1fr_1fr_auto_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto]`}
        >
          <div className="c2 row-start-1 col-start-1 col-span-3 row-span-2 pt-5 ps-7 text-white">
            {headerComponent}
          </div>
          {breadcrumbs.length > 0 && (
          <div className="col-start-5 row-start-1 col-span-4">
            <Breadcrumbs
              items={breadcrumbs}
            />
          </div>
          )}
          <div className="c3 col-span-4"></div>
          <div className="col-start-8 row-start-1 relative hidden lg:block">
            <div className="c12"></div>
          </div>
          <div className="relative col-start-9 row-start-1 col-span-4 pb-[15px] pl-[15px] row-span-2 h-[60%] justify-center items-start bg-white rounded-tl-[0px] rounded-tr-[0px] rounded-br-[0px] rounded-bl-[40px] hidden lg:flex">
            <TopRightBar />
          </div>
          <div className="col-start-1 row-start-3"></div>
          {children}
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
