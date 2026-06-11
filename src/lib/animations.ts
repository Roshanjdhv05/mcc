export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export const slideUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const cardHover = {
  rest: { scale: 1, boxShadow: "0px 4px 20px rgba(0,0,0,0.05)" },
  hover: { scale: 1.02, boxShadow: "0px 10px 30px rgba(18, 59, 109, 0.1)" }
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05 }
};
