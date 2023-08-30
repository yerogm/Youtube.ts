import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VideoYoutube } from "../AppPrincipal/listaVideos";
import moment from "moment";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import "./styles.scss";

interface VideosParametrosProps {
    videos: VideoYoutube[];
}

const PerfilParametros = (props: VideosParametrosProps) => {
    const { videos } = props;
    const youtubeCollection = collection(db, "listaVideos");

    const eliminarVideo = (id: string) => {
        const YouTubeDoc = doc(db, "listaVideos", id);
        deleteDoc(YouTubeDoc);

        if (window.confirm("estas seguro de querer eliminar este video")) {
            console.log(id);
        }
        // obtenerYoutube();
    };

    console.log(youtubeCollection);

    return (
        <div className="contenedorSugerencias" style={{}}>
            {videos.map((videoItem) => (
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            objectFit: "contain",
                        }}
                    >
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
                            <h4>{videoItem.description}</h4>
                            <button
                                onClick={() => eliminarVideo(videoItem.id)}
                                className="btnEliminar"
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div style={{ margin: "0", marginLeft: "90px" }} className="nameAndDate">
                        <p
                            style={{
                                font: "14px Roboto, Arial, sans-serif",
                                color: "#AAAAAA",
                                margin: "0",
                            }}
                        >
                            {videoItem.name}
                        </p>
                        <p style={{ color: "#aaaaaa", margin: "0" }}>
                            {moment(videoItem.fecha).locale("es").fromNow()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PerfilParametros;
