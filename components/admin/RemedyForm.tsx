"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Video } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface PreviewImage {
  id: string;
  url: string;
  file?: File;
  serverId?: string;
}

interface RemedyFormProps {
  id?: string;
  mode?: "create" | "update";
  remedy?: any;
}

const RemedyForm = ({ id, mode = "create", remedy }: RemedyFormProps) => {
  const router = useRouter();
  
  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ailment, setAilment] = useState(""); // Main ailment/problem
  const [ingredients, setIngredients] = useState<string[]>([""]); // List of ingredients
  const [instructions, setInstructions] = useState<string[]>([""]); // Step-by-step instructions
  const [dosage, setDosage] = useState(""); // How to use/dosage
  const [precautions, setPrecautions] = useState<string[]>([""]); // Safety precautions
  const [duration, setDuration] = useState(""); // How long to use
  const [category, setCategory] = useState(""); // Type of remedy
  const [price, setPrice] = useState<number>(0); // Product price
  const [oldPrice, setOldPrice] = useState<number | null>(null); // Original price (for sale)
  const [stock, setStock] = useState<number>(0); // Available stock
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [video, setVideo] = useState<{ url: string; file?: File; serverId?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // ✅ Updated remedy categories matching your remedies page
  const remedyCategories = [
    { value: 'wealth', label: 'Wealth' },
    { value: 'health', label: 'Health' },
    { value: 'relationship', label: 'Relationship' },
    { value: 'protection', label: 'Protection' },
    { value: 'self-confidence', label: 'Self-Confidence' },
    { value: 'education', label: 'Education' },
    { value: 'crown-chakra', label: 'Crown Chakra' },
    { value: 'third-eye-chakra', label: 'Third Eye Chakra' },
    { value: 'throat-chakra', label: 'Throat Chakra' },
    { value: 'heart-chakra', label: 'Heart Chakra' },
    { value: 'solar-plexus-chakra', label: 'Solar Plexus Chakra' },
    { value: 'sacral-chakra', label: 'Sacral Chakra' },
    { value: 'root-chakra', label: 'Root Chakra' },
  ];

  const isUpdateMode = mode === "update" && !!id;

  const showMessage = (text: string, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 5000);
  };

  // Handle Ingredients
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
    if (index === ingredients.length - 1 && value.trim() !== "") {
      setIngredients([...newIngredients, ""]);
    }
  };

  const handleIngredientRemove = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients.length ? newIngredients : [""]);
  };

  // Handle Instructions
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
    if (index === instructions.length - 1 && value.trim() !== "") {
      setInstructions([...newInstructions, ""]);
    }
  };

  const handleInstructionRemove = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions.length ? newInstructions : [""]);
  };

  // Handle Precautions
  const handlePrecautionChange = (index: number, value: string) => {
    const newPrecautions = [...precautions];
    newPrecautions[index] = value;
    setPrecautions(newPrecautions);
    if (index === precautions.length - 1 && value.trim() !== "") {
      setPrecautions([...newPrecautions, ""]);
    }
  };

  const handlePrecautionRemove = (index: number) => {
    const newPrecautions = precautions.filter((_, i) => i !== index);
    setPrecautions(newPrecautions.length ? newPrecautions : [""]);
  };

  // Image Handling
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    const newPreviews: PreviewImage[] = filesArray.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      file,
    }));
    setImages((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (imgId: string) => {
    setImages((prev) => {
      const imgToRemove = prev.find((i) => i.id === imgId);
      if (imgToRemove?.file) URL.revokeObjectURL(imgToRemove.url);
      return prev.filter((i) => i.id !== imgId);
    });
  };

  // Video Handling
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid video file (MP4, WebM, or OGG)");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("Video file size should be less than 50MB");
      return;
    }

    setVideo({
      url: URL.createObjectURL(file),
      file,
    });
  };

  const handleRemoveVideo = () => {
    if (video?.file) URL.revokeObjectURL(video.url);
    setVideo(null);
  };

  // Upload Functions
  const uploadImages = async (remedyId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    const newFiles = images.filter((i) => i.file).map((i) => i.file as File);
    if (!newFiles.length) return uploadedUrls;

    const formData = new FormData();
    newFiles.forEach((file) => formData.append("files", file));
    formData.append("type", "remedy");
    formData.append("remedyId", remedyId);

    const res = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok && (data.urls?.length || data.url)) {
      if (data.urls?.length) uploadedUrls.push(...data.urls);
      else if (data.url) uploadedUrls.push(data.url);
    } else {
      throw new Error(data.error || "Image upload failed");
    }

    return uploadedUrls;
  };

  const uploadVideo = async (remedyId: string): Promise<string | null> => {
    if (!video?.file) return null;

    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append("files", video.file);
      formData.append("type", "video");
      formData.append("remedyId", remedyId);

      const res = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok && (data.urls?.[0] || data.url)) {
        return data.urls?.[0] || data.url;
      } else {
        throw new Error(data.error || "Video upload failed");
      }
    } finally {
      setUploadingVideo(false);
    }
  };

  // Submit Handler
  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !ailment ||
      !category ||
      !dosage ||
      !duration ||
      price <= 0 ||
      stock < 0 ||
      images.length === 0
    ) {
      showMessage(
        "Please fill all required fields, set a valid price, stock quantity, and upload at least one image",
        true
      );
      return;
    }

    setLoading(true);
    try {
      // Create remedy first
      const res = await fetch("/api/remedies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          ailment,
          ingredients: ingredients.filter((i) => i.trim() !== ""),
          instructions: instructions.filter((i) => i.trim() !== ""),
          dosage,
          precautions: precautions.filter((i) => i.trim() !== ""),
          duration,
          category,
          price,
          oldPrice,
          stock,
          images: [],
          video: null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        showMessage(data.error || "Remedy creation failed", true);
        setLoading(false);
        return;
      }

      const remedyId = data.id || data.remedyId || data.remedy?.id;
      if (!remedyId) {
        showMessage("Remedy created but ID missing. Please refresh.", true);
        setLoading(false);
        return;
      }

      // Upload images
      const uploadedImageUrls = await uploadImages(remedyId);
      if (!uploadedImageUrls.length) {
        showMessage("Image upload failed. Please try again.", true);
        setLoading(false);
        return;
      }

      // Upload video if exists
      let videoUrl = null;
      if (video?.file) {
        videoUrl = await uploadVideo(remedyId);
      }

      // Update with images and video
      const updateRes = await fetch(`/api/remedies/${remedyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          ailment,
          ingredients: ingredients.filter((i) => i.trim() !== ""),
          instructions: instructions.filter((i) => i.trim() !== ""),
          dosage,
          precautions: precautions.filter((i) => i.trim() !== ""),
          duration,
          category,
          price,
          oldPrice,
          stock,
          images: uploadedImageUrls,
          video: videoUrl,
        }),
      });

      const updateData = await updateRes.json();
      if (!updateRes.ok) {
        showMessage("Remedy created but update failed", true);
        setLoading(false);
        return;
      }

      showMessage("Remedy created successfully!");
      setTimeout(() => router.push("/admin/orders"), 1000);
    } catch (err) {
      console.error("❌ Error:", err);
      showMessage("Something went wrong. Please try again.", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-8">
      <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          {isUpdateMode ? `Update Remedy: ${title}` : "Create Remedy"}
        </h2>

        {message && (
          <div
            className={`p-3 sm:p-4 rounded-lg text-sm sm:text-base ${
              message.isError
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Remedy Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g., Natural Turmeric Face Pack"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* Ailment/Problem */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Treats/Helps With <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={ailment}
            onChange={(e) => setAilment(e.target.value)}
            placeholder="E.g., Acne, Dark Spots, Glowing Skin"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          >
            <option value="">Select Category</option>
            {remedyCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the remedy and its benefits"
            className="w-full outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            rows={4}
            disabled={loading}
          />
        </div>

        {/* Ingredients */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Ingredients <span className="text-red-500">*</span>
          </label>
          {ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3"
            >
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="E.g., 1 tablespoon turmeric powder"
                className="flex-1 outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              />
              {ingredients.length > 1 && (
                <button
                  onClick={() => handleIngredientRemove(index)}
                  className="text-red-500 font-bold px-3 py-2 text-sm sm:text-base border rounded-lg hover:bg-red-200 whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Step-by-Step Instructions <span className="text-red-500">*</span>
          </label>
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3"
            >
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Step ${index + 1}: Mix ingredients...`}
                className="flex-1 outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                rows={2}
              />
              {instructions.length > 1 && (
                <button
                  onClick={() => handleInstructionRemove(index)}
                  className="text-red-500 font-bold px-3 py-2 text-sm sm:text-base border rounded-lg hover:bg-red-200 whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dosage/Usage */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            How to Use / Dosage <span className="text-red-500">*</span>
          </label>
          <textarea
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="E.g., Apply twice daily, leave for 15 minutes"
            className="w-full outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            rows={3}
            disabled={loading}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Duration <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="E.g., Use for 2-3 weeks for best results"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              placeholder="E.g., 299"
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
              Old Price (₹) <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={oldPrice || ""}
              onChange={(e) => setOldPrice(e.target.value ? parseInt(e.target.value) : null)}
              placeholder="E.g., 399"
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              disabled={loading}
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
            Stock Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value) || 0)}
            placeholder="E.g., 50"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Number of items available for sale
          </p>
        </div>

        {/* Precautions */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Precautions <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          {precautions.map((precaution, index) => (
            <div
              key={index}
              className="rounded-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3"
            >
              <input
                type="text"
                value={precaution}
                onChange={(e) => handlePrecautionChange(index, e.target.value)}
                placeholder="E.g., Do a patch test first"
                className="flex-1 outline-none p-2.5 sm:p-3 text-sm sm:text-base text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
              />
              {precautions.length > 1 && (
                <button
                  onClick={() => handlePrecautionRemove(index)}
                  className="text-red-500 font-bold px-3 py-2 text-sm sm:text-base border rounded-lg hover:bg-red-200 whitespace-nowrap"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Images <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {images.map((imgObj) => (
              <div
                key={imgObj.id}
                className="relative w-24 h-24 sm:w-32 sm:h-32"
              >
                <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={imgObj.url}
                    alt="Preview"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <button
                  type="button"
                  className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
                  onClick={() => handleRemoveImage(imgObj.id)}
                  disabled={loading}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <label
              className={`w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${
                loading
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 hover:border-amber-400"
              }`}
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mb-1" />
              <span className="text-gray-400 text-xs sm:text-sm">Upload</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={loading}
              />
            </label>
          </div>
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Demonstration Video <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          
          {video ? (
            <div className="relative w-full max-w-md">
              <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-black">
                <video
                  src={video.url}
                  controls
                  className="w-full h-48 object-contain"
                />
              </div>
              <button
                type="button"
                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
                onClick={handleRemoveVideo}
                disabled={loading || uploadingVideo}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label
              className={`w-full max-w-md h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${
                loading
                  ? "border-gray-200 text-gray-400"
                  : "border-gray-300 hover:border-amber-400"
              }`}
            >
              <Video className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-400 text-sm">Upload Video</span>
              <span className="text-gray-400 text-xs mt-1">MP4, WebM, OGG (Max 50MB)</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                className="hidden"
                onChange={handleVideoChange}
                disabled={loading}
              />
            </label>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-2 sm:pt-4">
          <button
            type="button"
            onClick={() => router.push("/admin/orders")}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            disabled={loading || uploadingVideo}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition disabled:opacity-50"
            disabled={loading || uploadingVideo}
          >
            {loading || uploadingVideo
              ? uploadingVideo
                ? "Uploading Video..."
                : "Saving..."
              : "Create Remedy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemedyForm;