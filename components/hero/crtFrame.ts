// Measured glass well for public/images/crt-frame.png.
// Percentages are of the image box — keep the frame at this aspect ratio so
// the well stays registered to the bezel. Recompute if the photo is replaced.

export const CRT_FRAME = {
  src: "/images/crt-frame.png",
  width: 1103,
  height: 1022,
  well: {
    left: "10.6613%",
    top: "13.7385%",
    width: "77.7417%",
    height: "60.5802%",
  },
} as const;
