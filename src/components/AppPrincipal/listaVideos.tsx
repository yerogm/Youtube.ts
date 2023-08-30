import React, { useEffect, useState } from "react";
import "./styles.scss";
import { db } from "../firebaseConfig/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";
moment.locale("es");

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

const ListaVideos = () => {
    moment.locale("es");
    const youtubeCollection = collection(db, "listaVideos");

    const [video, setVideo] = useState<listaVideo[]>([]);
    const [videos, setVideos] = useState([]);
    const [buscador, setVideoFiltro] = useState("");

    const obtenerYoutube = async () => {
        const data = await getDocs(youtubeCollection);
        const values = data.docs.map((doc) => ({
            ...(doc.data() as listaVideo),
            id: doc.id,
        }));

        setVideo(values);
    };
    console.log(youtubeCollection);

    useEffect(() => {
        obtenerYoutube();
    }, []);

    const eliminarVideo = (id: string) => {
        const YouTubeDoc = doc(db, "listaVideos", id);
        deleteDoc(YouTubeDoc);

        if (window.confirm("estas seguro de querer eliminar este video")) {
            console.log(id);
        }
        obtenerYoutube();
    };
    useEffect(() => {
        if (buscador.length > 0) {
            console.log("DEBEERIA FILTRAR: ", buscador);
            let buscar = buscador.toUpperCase();
            setVideo(
                video.filter(
                    (x: listaVideo) =>
                        (x.description && x.description.toUpperCase().includes(buscar)) ||
                        (x.categoria &&
                            x.categoria.toUpperCase().includes(buscar))
                )
            );
        } else {
            setVideo(video);
        }
    }, [buscador, video]);

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
                    <input
                        value={buscador}
                        type="text"
                        placeholder="Buscar"
                        onChange={(e) => {
                            setVideoFiltro(e.target.value);
                        }}
                    />

                    <button>
                        <img
                            src="https://icones.pro/wp-content/uploads/2021/06/icone-loupe-gris.png"
                            alt=""
                            width="50px"
                            height="30px"
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
            <div className="listaVideos">
                {video.map((videoItem) => (
                    <div>
                        <div>
                            <Link to={"/perfilVideo/" + videoItem.id}>
                                <img
                                    src={videoItem.ImgPortada}
                                    alt=""
                                    className="imgPortada"
                                    style={{
                                        borderRadius: "15px",
                                        width: "100%",
                                    }}
                                />
                            </Link>

                            <div className="descriptionVideo">
                                <img
                                    src={videoItem.ImgUsuario}
                                    alt=""
                                    height="36px"
                                    width="36px"
                                />
                                <h3>{videoItem.description}</h3>
                                <button
                                    onClick={() => eliminarVideo(videoItem.id)}
                                    className="btnEliminar"
                                >
                                    X
                                </button>
                            </div>

                            <div style={{ margin: "0", marginLeft: "50px" }}>
                                <p
                                    style={{
                                        font: "14px Roboto, Arial, sans-serif",
                                        color: "#AAAAAA",
                                    }}
                                >
                                    {videoItem.name}
                                </p>
                                <p className="fecha">
                                    {moment(videoItem.fecha)
                                        .locale("es")
                                        .fromNow()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaVideos;
