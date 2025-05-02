"use client";
import themeGet from "@/actions/themeGet";
import Login from "@/components/Login";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function LoginPage() {
    const { uuid } = useParams();
    
    // Get theme
    const { data: themeData,  } = useQuery({
        queryKey: ['theme', uuid], 
        queryFn: () => themeGet(uuid as string),
        enabled: uuid !== "dashboard" && uuid !== null,
    });
    return (
        <div 
            className="flex justify-center items-center w-[100vw] h-[100vh]"
            style={{ backgroundColor: themeData?.data?.colors?.background_secondary }}        
        >
            <Login data={themeData?.ok? themeData.data : null} uuid={uuid as string}/>
        </div>
    );
}
