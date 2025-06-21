"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

interface AnimatedSlugProps {
  texts: string[];
  separator?: string;
}

const TYPING_SPEED = 100;
const PAUSE_BETWEEN = 800;
const PAUSE_AFTER_SEPARATOR = 300;
const PAUSE_END = 1000;
const DELETING_SPEED = 80;
const PAUSE_BEFORE_RESTART = 600;

export const AnimatedSlug = ({
  texts,
  separator = "",
}: AnimatedSlugProps): ReactNode => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (texts.length === 0) {
      return;
    }

    const sequence = async () => {
      while (true) {
        let currentText = "";

        for (let i = 0; i < texts.length; i++) {
          const text = texts[i];

          if (text) {
            for (const char of text) {
              currentText += char;
              setDisplayedText(currentText);
              await new Promise((r) => setTimeout(r, TYPING_SPEED));
            }
          }

          await new Promise((r) => setTimeout(r, PAUSE_BETWEEN));

          if (i < texts.length - 1 && separator) {
            currentText += separator;
            setDisplayedText(currentText);
            await new Promise((r) => setTimeout(r, PAUSE_AFTER_SEPARATOR));
          }
        }

        await new Promise((r) => setTimeout(r, PAUSE_END));

        while (currentText.length > 0) {
          currentText = currentText.slice(0, -1);
          setDisplayedText(currentText);
          await new Promise((r) => setTimeout(r, DELETING_SPEED));
        }

        // Pause avant de recommencer
        await new Promise((r) => setTimeout(r, PAUSE_BEFORE_RESTART));
      }
    };

    void sequence();
  }, [texts, separator]);

  const cursorVariants: Variants = {
    blinking: {
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
        times: [0, 0.5, 0.5, 1],
      },
    },
  };

  if (texts.length === 0) {
    return null;
  }

  return (
    <motion.div className="inline-flex min-h-10 items-center">
      <span
        role="log"
        aria-live="assertive"
        aria-label={texts.join(separator)}
        className="inline-flex overflow-hidden"
      >
        {displayedText}
      </span>
      {displayedText && (
        <motion.span
          variants={cursorVariants}
          animate="blinking"
          className="ml-0.5 h-5 w-0.5 bg-foreground"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};
