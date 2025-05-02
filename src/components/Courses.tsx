"use client";
import { Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import themeGet from "@/actions/themeGet";
import { modulosGet } from "@/actions/moduloGet";

export default function Courses() {
    const { push } = useRouter();
    const { uuid } = useParams();

    // Get theme
    const { data: themeData,  } = useQuery({
        queryKey: ['theme', uuid], 
        queryFn: () => themeGet(uuid as string),
        enabled: uuid !== "dashboard" && uuid !== null,
    });
    // Get modulos
    const { data: modulosData, } = useQuery({
        queryKey: ['modulos', uuid], 
        queryFn: () => modulosGet(uuid as string),
        enabled: uuid !== null,
    });

    return (
            <div className="flex flex-col items-center container">
                {/* Banner - 1920x595px */}
                <div className="w-full flex justify-center items-center">
                    <div className="aspect-[20/11] overflow-hidden w-full rounded-md shadow-md shadow-black/70">
                        {themeData?.data?.background_img ? (
                            <img 
                                src={themeData?.data?.background_img ? themeData?.data?.background_img : ""} 
                                alt="Banner" 
                                className="w-full h-full object-cover object-center" 
                            />
                        ) : (
                            <Skeleton className="w-full h-full" />
                        )}
                    </div>
                </div>
                {/* cursos */}
                <div className="w-full flex flex-col gap-4">
                    {/* Título do Curso */}
                    <h2 className="text-lg sm:text-2xl font-bold pt-2" style={{ color: themeData?.data?.colors.text_primary }}>
                        {themeData?.data?.course_title? themeData?.data.course_title : <Skeleton className="w-[250px] h-[40px] rounded-md"/>}
                    </h2>
                    <Separator className="h-[2px] bg-[#C9C9C9]"/>
                    <div 
                        className="flex justify-start text-lg sm:text-xl py-2 px-0 sm:px-0 font-bold"
                        style={{ color: themeData?.data?.colors.text_primary }}
                    >
                        Módulos
                    </div>
                    {/* Carrossel de módulos */}
                    <Carousel>
                        {modulosData?.data && modulosData?.data?.length > 0 ? (
                                <CarouselContent className="pl-4">
                                    {(Array.isArray(modulosData.data) ? modulosData.data : []).map((modulo) => (
                                        <CarouselItem key={modulo.title} className="basis-auto pl-2">
                                            <div className="sm:w-[270px] w-[180px] aspect-[9/13]  rounded-md flex items-center justify-center" >
                                                <button
                                                    type="button"
                                                    onClick={() => push(`/main/${uuid}/classroom`)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === " ") {
                                                        push(`/main/${uuid}/classroom`);
                                                        }
                                                    }}
                                                    className="p-0 border-none bg-transparent rounded-md w-full shadow-md shadow-black/70 cursor-pointer"
                                                    >
                                                    <img
                                                        src={modulo.thumbnail || ""}
                                                        alt="Imagem do módulo"
                                                        className="w-full rounded-md"
                                                    />
                                                </button>
                                            </div>
                                            <span 
                                                className="text-md font-semibold pt-2 cursor-default" 
                                                style={{ color: themeData?.data?.colors.text_primary }}
                                                
                                            >
                                                {modulo.title || "Sem título"}
                                            </span>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                        ):(
                            // Skeleton do carrosol
                            <>
                                <CarouselContent className="flex -ml-[1px]">
                                {Array(5)
                                .fill(null)
                                .map((_, index) => {
                                    const n = `n  ${index}`;
                                    return (
                                    <CarouselItem key={n} className="basis-auto pl-1">
                                        <div className="sm:w-[270px] w-[180px] aspect-[9/13] cursor-pointer border rounded-sm flex items-center justify-center">
                                        <Skeleton className="w-full h-full rounded-sm" />
                                        </div>
                                    </CarouselItem>
                                    );
                                })}
                                </CarouselContent>
                            </>
                        )}
                    </Carousel>
                </div>
            </div>
    );
}
