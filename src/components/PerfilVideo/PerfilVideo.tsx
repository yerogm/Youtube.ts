import {
    CollectionReference,
    collection,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";
import { Link, useParams } from "react-router-dom";
import "./styles.scss";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface listaVideo {
    name: string;
    ImgUsuario: string;
    description: string;
    Video: string;
    ImgPortada: string;
    fecha: Date | string;
    id: string;
    likes: number;
    disLikes: number;
    categoria: string;
}

const PerfilVideo = () => {
    const youtubeCollection: any = collection(db, "listaVideos");

    const params = useParams();
    const [video, setVideo] = useState<listaVideo>();
    const [videoFiltro] = useState("");

    const obtenerYoutube = async () => {
        const data = await getDocs(youtubeCollection);
        const values = data.docs.map((doc) => ({
            ...(doc.data() as listaVideo),
            id: doc.id,
        }));

        values.map((video) => {
            if (video.id === params.id) return setVideo(video);
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

    const videoCategoria = async () => {
        try {
            const categoriaId = video?.categoria
            const encontrarCategoria = await youtubeCollection.where("categoria", "==", categoriaId);
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
                    <div>
                        <h1>categoria: {video.categoria}</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerfilVideo;
