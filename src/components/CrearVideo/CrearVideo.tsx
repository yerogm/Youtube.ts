import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";
import "./styles.scss";
import moment from "moment";

export interface listaVideo {
    id: string;
    name: string;
    ImgUsuario: string;
    description: string;
    Video: string;
    ImgPortada: string;
    fecha: string;
    likes: number;
    disLikes: number;
    categoria: string;
}

const CrearVideo = () => {
    const [newVideo, setNewVideo] = useState<listaVideo>({
        name: "",
        ImgUsuario: "",
        description: "",
        Video: "",
        ImgPortada: "",
        fecha: moment().format(),
        id: "",
        likes: 0,
        disLikes: 0,
        categoria: "",
    });
    const youtubeCollection = collection(db, "listaVideos");

    const [video, setVideo] = useState<listaVideo[]>([]);
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

    const crearVideo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Corrige esta línea

        try {
            await addDoc(youtubeCollection, newVideo);
            console.log("Video agregado correctamente a Firebase");
        } catch (error) {
            console.error("Error al agregar el video a Firebase: ", error);
        }
        obtenerYoutube();
    };

    
    return (
        <div className="contenedorFormulario">
            <div>
                <div>
                    <p style={{ padding: "10px", fontSize: "20px" }}>
                        Subir Videos
                    </p>
                </div>
                <div
                    style={{
                        borderBottom: "rgb(84, 84, 84) 1px solid",
                        marginTop: "10px",
                    }}
                />
                <input
                    type="text"
                    placeholder="Escribe la url del video"
                    className="inputFormulario"
                    onChange={(e) => {
                        setNewVideo({ ...newVideo, Video: e.target.value });
                    }}
                />
                <input
                    type="text"
                    placeholder="Escribe la URL de la imagen de portada"
                    className="inputFormulario"
                    onChange={(e) => {
                        setNewVideo({
                            ...newVideo,
                            ImgPortada: e.target.value,
                        });
                    }}
                />
                <input
                    type="text"
                    placeholder="Escribe la descripcion de tu video"
                    className="inputFormulario"
                    onChange={(e) => {
                        setNewVideo({
                            ...newVideo,
                            description: e.target.value,
                        });
                    }}
                />
                <input
                    type="text"
                    placeholder="Escribe la categoria de tu video"
                    className="inputFormulario"
                    onChange={(e) => {
                        setNewVideo({
                            ...newVideo,
                            categoria: e.target.value,
                        });
                    }}
                />
                <p style={{ padding: "10px", fontSize: "20px" }}>
                    Crear Usuario
                </p>
                <div
                    style={{
                        borderBottom: "rgb(84, 84, 84) 1px solid",
                        marginTop: "10px",
                    }}
                />
                <input
                    type="text"
                    placeholder="Escribe el nombre del usuario"
                    className="inputFormulario"
                    onChange={(e) => {
                        setNewVideo({ ...newVideo, name: e.target.value });
                    }}
                />
                <input
                    type="text"
                    placeholder="Escribe la URL de la img del usuario"
                    className="inputFormulario"
                    onChange={(e) => {
                        setNewVideo({
                            ...newVideo,
                            ImgUsuario: e.target.value,
                        });
                    }}
                />
            </div>
            <form onSubmit={crearVideo}>
                <button className="btn-crear">Crear</button>
            </form>
        </div>
    );
};

export default CrearVideo;
