import React, { useEffect, useState } from "react";
import "./styles.scss";
import { db } from "../firebaseConfig/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import moment from "moment";
import "moment/locale/es";
import { Link } from "react-router-dom";
import VideosParametros from "./videosParametros";
moment.locale("es");

export interface VideoYoutube {
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

    const [video, setVideo] = useState<VideoYoutube[]>([]);
    const youtubeCollection = collection(db, "listaVideos");

    const [buscador, setBuscador] = useState("");

    useEffect(() => {
        if (buscador.length > 0) {
            console.log("DEBEERIA FILTRAR: ", buscador);
            let buscar = buscador.toUpperCase();
            setVideo(
                video.filter(
                    (x: VideoYoutube) =>
                        (x.description &&
                            x.description.toUpperCase().includes(buscar)) ||
                        (x.categoria &&
                            x.categoria.toUpperCase().includes(buscar))
                )
            );
        } else {
            setVideo(video);
        }
    }, [buscador, video]);
    const obtenerYoutube = async () => {
        const data = await getDocs(youtubeCollection);
        const values = data.docs.map((doc) => ({
            ...(doc.data() as VideoYoutube),
            id: doc.id,
        }));

        setVideo(values);
    };
    useEffect(() => {
        obtenerYoutube();
    }, []);

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
                            setBuscador(e.target.value);
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
            <VideosParametros videos={video} />
        </div>
    );
};

export default ListaVideos;
