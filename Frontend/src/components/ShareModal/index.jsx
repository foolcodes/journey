import { useState, useRef } from "react";
import { X, Camera, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

const ShareModal = ({
  onClose,
  challengeData,
  presentDay,
  userProfile,
  hours,
}) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const screenshotRef = useRef(null);

  // Get the current day's data
  const currentDayData =
    challengeData?.find((day) => day.day === presentDay) || {};

  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const captureScreenshot = async () => {
    if (!screenshotRef.current) return;

    try {
      setIsCapturing(true);
      // Use legacy colors to avoid oklch and other modern color functions
      const canvas = await html2canvas(screenshotRef.current, {
        useCORS: true,
        backgroundColor: "#111827", // Using hex instead of modern color formats
        logging: false,
        // Force rgba colors for all elements
        onclone: (documentClone) => {
          const elements = documentClone.querySelectorAll("*");
          elements.forEach((el) => {
            // Replace any potential modern color formats in styles
            if (el.style) {
              // Force background colors to be hex/rgba
              if (
                el.style.backgroundColor &&
                el.style.backgroundColor.includes("oklch")
              ) {
                el.style.backgroundColor = "#111827";
              }
              // Force text colors to be hex/rgba
              if (el.style.color && el.style.color.includes("oklch")) {
                el.style.color = "#ffffff";
              }
            }
          });
        },
      });

      const imageUrl = canvas.toDataURL("image/png");
      setScreenshotUrl(imageUrl);
      toast.success("Screenshot captured successfully!");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      toast.error("Failed to capture screenshot");
    } finally {
      setIsCapturing(false);
    }
  };

  const downloadScreenshot = () => {
    if (!screenshotUrl) return;

    const link = document.createElement("a");
    link.download = `day-${presentDay}-progress.png`;
    link.href = screenshotUrl;
    link.click();
  };

  const shareScreenshot = async () => {
    if (!screenshotUrl) {
      toast.error("Please capture a screenshot first");
      return;
    }

    // Convert base64 to Blob + File
    const file = await fetch(screenshotUrl)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new File([blob], `day-${presentDay}-progress.png`, {
            type: "image/png",
          })
      );

    // Try Web Share API
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "My Coding Progress 🚀",
          text: `Check out my progress on Day ${presentDay} of my challenge!`,
          files: [file],
        });
        toast.success("Shared successfully!");
      } catch (err) {
        toast.error("Sharing canceled or failed.");
        // Fallback to download if sharing fails
        downloadScreenshot();
      }
    } else {
      // Fallback to download for browsers that don't support Web Share API
      downloadScreenshot();
      toast.info("Image downloaded. You can now share it manually.", {
        icon: "⬇️",
      });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 h-[80vh] overflow-auto custom-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white">
              Share Your Progress
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={20} color="white" />
            </button>
          </div>

          {/* Preview Content */}
          <div className="mb-4">
            <div
              ref={screenshotRef}
              className="bg-gray-900 rounded-lg p-6 overflow-hidden"
              style={{ backgroundColor: "#111827" }}
            >
              {/* Header with Profile */}
              <div className="flex items-center mb-6">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden bg-blue-800 flex items-center justify-center"
                  style={{ backgroundColor: "#3730a3" }}
                >
                  {userProfile?.profilePicture ? (
                    <img
                      src={userProfile.profilePicture}
                      alt={userProfile.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white">
                      {(userProfile?.name || "U").charAt(0)}
                    </span>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">
                    {userProfile?.name || "User's"} Progress
                  </h3>
                  <p className="text-gray-400" style={{ color: "#9ca3af" }}>
                    Day {presentDay} • {formatDate(new Date())}
                  </p>
                </div>
              </div>

              {/* Day Stats */}
              <div
                className="bg-gray-800 rounded-lg p-4 mb-6"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h4
                  className="text-blue-400 font-medium mb-2"
                  style={{ color: "#60a5fa" }}
                >
                  Day {presentDay} Summary
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p
                      className="text-gray-400 text-sm"
                      style={{ color: "#9ca3af" }}
                    >
                      Hours Today:
                    </p>
                    <p className="text-white text-xl font-semibold">
                      {hours || 0} hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Day Notes */}
              <div
                className="bg-gray-800 rounded-lg p-4"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h4
                  className="text-blue-400 font-medium mb-2"
                  style={{ color: "#60a5fa" }}
                >
                  Today's Learnings
                </h4>
                <p className="text-white" style={{ whiteSpace: "pre-line" }}>
                  {currentDayData.notes || "No notes for today."}
                </p>
              </div>

              {/* Watermark */}
              <div
                className="mt-4 text-center text-gray-500 text-sm"
                style={{ color: "#6b7280" }}
              >
                Tracked with Journey • {formatDate(new Date())}
              </div>
            </div>

            {/* Actions buttons */}
            {!screenshotUrl ? (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={captureScreenshot}
                  disabled={isCapturing}
                  className="px-4 py-2 rounded-md flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  style={{
                    backgroundColor: isCapturing ? "#2563eb" : "#3b82f6",
                  }}
                >
                  <Camera size={16} />
                  {isCapturing ? "Capturing..." : "Capture to Share"}
                </button>
              </div>
            ) : (
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={downloadScreenshot}
                  className="px-4 py-2 rounded-md flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  style={{ backgroundColor: "#374151" }}
                >
                  <Download size={16} />
                  Download
                </button>
                <button
                  onClick={shareScreenshot}
                  className="px-4 py-2 rounded-md flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  style={{ backgroundColor: "#3b82f6" }}
                >
                  <Camera size={16} />
                  Share
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShareModal;
