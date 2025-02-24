import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: " ",
    date: "",
    mode: "",
    poster: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = async () => {
    if (files) {
      setUploading(true);
      setImageUploadError(false);

      const posterUrl = await storeImage(files[0]);
      setFormData({
        ...formData,
        poster: posterUrl,
      });
      setImageUploadError(false);
      setUploading(false);
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      poster: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.poster === "") return setError("You must upload at least one image");

      setLoading(true);
      setError(false);
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/event/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/event/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Event</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input type="text" placeholder="Title" className="border p-3 rounded-lg" id="title" maxLength="62" minLength="10" required onChange={handleChange} value={formData.title} />
          <textarea type="text" placeholder="Description" className="border p-3 rounded-lg" id="description" required onChange={handleChange} value={formData.description} />

          <input type="date" className="border p-3 rounded-lg" id="date" required onChange={handleChange} value={formData.date} />
          <input type="text" placeholder="Mode" className="border p-3 rounded-lg" id="mode" required onChange={handleChange} value={formData.mode} />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Poster:</p>
          <div className="flex gap-4">
            <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full" type="file" id="poster" accept="image/*" />
            <button type="button" disabled={uploading} onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
          {formData.poster && (
            <div className="flex justify-between p-3 border items-center">
              <img src={formData.poster} alt="event image" className="w-20 h-20 object-contain rounded-lg" />
              <button type="button" onClick={() => handleRemoveImage()} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">
                Delete
              </button>
            </div>
          )}
          <button disabled={loading || uploading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {loading ? "Creating..." : "Create Event"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
