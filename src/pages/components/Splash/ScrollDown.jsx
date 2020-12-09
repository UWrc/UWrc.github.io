import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { motion } from "framer-motion"
import styles from "./styles.module.css"

export default function ScrollDown() {
  return <motion.div
    animate={{ y: [0, 20, 0], opacity: [1, 0.2, 1] }}
    transition={{ duration: 2, loop: Infinity }}
  >
    <FontAwesomeIcon className={styles.scrollDown} icon={faAngleDown} onClick={() => {
      window.scroll({
        top: document.body.clientHeight,
        behavior: 'smooth'
      })
    }} />
  </motion.div>
}
