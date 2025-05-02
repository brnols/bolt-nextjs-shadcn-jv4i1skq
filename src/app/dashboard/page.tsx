import HeaderBarDash from "@/components/HeaderBarDash";
import DashboardMain from "./component/DashboardMain";
import SideBar from "@/components/SideBar";

export default function DashboardPage() {
    return (
        <div 
            className="w-[100vw] h-[100vh]"
            data-testid="dashboard-page-container"
        >
            <HeaderBarDash>
                <SideBar>
                    <div className="w-full h-[calc(100vh-50px)] flex justify-center">
                        <DashboardMain /> 
                    </div>
                </SideBar>
            </HeaderBarDash>
        </div>
    );
}
