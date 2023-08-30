import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { VideoYoutube } from "./listaVideos";
import moment from "moment";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

interface VideosParametrosProps {
    videos: VideoYoutube[];
}

const VideosParametros = (props: VideosParametrosProps) => {
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
        <div className="listaVideos">
            {videos.map((videoItem) => (
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
                                {moment(videoItem.fecha).locale("es").fromNow()}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VideosParametros;
