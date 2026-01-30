"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Video } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface PreviewImage {
  id: string;
  url: string;
  file?: File;
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
  const [ailment, setAilment] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [dosage, setDosage] = useState("");
  const [precautions, setPrecautions] = useState<string[]>([""]);
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [oldPrice, setOldPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<number>(0);
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [video, setVideo] = useState<{ url: string; file?: File } | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

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

  // Image Handling - FIXED
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    console.log('📷 Files selected:', files.length);
    
    const newPreviews: PreviewImage[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      
      newPreviews.push({
        id: `${Date.now()}_${i}`,
        url: url,
        file: file,
      });
      
      console.log('🖼️ Created preview:', url);
    }
    
    setImages(prev => [...prev, ...newPreviews]);
    toast.success(`${files.length} image(s) added`);
    
    // Reset input
    e.target.value = '';
  };

  const handleRemoveImage = (imgId: string) => {
    setImages((prev) => {
      const imgToRemove = prev.find((i) => i.id === imgId);
      if (imgToRemove?.url) {
        URL.revokeObjectURL(imgToRemove.url);
      }
      return prev.filter((i) => i.id !== imgId);
    });
    toast.success('Image removed');
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
    toast.success('Video added');
  };

  const handleRemoveVideo = () => {
    if (video?.url) URL.revokeObjectURL(video.url);
    setVideo(null);
    toast.success('Video removed');
  };

  // Upload Functions
  const uploadImages = async (remedyId: string): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    const newFiles = images.filter((i) => i.file).map((i) => i.file!);
    
    if (!newFiles.length) return uploadedUrls;

    console.log(`📤 Uploading ${newFiles.length} images`);

    const formData = new FormData();
    newFiles.forEach((file) => formData.append("files", file));
    formData.append("type", "remedy");
    formData.append("remedyId", remedyId);

    const res = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    
    if (res.ok && (data.urls?.length || data.url)) {
      if (data.urls?.length) uploadedUrls.push(...data.urls);
      else if (data.url) uploadedUrls.push(data.url);
      console.log('✅ Images uploaded:', uploadedUrls);
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
    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }
    
    if (!ailment.trim()) {
      toast.error("Please enter what this remedy treats");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    if (!dosage.trim()) {
      toast.error("Please enter dosage instructions");
      return;
    }
    
    if (!duration.trim()) {
      toast.error("Please enter duration");
      return;
    }
    
    if (price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    if (stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }
    
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      console.log('🚀 Creating remedy...');
      
      // Create remedy
      const res = await fetch("/api/remedies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        toast.error(data.error || "Failed to create remedy");
        setLoading(false);
        return;
      }

      const remedyId = data.id;
      if (!remedyId) {
        toast.error("Remedy created but ID missing");
        setLoading(false);
        return;
      }

      console.log('✅ Remedy created:', remedyId);

      // Upload images
      const uploadedImageUrls = await uploadImages(remedyId);
      if (!uploadedImageUrls.length) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }

      // Upload video
      let videoUrl = null;
      if (video?.file) {
        videoUrl = await uploadVideo(remedyId);
      }

      // Update with media
      const updateRes = await fetch(`/api/remedies/${remedyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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

      if (!updateRes.ok) {
        toast.error("Remedy created but update failed");
        setLoading(false);
        return;
      }

      toast.success("Remedy created successfully!");
      setTimeout(() => router.push("/admin/remedies"), 1500);
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Create Remedy
        </h2>

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g., Natural Turmeric Face Pack"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Ailment */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Treats/Helps With <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={ailment}
            onChange={(e) => setAilment(e.target.value)}
            placeholder="E.g., Acne, Dark Spots"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
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
          <label className="block text-gray-700 font-medium mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            rows={4}
            disabled={loading}
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Ingredients <span className="text-red-500">*</span>
          </label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="E.g., 1 tbsp turmeric"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              />
              {ingredients.length > 1 && (
                <button
                  onClick={() => handleIngredientRemove(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Instructions <span className="text-red-500">*</span>
          </label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
                rows={2}
              />
              {instructions.length > 1 && (
                <button
                  onClick={() => handleInstructionRemove(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dosage */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Dosage <span className="text-red-500">*</span>
          </label>
          <textarea
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="How to use"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            rows={3}
            disabled={loading}
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Duration <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="E.g., 2-3 weeks"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              disabled={loading}
            />
          </div>
        </div>

        {/* Precautions */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Precautions (optional)
          </label>
          {precautions.map((precaution, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={precaution}
                onChange={(e) => handlePrecautionChange(index, e.target.value)}
                placeholder="E.g., Do patch test"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400"
              />
              {precautions.length > 1 && (
                <button
                  onClick={() => handlePrecautionRemove(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Images - FIXED */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Images <span className="text-red-500">*</span>
            <span className="text-sm text-gray-500 ml-2">({images.length} uploaded)</span>
          </label>
          
          <div className="flex flex-wrap gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative w-32 h-32">
                <Image
                  src={img.url}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(img.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                  disabled={loading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <label className="w-32 h-32 border-2 border-dashed border-amber-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50 transition">
              <Plus className="w-8 h-8 text-amber-500 mb-1" />
              <span className="text-sm text-amber-600 font-medium">Upload</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>
        </div>

        {/* Video */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Video (optional)
          </label>
          
          {video ? (
            <div className="relative w-full max-w-md">
              <video src={video.url} controls className="w-full rounded-lg" />
              <button
                onClick={handleRemoveVideo}
                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center"
                disabled={loading || uploadingVideo}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-amber-400">
              <Video className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Upload Video</span>
              <input
                type="file"
                accept="video/mp4,video/webm,video/ogg"
                onChange={handleVideoChange}
                className="hidden"
                disabled={loading}
              />
            </label>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            onClick={() => router.push("/admin/remedies")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            disabled={loading || uploadingVideo}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
            disabled={loading || uploadingVideo}
          >
            {loading || uploadingVideo ? "Saving..." : "Create Remedy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemedyForm;