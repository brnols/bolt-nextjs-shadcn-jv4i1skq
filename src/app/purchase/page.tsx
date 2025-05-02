import HeaderBarDash from "@/components/HeaderBarDash";
import PurchaseMain from "./_components/PurchaseMain";
import SideBar from "@/components/SideBar";

export default function Purchase() {
    return (
            <HeaderBarDash>
                <SideBar>
                    <div className="w-full h-[calc(100vh-50px)] flex justify-center">
                        <PurchaseMain />
                    </div>
                </SideBar>
            </HeaderBarDash>
    );
}   