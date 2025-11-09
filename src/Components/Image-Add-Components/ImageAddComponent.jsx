import './imageAdd.css';
import { RiFolderImageLine } from "react-icons/ri";
import useFile from "../../Hooks/UseFile";
import { useEffect } from "react";

export default function ImageUploader({ canUpload, onFileReady }) {

  
  const {
    image,
    previewUrl,
    uploaded,
    loading,
    handleFileChange,
  } = useFile();

  useEffect(() => {
  if (onFileReady && image && previewUrl) {
    onFileReady({ file: image, previewUrl });
  }
}, [image, previewUrl, onFileReady]);

  return (
    <div className="add-image-container">
      <div className="add-image-title">
        <span>Agregar imagen</span>
      </div>

      <div className="add-image-buttons">
        <input
          id="fileInput"
          className="add-image-input-file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <label htmlFor="fileInput" className="file-label">
          <RiFolderImageLine size={20} />
          <span>{image ? "Cambiar imagen" : "Seleccionar"}</span>
        </label>

        {previewUrl && (
          <img className="preview-image" src={previewUrl} alt="Vista previa" />
        )}
      </div>
    </div>
  );
}
