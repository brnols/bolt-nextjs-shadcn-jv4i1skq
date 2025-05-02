/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeftCircle, ArrowRightCircle, Play } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircularProgress } from "./Circular-progress";
import VideoPlayer from "./PlayerVideo";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";
import themeGet from "@/actions/themeGet";
import { useQuery } from "@tanstack/react-query";
import { moduloGet, modulosGet } from "@/actions/moduloGet";
import { useParams } from "next/navigation";

export default function Classroom() {

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
    // Get modulos
    const { data: moduloData, } = useQuery({
        queryKey: ['modulos', uuid], 
        queryFn: () => moduloGet(uuid as string),
        enabled: uuid !== null,
    });


    const [nVideo, setNVideos] = useState<number>(10)
    const [nVideoAtual, setNVideosAtual] = useState<number>(3)
    const [urlVideo, setUrlVideo] = useState<string>(modulosData?.data?.[0]?.videos?.[0]?.uuid || "")
    const [thumbnailVideo, setThumbnailVideo] = useState<string>(modulosData?.data?.[0]?.videos?.[0]?.thumbnail || "")
    const [descriptionVideo, setDescriptionVideo] = useState<string>(modulosData?.data?.[0]?.videos[0].description || "Sem descrição")
    const [videoName, setVideoName] = useState<string>(modulosData?.data?.[0]?.videos[0].title || "");
    const [prevVideoUuid, setPrevVideoUuid] = useState<string>("");
    const [nextVideoUuid, setNextVideoUuid] = useState<string>("");

    // Sistema das bars de progresso.
    const [currentStep, setCurrentStep] = useState(1);
    const handleStepChange = (index: number) => {
        if(moduloData?.data){
            setCurrentStep(index + 1);
        }
    };
    // pega o numero total de video do curso.
    const contAllVideos = () => {
        const totalVideos = modulosData?.data?.reduce((total, session) => total + session.videos.length, 0);
        setNVideos(totalVideos as number);
    } 
    const contCheckVideos = () => {
        // sistema para pega os video ja assistido.
        setNVideosAtual(0)
    }

    // Inicializador
    useEffect(()=>{
        if(modulosData?.data && modulosData.data.length > 0){
            setUrlVideo(modulosData.data[0]?.videos[0].uuid)
            setThumbnailVideo(modulosData.data[0]?.videos[0].thumbnail ? modulosData.data[0]?.videos[0].thumbnail : "")
            setVideoName(modulosData.data[0]?.videos[0].title? modulosData.data[0].videos[0].title : "Sem título")
            setDescriptionVideo(modulosData.data[0].videos[0].description? modulosData.data[0].videos[0].description : "Sem descrição" )
            contAllVideos()
            contCheckVideos()
        }
    },[modulosData?.data])

    // Sistema de animação bar hub
    const tabs = ["Descrição","Arquivos"];
    const [step, setStep] = useState<number>(0)
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    useLayoutEffect(() => {
        const currentButton = buttonRefs.current[step];
        if (currentButton) {
        setIndicatorStyle({
            width: currentButton.offsetWidth,
            left: currentButton.offsetLeft,
        });
        }
    }, [step]);

    // Telas 
    const renderStep0 = () => {
        return(
            <div dangerouslySetInnerHTML={{ __html: descriptionVideo }} />
        )
    }
    const renderStep1 = () => {
        return(
            <div>
                
            </div>
        )
    }

    const handleArrowClick = (direction: "prev" | "next") => {
        for (let i = 0; i < (modulosData?.data || []).length; i++) {
            const mod = modulosData?.data?.[i];
            const idx = mod?.videos?.findIndex(v => v.uuid === urlVideo);
            if (idx !== -1) {
                let newModuleIndex = i;
                let newIndex = idx;
                if (direction === "next") {
                    if (typeof idx === "number" && mod?.videos && idx < mod.videos.length - 1) {
                        newIndex = idx + 1;
                    } else if (i < (modulosData?.data?.length ?? 0) - 1) {
                        newModuleIndex = i + 1;
                        newIndex = 0;
                    } else {
                        return;
                    }
                } else if (direction === "prev") {
                    if (typeof idx === "number" && idx > 0) {
                        newIndex = idx - 1;
                    }else if (i > 0) {
                        newModuleIndex = i - 1;
                        newIndex = modulosData?.data?.[newModuleIndex]?.videos?.length 
                            ? modulosData.data[newModuleIndex].videos.length - 1 
                            : 0;
                    }else {
                        return;
                    }
                }
                const newMod = modulosData?.data?.[newModuleIndex];
                const newVideo = (newIndex !== undefined && newMod?.videos) ? newMod.videos[newIndex] : undefined;
                if (!newVideo) return;
                setUrlVideo(newVideo.uuid);
                setDescriptionVideo(newVideo.description || "Sem descrição");
                setVideoName(newVideo.title? newVideo.title : "Sem título");
                setThumbnailVideo(newVideo.thumbnail ? newVideo.thumbnail : "");
                if (newIndex && newIndex > 0 && newMod?.videos[newIndex - 1].uuid) {
                    setPrevVideoUuid(newMod.videos[newIndex - 1].uuid);
                }else if (newModuleIndex > 0) {
                    const prevMod = modulosData?.data?.[newModuleIndex - 1];
                    if (prevMod && prevMod.videos.length > 0) {
                        setPrevVideoUuid(prevMod.videos[prevMod.videos.length - 1].uuid);
                    }
                }else {
                    setPrevVideoUuid("");
                }
                if (newIndex !== undefined && newMod !== undefined) {
                    if (newIndex < newMod.videos.length - 1) {
                        setNextVideoUuid(newMod.videos[newIndex + 1].uuid);
                    } else if (modulosData?.data && modulosData.data.length > newModuleIndex) {
                        const nextMod = modulosData.data[newModuleIndex + 1];
                        setNextVideoUuid(nextMod.videos[0].uuid);
                    }
                    else {
                        setNextVideoUuid("");
                    }
                }
                handleStepChange(newIndex? newIndex : 0);
                break;
            }
        }
    };

    return (
        <div className="w-full h-full" style={{backgroundColor: themeData?.data?.colors.background_primary}}>
        <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-3 pl-4 pt-4 md:pr-0 pr-4 container" style={{backgroundColor: themeData?.data?.colors.background_primary}}>

            {/* sidebar - video - descrição */}
            <div className="col-span-2 flex flex-col gap-4 h-auto">
                {/* sidebar */}
                <div className="w-full box-item !flex h-[60px]  justify-between items-center px-2" style={{backgroundColor: themeData?.data?.colors.background_primary}}>
                    {/* {modulos? (
                        <Link
                            className="flex items-center justify-center gap-2  "
                            href={`/main/${uuid}/dashboard`}
                            style={{color: theme?.colors.text_primary}}
                        >
                            <ChevronLeft size={20}  />
                            Ver todos os módulos
                        </Link>
                    ):(
                        <Skeleton className="w-[200px] h-[24px] rounded-lg"/>
                    )}
                    <div className="flex gap-4 justify-center items-center">

                    {modulos ? (
                        <Button
                            className="flex border-2 gap-2 justify-center items-center h-[25px] rounded-lg !px-2 !py-1 text-sm"
                            style={{
                            backgroundColor: theme?.colors.background_secondary,
                            borderColor: theme?.colors.color_primary,
                            color: theme?.colors.color_primary,
                            }}
                        >
                            <CircleCheckBig size={15}/>
                            <p>Aula concluída</p>
                        </Button>
                        ) : (
                        <Skeleton className="h-[25px] w-[125px] rounded-lg" />
                        )}
                    </div> */}
                    <div className="text-lg font-bold" style={{color: themeData?.data?.colors.text_primary}}>
                        <p>{videoName}</p>
                    </div>
                    <div className="flex gap-4 items-center" style={{color: themeData?.data?.colors.text_secondary}}>
                            <ArrowLeftCircle size={24} className="cursor-pointer" onClick={() => handleArrowClick("prev")} />
                            <ArrowRightCircle size={24} className="cursor-pointer" onClick={() => handleArrowClick("next")} />
                    </div>
                </div>

                {/* video */}
                <div className="box-item !p-0  overflow-hidden shadow-lg shadow-black/70">
                    <div className="w-full h-auto">
                        {modulosData?.data? (
                            <div className="w-full aspect-[16/9]">
                                <VideoPlayer uuid={urlVideo} thumbnail={thumbnailVideo}/>
                            </div>
                        ):(
                            <div className="w-full aspect-[16/9] py-2">
                                <Skeleton className="w-full h-full "/>
                            </div>
                        )}
                    </div>
                </div>

                {/* <div className="box-item !flex justify-end">
                    {modulos ? (
                        <Button
                            className="flex border-2 gap-2 justify-center items-center h-[25px] rounded-lg !px-2 !py-1 text-sm"
                            style={{
                            backgroundColor: theme?.colors.background_secondary,
                            borderColor: theme?.colors.color_primary,
                            color: theme?.colors.color_primary,
                            }}
                        >
                            <CircleCheckBig size={15}/>
                            <p>Aula concluída</p>
                        </Button>
                    ) : (
                        <Skeleton className="h-[25px] w-[125px] rounded-lg" />
                    )}
                </div> */}

                {/* descrição */}
                <div className="w-full h-auto flex flex-col gap-4 py-8 px-4 box-item" style={{backgroundColor: themeData?.data?.colors.background_primary}}>
                    {modulosData?.data? (
                        <div className="relative flex border-b">
                            {tabs.map((tab, idx) => (
                                <button
                                    key={tab}
                                    ref={(el) => { buttonRefs.current[idx] = el; }}
                                    onClick={() => { setStep(idx); }}
                                    className="relative subtitle-2 overflow-hidden px-4 py-2 focus:outline-none transition-colors duration-300"
                                    style={{ color: step === idx ? themeData?.data?.colors.text_primary : themeData?.data?.colors.text_secondary }}
                                    type="button"
                                >
                                {tab}
                                </button>
                            ))}
                            <div
                                className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
                                style={{ width: indicatorStyle.width, left: indicatorStyle.left }}
                            />
                        </div>

                    ):(
                        <Skeleton className="w-[150px] h-[25px]"/> 
                    )}

                    {modulosData?.data? (
                        <div className="px-4 py-4 rounded-lg" style={{backgroundColor: themeData?.data?.colors.background_secondary, color: themeData?.data?.colors.text_primary}}>
                            <div className="mt-4">
                                {step === 0 ? renderStep0() : renderStep1()}
                            </div>
                        </div>
                    ):(
                        <div className="px-4 py-4 flex flex-col gap-2 rounded-lg" style={{backgroundColor: themeData?.data?.colors.background_secondary}}>
                            <Skeleton className="w-[250px] h-[20px]"/> 
                            <Skeleton className="w-[290px] h-[20px]"/> 
                            <Skeleton className="w-[150px] h-[20px]"/> 
                            <Skeleton className="w-[200px] h-[20px]"/> 
                        </div>
                    )}
                </div>

                {/* painel cell */}
                <div className="block w-full h-auto bg-bg-Primary sm:hidden">
                    <div className="w-full flex flex-col gap-4 justify-center sticky top-0">
                    
                    {/* <div className="h-auto py-2 border box-item rounded-lg w-full flex flex-col gap-4 px-4" style={{backgroundColor: theme?.colors.background_primary}}>
                        <div className=" text-lg font-bold " style={{ color: theme?.colors.color_primary }}>
                            {theme?.course_title? theme.course_title : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <div className="text-sm flex gap-4"style={{color: theme?.colors.text_secondary}}>
                                    {nVideoAtual ? nVideoAtual : 0 }/{nVideo? nVideo : 0 }<p>Aulas completas</p>
                                </div>
                                <div>
                                    <GraduationCap size={20} style={{color: theme?.colors.text_secondary}}/>
                                </div>
                            </div>
                            <div>
                                <Progress color={theme?.colors.color_primary} value={nVideoAtual} valueMax={nVideo}/>
                            </div>
                        </div>
                    </div> */}

                    <div  className="!flex rounded-lg w-full overflow-hidden flex-col items-center box-item !px-0 border justify-center">
                        <Accordion type="single" collapsible className="w-full px-4" style={{backgroundColor: themeData?.data?.colors.background_primary}}>
                        {modulosData?.data?.map((modulo, index) => (
                            
                            <AccordionItem key={modulo.uuid} value={`modulo-${index}`}>
                                <AccordionTrigger className="h-full w-full flex items-center gap-4 py-4 border-b border-border">

                                    {modulo ? (
                                    <div className="w-[40px] flex justify-center items-center">
                                        <CircularProgress
                                            n={index+1}
                                            value={100}
                                            valueMax={100}
                                            // valueMax={modulo.videos.length}
                                            size={50}
                                            strokeWidth={4}
                                            fontSize="sm"
                                            progressColor={themeData?.data?.colors.color_primary}
                                        />
                                    </div>
                                    ) : (
                                    <div className="w-[60px] flex justify-center items-center">
                                        <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                    </div>
                                    )}
                                    {modulo ? (
                                        <div>
                                            <span className="text-sm" style={{ color: themeData?.data?.colors.color_primary }}>{modulo.title}</span>
                                            {/* <p className="text-xs" style={{ color: theme?.colors.text_secondary }}>0/{modulo.videos.length}</p> */}
                                        </div>
                                    ) : (
                                    <Skeleton className="w-[150px] h-[20px] rounded-lg" />
                                    )}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                    <ul className="space-y-4 w-auto py-4 relative">
                                        {modulo?.videos.map((video, idx) => {
                                            return (
                                                <li
                                                key={video.uuid}
                                                className="flex items-center w-full justify-between gap-3 text-sm cursor-pointer relative z-10"
                                                style={{
                                                    color: video.uuid === urlVideo ? themeData?.data?.colors.color_primary : themeData?.data?.colors.text_secondary,
                                                    fontWeight: video.uuid === urlVideo ? "bold" : "normal"
                                                }}
                                                onClick={() => {
                                                    handleStepChange(idx);
                                                    setUrlVideo(video.uuid); 
                                                    setDescriptionVideo(video.description ? video.description : "");
                                                    setVideoName(video.title ? video.title : "Sem título");
                                                    setPrevVideoUuid(idx > 0 ? modulo.videos[idx - 1].uuid : "");
                                                    setNextVideoUuid(idx < modulo.videos.length - 1 ? modulo.videos[idx + 1].uuid : "");
                                                    setThumbnailVideo(video.thumbnail ? video.thumbnail : "");

                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        handleStepChange(idx);
                                                        setUrlVideo(video.uuid); 
                                                        setDescriptionVideo(video.description ? video.description : "");
                                                        setThumbnailVideo(video.thumbnail ? video.thumbnail : "");
                                                        setVideoName(video.title ? video.title : "Sem título");
                                                        setPrevVideoUuid(idx > 0 ? modulo.videos[idx - 1].uuid : "");
                                                        setNextVideoUuid(idx < modulo.videos.length - 1 ? modulo.videos[idx + 1].uuid : "");
                                                    }
                                                }}
                                            >
                                                    <div className="flex gap-2">
                                                        <div className="w-[30px] flex flex-col justify-center items-center z-10">
                                                            {video.uuid === urlVideo 
                                                                ? (<Play size={20} style={{ color: themeData?.data?.colors.color_primary }} />)
                                                                : (<Play size={20} style={{ color: themeData?.data?.colors.color_secondary }} />)
                                                            }
                                                        </div>
                                                        <span className="w-auto max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">
                                                            {video.title ? video.title : "Sem título"}
                                                        </span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>

                    </div>
                    </div>
                </div>
            </div>

            {/* painel */}
            <div className="hidden bg-bgPrimary sm:flex w-full h-auto justify-center items-start" style={{backgroundColor: themeData?.data?.colors.background_primary}}>
                <div className="w-full flex flex-col items-center gap-4 justify-center sticky top-0">
                    
                    {/* <div className="h-auto py-2 border rounded-lg w-[90%] flex flex-col box-item gap-4 px-4" style={{backgroundColor: theme?.colors.background_primary}}>
                        <div className=" text-lg font-bold " style={{ color: theme?.colors.color_primary }}>
                            {theme?.course_title? theme.course_title : ""}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <div className="text-sm flex gap-4"style={{color: theme?.colors.text_secondary}}>
                                    {nVideoAtual ? nVideoAtual : 0 }/{nVideo? nVideo : 0 }<p>Aulas completas</p>
                                </div>
                                <div>
                                    <GraduationCap size={20} style={{color: theme?.colors.text_secondary}}/>
                                </div>
                            </div>
                            <div>
                                <Progress color={theme?.colors.color_primary} value={nVideoAtual} valueMax={nVideo}/>
                            </div>
                        </div>
                    </div> */}

                    <div  className="!flex rounded-lg w-[90%] overflow-hidden box-item  flex-col items-center !p-0 border justify-start">
                        <div 
                            className=" flex !justify-start items-center w-full h-[40px] text-md font-bold pt-2 pl-4"
                            style={{ color: themeData?.data?.colors.text_primary }}>
                            Conteúdo do curso
                        </div>
                        <Separator className="w-[94%] h-[1px]" style={{backgroundColor: themeData?.data?.colors.text_secondary}}/>
                        <Accordion type="single" collapsible className="w-full px-4" style={{backgroundColor: themeData?.data?.colors.background_primary}}>
                        {modulosData?.data?.map((modulo, index) => (
                            
                            <AccordionItem key={modulo.uuid} value={`modulo-${index}`}>
                                <AccordionTrigger className="h-full w-full flex items-center gap-4 py-4 border-b border-border">

                                    {modulo ? (
                                    <div className="w-[40px] flex justify-center items-center">
                                        <CircularProgress
                                            n={index + 1}
                                            value={100}
                                            // valueMax={modulo.videos.length}
                                            valueMax={100}
                                            size={50}
                                            strokeWidth={4}
                                            fontSize="sm"
                                            progressColor={themeData?.data?.colors.color_primary}
                                        />
                                    </div>
                                    ) : (
                                    <div className="w-[60px] flex justify-center items-center">
                                        <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                    </div>
                                    )}
                                    {modulo ? (
                                        <div>
                                            <span className="text-sm" style={{ color: themeData?.data?.colors.text_primary }}>{modulo.title}</span>
                                            {/* <p className="text-xs" style={{ color: theme?.colors.text_secondary }}>
                                                0/
                                                {modulo.videos.length}
                                            </p> */}
                                        </div>
                                    ) : (
                                    <Skeleton className="w-[150px] h-[20px] rounded-lg" />
                                    )}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div>
                                        <ul className="space-y-4 w-auto py-4 relative">
                                            {modulo?.videos.map((video, idx) => {
                                                return (
                                                    <li
                                                    key={video.uuid}
                                                    className="flex items-center w-full justify-between gap-3 text-sm cursor-pointer relative z-10"
                                                    style={{
                                                        color: video.uuid === urlVideo ? themeData?.data?.colors.color_primary : themeData?.data?.colors.text_secondary,
                                                        fontWeight: video.uuid === urlVideo ? "bold" : "normal"
                                                    }}
                                                    onClick={() => {
                                                        handleStepChange(idx);
                                                        setUrlVideo(video.uuid); 
                                                        setThumbnailVideo(video.thumbnail ? video.thumbnail : "");
                                                        setDescriptionVideo(video.description ? video.description : "");
                                                        setVideoName(video.title ? video.title : "");
                                                        setPrevVideoUuid(idx > 0 ? modulo.videos[idx - 1].uuid : "");
                                                        setNextVideoUuid(idx < modulo.videos.length - 1 ? modulo.videos[idx + 1].uuid : "");
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            handleStepChange(idx);
                                                            setUrlVideo(video.uuid); 
                                                            setThumbnailVideo(video.thumbnail ? video.thumbnail : "");
                                                            setDescriptionVideo(video.description ? video.description : "");
                                                            setVideoName(video.title ? video.title : "");
                                                            setPrevVideoUuid(idx > 0 ? modulo.videos[idx - 1].uuid : "");
                                                            setNextVideoUuid(idx < modulo.videos.length - 1 ? modulo.videos[idx + 1].uuid : "");
                                                        }
                                                    }}
                                                >
                                                        <div className="flex gap-2">
                                                            <div className="w-[30px] flex flex-col justify-center items-center z-10">
                                                                {video.uuid === urlVideo 
                                                                    ? (<Play size={20} style={{ color: themeData?.data?.colors.color_primary }} />)
                                                                    : (<Play size={20} style={{ color: themeData?.data?.colors.text_secondary }} />)
                                                                }
                                                            </div>
                                                            <span className="w-auto max-w-[180px] overflow-hidden whitespace-nowrap text-ellipsis">
                                                                {video.title ? video.title : "Sem título"}
                                                            </span>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>

                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}