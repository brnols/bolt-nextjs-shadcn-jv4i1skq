import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Skeleton } from "./ui/skeleton";

interface VideoPlayerProps {
    uuid: string| undefined;
    className?: string; 
    width?: string;
    height?: string;
    thumbnail?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ uuid, className, width = "640px", height = "360px", thumbnail }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<videojs.Player | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [playerKey, setPlayerKey] = useState(0);
    const [currentThumbnail, setCurrentThumbnail] = useState<string | undefined>(thumbnail);

    const apiBaseUrl = "https://clients.paycentral.com.br/api/v1/streaming/render/";

    // Monitorar mudanças no uuid para atualizar a URL do vídeo
    useEffect(() => {
        if (!uuid) return;
        setVideoUrl(`${apiBaseUrl}${uuid}`);
        setPlayerKey(prevKey => prevKey + 1);
    }, [uuid]);

    useEffect(() => {
        if (thumbnail !== currentThumbnail) {
            setCurrentThumbnail(thumbnail);
            setPlayerKey(prevKey => prevKey + 1); 
        }
    }, [thumbnail, currentThumbnail]);

    useEffect(() => {
        if (!videoUrl || !videoRef.current) return;

        if (playerRef.current) {
            playerRef.current.dispose();
            playerRef.current = null;
        }

        const videoOptions = {
            controls: true,
            autoplay: false,
            fluid: false,
            responsive: false,
            sources: [{ src: videoUrl, type: "video/mp4" }],
        };
        if (currentThumbnail && currentThumbnail.trim() !== "") {
            Object.assign(videoOptions, { poster: currentThumbnail });
        }
        playerRef.current = videojs(videoRef.current, videoOptions);
        if (playerRef.current) {
            if (currentThumbnail && currentThumbnail.trim() !== "") {
                playerRef.current.poster(currentThumbnail);
            } else {
                playerRef.current.poster("");
            }
        }

        const style = document.createElement('style');
        style.innerHTML = `
            .video-js .vjs-big-play-button {
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) !important;
                margin: 0 !important;
            }
        `;
        document.head.appendChild(style);

        videoRef.current.oncontextmenu = (e) => e.preventDefault();

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, [videoUrl, playerKey, currentThumbnail]);

    return (
        <div key={playerKey} className={`!w-full !h-full ${className}`} style={{ width, height }}>
            {videoUrl ? (
                <div className="relative !w-full h-full">
                    <video 
                        ref={videoRef} 
                        className="video-js vjs-default-skin w-full h-full object-cover rounded-md"
                        style={{ aspectRatio: "16/9" }}
                        {...(currentThumbnail && currentThumbnail.trim() !== "" 
                            ? { poster: currentThumbnail } 
                            : {})}
                    />
                </div>
            ) : (
                <Skeleton className="w-full h-full"/>
            )}
        </div>
    );
};

export default VideoPlayer;