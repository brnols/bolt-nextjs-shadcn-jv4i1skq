"use client"
import themeGet from "@/actions/themeGet";
import Courses from "@/components/Courses";
import HeaderBar from "@/components/HeaderBar";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Main() {
    const { uuid } = useParams();

    // Get theme
    const { data: themeData,  } = useQuery({
        queryKey: ['theme', uuid], 
        queryFn: () => themeGet(uuid as string),
        enabled: uuid !== "dashboard" && uuid !== null,
    });

    return (
        <HeaderBar>
            <div 
                style={{ backgroundColor: themeData?.data?.colors?.background_secondary }}
                className=" flex justify-center items-center w-[100vw]  max-w-full"
            >
                <Courses />
            </div>
        </HeaderBar>
    )
}
