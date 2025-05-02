import HeaderBarDash from "@/components/HeaderBarDash";
import CancelledMain from "./_components/CancelledMain";
import SideBar from "@/components/SideBar";

export default function Cancelled() {

    return (
        <HeaderBarDash>
            <SideBar>
                <div className="w-full h-[calc(100vh-50px)] flex justify-center">
                    <CancelledMain /> 
                </div>
            </SideBar>
        </HeaderBarDash>
    );
}
