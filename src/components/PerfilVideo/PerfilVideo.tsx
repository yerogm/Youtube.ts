import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VideoYoutube } from "../AppPrincipal/listaVideos";
import VideosParametros from "../AppPrincipal/videosParametros";
import { db } from "../firebaseConfig/firebase";
import "./styles.scss";
import PerfilParametros from "./PerfilParametros";

const PerfilVideo = () => {
    const youtubeCollection = collection(db, "listaVideos");

    const params = useParams();
    const [video, setVideo] = useState<VideoYoutube>();
    const [videoArray, setVideoArray] = useState<VideoYoutube[]>([]);
    const [videoFiltro] = useState("");

    const obtenerYoutube = async () => {
        const videosFiltrados = await query(
            youtubeCollection,
            where("id", "==", params.id)
        );

        const data = await getDocs(videosFiltrados);
        const values = data.docs.map((doc) => ({
            ...(doc.data() as VideoYoutube),
            id: doc.id,
        }));

        values.map((video) => {
            if (video.id === params.id) {
                videoCategoria(video.categoria);
                return setVideo(video);
            }
            return undefined;
        });
    };

    useEffect(() => {
        obtenerYoutube();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const AddDisLike = (value: number) => {
        if (video) {
            let disLikes = video.disLikes + value;
            setVideo({ ...video, disLikes });
        }
    };
    const AddLike = async (value: number) => {
        if (video) {
            let likes = video.likes + value;
            setVideo({ ...video, likes });
            const postDoc = doc(db, "listaVideos", video.id);
            const currentLikes = (video.likes ?? 0) + 1;
            const videoActualizado = { ...video, likes: currentLikes };
            setVideo(videoActualizado);
            await updateDoc(postDoc, videoActualizado);
        }
    };

    const videoCategoria = async (categoriaId: string) => {
        try {
            const videosFiltrados = await query(
                youtubeCollection,
                where("categoria", "==", categoriaId)
            );

            const data = await getDocs(videosFiltrados);
            const values = data.docs.map((doc) => ({
                ...(doc.data() as VideoYoutube),
                id: doc.id,
            }));

            setVideoArray(values);
        } catch {}
    };

    return (
        <div className="contenedor">
            <div className="divBarraPrincipal">
                <Link to={"/"}>
                    <img
                        src="https://apple.teveotecno.com.ar/wp-content/uploads/2022/07/YouTube-logo-black-background-4.png"
                        alt=""
                        width="100px"
                    />
                </Link>
                <div className="buscador">
                    <input type="text" placeholder="Buscar" />

                    <button style={{ backgroundColor: "#77767665" }}>
                        <img
                            src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-gris.png"
                            alt=""
                            width="50px"
                            height="30px"
                            style={{ objectFit: "contain" }}
                        />
                    </button>
                </div>
                <Link
                    to={"/crearVideo"}
                    style={{
                        background: "black",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <img
                        src="https://i.pinimg.com/564x/47/0a/64/470a6494597fa25fde3d176b8bd4375a.jpg"
                        alt=""
                        width="35px"
                    />
                </Link>
            </div>
            {video && (
                <div className="contenedorPrincipal">
                    <div className="contenedorPerfil">
                        <iframe
                            src={video.Video.replace("watch?v=", "embed/")}
                            title="video"
                            className="video"
                            width="938px"
                            height="528px"
                            allowFullScreen
                        />
                        <div className="contenedorUsuario">
                            <h3>{video.description}</h3>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <img
                                    src={video.ImgUsuario}
                                    height="36px"
                                    width="36px"
                                    alt=""
                                />
                                <h4>{video.name}</h4>
                                <div className="likes">
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            display: "flex",
                                            gap: "10px",
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faThumbsUp}
                                            style={{
                                                color:
                                                    video.likes > 0
                                                        ? "white"
                                                        : "#4f4d4d",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                            }}
                                            title="Me gusta este video"
                                            onClick={() => AddLike(1)}
                                        />
                                        <span>{video.likes}</span>
                                    </p>

                                    {/* </div>
                            <div className="likes"> */}
                                    <p style={{ fontSize: "20px" }}>
                                        <FontAwesomeIcon
                                            icon={faThumbsDown}
                                            style={{
                                                color:
                                                    video.disLikes < 0
                                                        ? "white"
                                                        : "#4f4d4d",
                                                fontSize: "20px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => AddDisLike(1)}
                                            title="No me gusta este video"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sugerencias">
                        <PerfilParametros videos={videoArray} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerfilVideo;
