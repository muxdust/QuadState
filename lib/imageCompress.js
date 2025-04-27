import imageCompression from "browser-image-compression";

const imageCompressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  initialQuality: 0.8,
  fileType: "image/webp",
};

const imageCompress = async (file) => {
  try {
    const compressedFile = await imageCompression(
      file,
      imageCompressionOptions
    );
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error("Image compression failed");
  }
};

export default imageCompress;
