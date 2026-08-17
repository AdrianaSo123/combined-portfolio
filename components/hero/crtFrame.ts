// Measured glass well for public/images/crt-frame.png (1536×1024).
// Percentages are of the image box — keep the frame at this aspect ratio so
// the well stays registered to the bezel. Recompute if the photo is replaced.

export const CRT_FRAME = {
  src: "/images/crt-frame.png",
  width: 1536,
  height: 1024,
  well: {
    left: "20.9886%",
    top: "11.132%",
    width: "56.5875%",
    height: "62.6785%",
  },
} as const;
