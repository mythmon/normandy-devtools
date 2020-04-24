import React from "react";

interface Props {
  color0?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  outline?: boolean;
}

export default function Logo({
  color0 = "#ffea00",
  color1 = "#5ec3b6",
  color2 = "#fff",
  color3 = "#e33834",
  outline = false,
}: Props): JSX.Element {
  let [fill0, fill1, fill2, fill3] = [color0, color1, color2, color3];
  if (outline) {
    [fill0, fill1, fill2, fill3] = [
      "transparent",
      "transparent",
      "transparent",
      "transparent",
    ];
  }

  const styles = {
    st0: { fill: fill0 },
    st1: { fill: fill1 },
    st2: { fill: fill2 },
    st3: { fill: fill3 },
  };

  return (
    <svg viewBox="0 0 256 256">
      <path
        d="M26.48 39.71c-1.52-.23-2.34-1.17-2.34-1.17l-10.07-13.7s-1.58 4.1.35 13.23 5.33 11.57 8.9 13.58c3.1 1.76 5.91 2.63 14.29.82 9.46-2.05 15.81-8.9 18.97-14.17s3.44-11.96 1.41-16.75C54 12.19 47.21 10.14 44.75 8.91c-2.46-1.23-7.96 0-7.96 0s6.15 10.36 7.73 12.3c1.58 1.93 1.41 4.22 1.41 5.39 0 1.07-1.99 3.28-6.91 7.49s-11.1 5.84-12.54 5.62zM59.59 79.78c-2.13-6.81-3.86-12.94-4.35-16.36-.81-5.61-.88-12.3-.88-12.3s-3.34 2.99-9.66 5.8c-4.16 1.85-10.01 2.46-10.01 2.46s5.58 8.88 9.13 16.34c.44.93.91 1.97 1.4 3.1 2.16-.21 4.13-.35 5.69-.41 2.67-.1 5.65.6 8.68 1.37z"
        style={styles.st0}
      />
      <path d="M248.1 156.39c-3.04-2.81-10.3-5.85-10.3-5.85l2.81-2.34-7.96-2.11s4.45-2.58 5.39-3.98c.94-1.41 1.64-4.92 1.64-4.92s-3.04 1.87-5.15 2.11c-2.11.23-5.62.23-5.62.23s4.45-5.62 7.96-6.09c3.51-.47 8.2-.94 8.2-.94s-1.87-3.98-6.32-3.51-12.18.94-12.18.94l4.92-5.39s-5.39 0-6.56-.23-3.98-1.41-3.98-1.41 5.39-2.11 7.96-3.51c2.58-1.41 10.07-7.26 10.07-7.26s-5.85-.23-6.79-.23h-3.51s3.28-3.75 4.22-4.68c.94-.94 3.51-3.28 3.51-3.28l-16.86 1.17 7.73-9.13-12.65 1.17s6.32-3.28 8.43-5.62c2.11-2.34 4.92-6.79 4.92-6.79s-7.96 3.98-12.18 4.68c-4.22.7-21.78.94-21.78.94s3.28-2.58 5.62-2.81c2.34-.23 8.43 0 8.43 0s-5.15-5.62-11.48-5.39c-6.32.23-20.38 6.32-27.17 7.96-6.79 1.64-22.01 3.51-33.72-1.64C123.97 83.32 112.73 77 104.3 77s-26.46 3.51-32.79 4.45c-.98.14-2 .16-3.04.09-3.05-9.5-5.83-18.64-6.17-21.45-.77-6.25-.55-12.49 3-22.67 2.65-7.59 1.79-14.29-2.77-21.71C57.77 7.97 50.76 2.55 43.29.82c-8.3-1.91-15.37 1.92-15.66 2.08l-1.89 1.05L37.4 23.74c-.75.96-2.2 2.58-4.66 4.53-1.76 1.39-3.45 2.4-4.62 3.03L13.29 8.36l-1.83 1.59c-.21.18-5.04 4.45-6.09 11.1-.36 2.29-.59 6.8-.06 11.99.43 4.18 1.5 10.07 4.22 14.4 4.01 6.38 9.59 9.82 12.55 11.3 2.14 1.07 5.48 4.11 7.76 8.26 1.14 2.07 3.69 7.3 6.34 12.95-4.03.64-7.78 1.41-10.06 2.25-4.06 1.49-6.67 4.57-6.67 4.57-7.96 9.6-5.26 17.55-2.63 22.54 1.76 3.34 4.57 5.74 4.57 5.74s-3.42 1.17-5.09 6.85c-1.67 5.66-.62 11.05.18 15.28.3 1.61 1.93 2.28 1.93 2.28s-1.34 8.59-.35 16.51c.7 5.62 2.17 7.9 4.27 6.26 2.11-1.64 1.87-6.09 2.34-7.03.47-.94 1.64-3.04 1.64-3.04s1.17 10.07 4.45 14.52c3.28 4.45 8.67 8.67 8.67 8.67s.23 7.49 5.15 14.05c4.92 6.56 13.35 10.3 19.2 10.54 2.24.09 6.49.72 11.98 1.22.09.44.16.85.22 1.22.68 4.3 2.08 16.35 2.08 26.14 0 10.99 4.52 24.02 14.45 26.63 2.14.56 4.45.84 6.82.84 2.95 0 5.98-.44 8.83-1.3 5.66-1.72 9.95-4.94 12.06-9.04 4.59-8.91 5.05-16.67 1.4-23.71-1.62-3.13-6.55-13.05-11.36-22.77 18.84-4.66 28.84-11.02 35.25-14.91 6.56-3.98 9.6-6.79 16.16-7.26 6.56-.47 24.83-.94 32.09.47s14.52 2.81 14.52 2.81-3.28-4.92-4.45-6.32c-1.17-1.41-3.04-3.75-3.04-3.75s8.9 3.51 12.65 5.15c3.75 1.64 7.26 1.64 10.3.94 3.04-.7 4.45-1.87 4.45-1.87l-6.56-3.51s9.37 1.17 12.65 0c3.28-1.17 5.39-5.15 5.39-5.15s-5.62 0-7.49-.47-6.32-3.28-6.32-3.28 5.39-.23 7.26-.7 4.68-2.81 8.2-2.58c3.51.23 8.9 2.81 8.9 2.81s.92-2.35-2.12-5.16zm-17.98-15.22l-6.32 6.32-2.28-3.34s3.69-1.41 4.74-2.11c1.05-.69 3.86-.87 3.86-.87zm-3.51-14.75s-2.99 3.69-4.74 4.57-4.92 2.28-4.92 2.28 2.11 1.58 2.99 1.58 3.86-.53 3.86-.53l-4.04 5.09s-5.97-1.93-7.38-1.93-7.55-1.58-7.55-1.58 6.32-1.93 7.2-3.16c.88-1.23 4.39-5.27 4.39-5.27l10.19-1.05zm-1.58-17.04l-8.78 8.43 2.28-7.73 6.5-.7zm-7.85.06s-.23 3.98-.47 6.09c-.23 2.11-2.81 4.22-2.81 4.22l-1.05-10.19 4.33-.12zm-17.1-10.25l.18-2.28 12.12-.7-1.05 1.76 2.11.35-6.15 6.15-8.96-.35 6.85-5.27-5.1.34zm2.58 21.49c1.29.12 5.5.12 5.5.12s-5.04-3.51-5.85-3.98c-.82-.47-3.75-2.69-3.75-2.69s2.93-.47 4.22-.35c1.29.12 3.4.12 3.4.12l-4.57-4.45 8.67.12s.23 1.99.23 3.75 1.76 7.26 1.87 8.2c.12.94-.23 3.75-.23 3.75l-14.05-.12-6.91-5.15c-.01-.02 10.18.56 11.47.68zM45.92 26.59c0-1.17.18-3.45-1.41-5.39-1.58-1.93-7.73-12.3-7.73-12.3s5.5-1.23 7.96 0 9.25 3.28 13.23 12.65c2.03 4.79 1.76 11.48-1.41 16.75s-9.51 12.12-18.97 14.17c-8.37 1.82-11.18.94-14.29-.82-3.57-2.02-6.97-4.45-8.9-13.58s-.35-13.23-.35-13.23l10.07 13.7s.82.94 2.34 1.17c1.43.22 7.61-1.41 12.53-5.62s6.93-6.43 6.93-7.5zm-2.1 49.13c-3.55-7.46-9.13-16.34-9.13-16.34s5.85-.61 10.01-2.46c6.32-2.81 9.66-5.8 9.66-5.8s.06 6.69.88 12.3c.5 3.42 2.22 9.55 4.35 16.36-3.02-.77-6-1.47-8.69-1.37-1.55.06-3.52.2-5.69.41-.48-1.13-.95-2.18-1.39-3.1zm-24.24 25.64c-.94-4.22.82-6.97 7.14-12.35 6.32-5.39 19.2-4.92 19.2-4.92s-4.89 2.93-7.26 4.68c-4.72 3.49-3.27 6.64-5.62 13.12-1.87 5.15-4.45 9.13-4.45 9.13s-3.48-1.05-5.24-2.11c-1.65-.99-2.84-3.33-3.77-7.55zm.88 21.89c.47-3.28 3.77-5.08 3.77-5.08l3.19.15-1.02 4.06s-1.15.79-2.9 2.9c-2.44 2.93-3.48 5.37-3.48 5.37s-.03-4.12.44-7.4zm13.64 9.08c-3 3.45-6.82 4.43-8.55 9.6-1.94 5.83-4.68 10.07-4.68 10.07s-.44-2.43.03-8.75 3.19-10.25 4.83-12.82c1.64-2.58 4.16-5.01 5.09-7.58.94-2.58 2.46-3.98 2.46-3.98 2.11-.94 3.75.47 5.39 3.04 1.63 2.58-2.27 7.78-4.57 10.42zm10.59 35.95c-2.53-.61-3.28-1.76-5.27-5.97s-.35-7.03-.35-7.03 4.74.88 12.65-.35c9.73-1.51 20.96-5.85 26-7.73 4.34-1.62 10.71-6.32 10.71-6.32s2.75 4.27 2.63 7.9-.53 4.27-3.34 7.55c-1.41 1.64-7.61 4.16-12.3 5.8-4.68 1.64-13.41 5.27-18.79 6.32-4.48.89-7.55.89-11.94-.17zm20.67-39.22c3.51-6.79 7.73-11.71 7.73-11.71s6.91-.18 9.72.88c2.81 1.05 8.37 1.17 8.96 6.67.59 5.5-2.87 6.33-6.85 9.14-3.25 2.3-9.64 6.16-12.76 7.44-3.86 1.58-10.77 4.1-15.69 5.15-4.92 1.05-15.46 1.41-15.46 1.41l2.81-5.86s4.14-1.07 9.84-3.51c6.55-2.82 10.19-6.69 11.7-9.61zm6.15 56.61c-1.17.7-4.22.47-4.45.12-.23-.35-3.98-5.04-3.86-4.57.12.47.82 4.22 1.87 5.39 1.05 1.17 1.05 3.04-.35 2.69-1.41-.35-5.62-3.63-4.92-1.64s.24 3.93-2.11 2.4-3.45-2.99-5.45-6.85c-1.99-3.86-.18-5.09-.18-5.09s7.12-1.68 9.13-2.28c5.27-1.58 10.48-3.69 15.28-5.45 4.8-1.76 10.36-4.16 14.11-7.67s5.21-6.73 5.21-6.73 2.05 1 3.69 2.63c1.64 1.64 2.17 1.52 2.99 4.57.82 3.04.41 5.09-1.93 7.2-2.34 2.11-13.58 7.98-15.28 8.61-3.71 1.37-7.44 5.5-10.25 4.8-1.74-.43-9.72-3.86-8.08-2.46 1.65 1.4 5.75 3.63 4.58 4.33zm12 11.24c-1.13-5.15-2.57-8.43-2.91-8.81l-.07.03c-.01-.08.02-.09.07-.03l11.34-4.54s5.56 12.88 7.9 18.27c2.34 5.39 3.86 7.9 3.86 7.9s-3.16-.7-10.19 2.28c-4.15 1.76-7.2 5.27-7.2 5.27s-.67-4.13-.53-8.61c.1-2.65-.86-5.33-2.27-11.76zm3.05 30.21c1.32-4.92 3.78-7.73 8.78-10.01 0 0 3.51-1.77 7.73-1.67 3.69.09 8.43 1.35 12.21 6.5 4.49 6.13 5.27 14.9-.61 22.01-5.88 7.11-16.34 6.26-21.17 4.07-4.83-2.2-7.03-8.61-7.55-10.63-.54-2.01-.71-5.35.61-10.27zm114.7-66.74c.54.38 1.82 3.81 1.82 3.81s-3.51 1.41-5.62.23c-2.11-1.17-6.97-.3-6.97-.3l2.05 4.28s-1.64 1.17-5.15.47c-3.51-.7-11.01-.7-15.93-.94-4.92-.23-12.18 1.64-12.18 1.64s-.18-1.23-1.82-4.75c-1.64-3.51-9.6-6.56-9.6-6.56s2.82 6.46 3.22 7.56c.94 2.58 2.34 3.75 2.34 3.75s-5.15 1.17-14.52 7.26-17.1 7.03-24.12 9.37c-7.03 2.34-6.97 2.98-6.97-.53s-3.28-3.04-3.28-3.04-.23 2.81-.47 3.75c-.01.05-.03.1-.06.16-1.84-3.71-3.31-6.69-4.08-8.26 1.89-1.45 5.63-4.03 7.88-5.72 2.81-2.11 5.62-8.67 5.62-8.67s1.17-2.11 2.58-3.04c1.41-.94-.7-5.39-.7-5.39s.23-1.64 1.17-3.28-2.4-4.74-2.4-4.74 2.34-.7 4.45-.7c2.11 0 8.49 4.27 8.49 4.27s-4.68-5.62-4.45-5.62c.23 0 6.56-3.04 11.94-6.56 5.39-3.51 5.85-11.48 5.85-11.48s-5.39 6.56-6.32 6.09c-.94-.47 3.75-10.07 3.75-10.07l-5.62 5.15 4.92-8.2s-8.43 7.96-8.9 7.03c-.47-.94 3.98-7.73 3.98-7.73l-5.39 4.45s-4.45 4.45-5.39 5.85-4.92 3.28-5.62 3.51c-.7.23-6.5.88-6.5.88l4.22-3.04 6.56-3.16s-6.2.9-8.08 1.05c-2.81.23-6.56-.23-6.56-.23l-2.58-5.97 3.75-1.05s2.69-3.86.12-3.86c-2.58 0-4.92-1.05-5.85-1.99-.94-.94-2.58-5.04-2.58-5.04s-.99-.8 1.41-2.11c2.58-1.41 4.92-4.1 6.32-6.56 3.23-5.65 2.46-12.3 2.46-12.3s-2.99 4.97-3.69 6.61c-.7 1.64-7.08 7.15-8.96 9.25-1.87 2.11-8.08 3.34-8.08 3.34s1.41-3.16 2.11-3.86 2.75-4.51 2.75-4.51-7.67 5.1-9.07 6.27-7.2 1.41-7.2 1.41 2.58-1.99 4.22-3.16c1.64-1.17.82-3.11.82-3.11s-1.17.94-2.58 2.11-8.43 3.51-8.43 3.51-.94-.94-1.64-2.34c-.7-1.41-4.92-5.39-4.92-5.39s.94 3.98 1.17 5.39c.23 1.41-2.52 8.02-6.03 14.58s-10.01 11.36-13.53 13.7c-3.51 2.34-6.67 3.34-6.67 3.34s2.87-3.69 4.74-6.5 2.63-7.49 2.63-9.84-2.58-7.03-4.92-8.43c-2.34-1.41-5.09-.23-5.09-.23s1.02-1.54 2.11-3.98c.94-2.11 1.87-4.33 2.81-6.67s3.51-5.74 4.68-7.38c1.17-1.64 6.69-4.71 10.19-5.5 6.21-1.41 14.33 3.09 20.14 1.29 9.84-3.04 20.88-4.45 31.03-2.46 10.77 2.11 12.76 8.78 26.35 12.3 11.28 2.92 23.77 2.93 28.69 1.99 4.92-.94 16.63-3.63 16.63-3.63l.23 1.52s6.09-1.29 8.2-1.05c2.11.23 3.98.7 3.98.7s-2.79 1.49-4.92 2.58c-3.76 1.92-7.8 4.76-7.67 4.62 0 0 3.46 1.47 6.97 1.7 3.51.23 7.26 1.87 7.26 1.87l-3.04 1.41-4.45.7 6.79 3.98s-6.79 0-8.9-.23c-2.11-.23-5.85 1.17-5.85 1.17l11.48 8.67-11.48 3.04s9.37 0 11.24 1.41 10.77 1.87 10.77 1.87l-3.28 3.51.47 2.81s-3.51.47-7.73-.23c-4.09-.68-8.67 1.17-8.67 1.17s5.15 1.87 7.73 3.04 6.09 5.39 6.09 5.39l-10.77-.23 11.48 6.09 8.9 5.62c0-.01-6.79-2.12-2.28 1.1zm8.19-3.17l-6.79-4.57 6.09 1.52s-3.04-4.8-5.5-6.67-6.91-5.39-6.91-5.39 7.38 1.99 11.01 1.99c1.64 0 5.27.12 5.27.12l-2.22-2.22s6.21-.82 7.73.47c1.52 1.29 5.27 7.26 5.39 9.6.12 2.34.47 5.39-1.05 5.74-1.54.35-13.02-.59-13.02-.59zm14.87 16.63l-4.57.7-.18-2.63 4.75 1.93zm3.69-9.31l6.85 3.16s-4.92.18-7.55.35-8.61 2.11-8.61 2.11l-.35-5.97 9.66.35zm4.57-12.82c-2.28 1.23-8.08 2.28-8.08 2.28l-.18-3.86s2.28-.53 3.16-.7c.88-.18 6.5-1.58 6.5-1.58l2.99.7s-2.11 1.93-4.39 3.16z" />
      <path
        d="M203.54 159.27l-8.9-5.62-11.48-6.09 10.77.23s-3.51-4.22-6.09-5.39-7.73-3.04-7.73-3.04 4.57-1.85 8.67-1.17c4.22.7 7.73.23 7.73.23l-.47-2.81 3.28-3.51s-8.9-.47-10.77-1.87-11.24-1.41-11.24-1.41l11.48-3.04-11.48-8.67s3.75-1.41 5.85-1.17c2.11.23 8.9.23 8.9.23l-6.79-3.98 4.45-.7 3.04-1.41s-3.75-1.64-7.26-1.87c-3.51-.23-6.97-1.7-6.97-1.7-.13.13 3.91-2.7 7.67-4.62 2.13-1.09 4.92-2.58 4.92-2.58s-1.87-.47-3.98-.7c-2.11-.23-8.2 1.05-8.2 1.05l-.23-1.52s-11.71 2.69-16.63 3.63c-4.92.94-17.41.93-28.69-1.99-13.58-3.51-15.57-10.19-26.35-12.3-10.15-1.99-21.2-.59-31.03 2.46-5.81 1.8-13.93-2.69-20.14-1.29-3.49.79-9.02 3.86-10.19 5.5-1.17 1.64-3.75 5.04-4.68 7.38-.94 2.34-1.87 4.57-2.81 6.67-1.08 2.44-2.11 3.98-2.11 3.98s2.75-1.17 5.09.23c2.34 1.41 4.92 6.09 4.92 8.43s-.76 7.03-2.63 9.84c-1.87 2.81-4.74 6.5-4.74 6.5s3.16-1 6.67-3.34 10.01-7.14 13.53-13.7 6.26-13.18 6.03-14.58c-.23-1.41-1.17-5.39-1.17-5.39s4.22 3.98 4.92 5.39c.7 1.41 1.64 2.34 1.64 2.34s7.03-2.34 8.43-3.51 2.58-2.11 2.58-2.11.82 1.94-.82 3.11-4.22 3.16-4.22 3.16 5.8-.23 7.2-1.41 9.07-6.27 9.07-6.27-2.05 3.81-2.75 4.51-2.11 3.86-2.11 3.86 6.21-1.23 8.08-3.34 8.25-7.61 8.96-9.25c.7-1.64 3.69-6.61 3.69-6.61s.77 6.64-2.46 12.3c-1.41 2.46-3.75 5.15-6.32 6.56-2.4 1.31-1.41 2.11-1.41 2.11s1.64 4.1 2.58 5.04c.94.94 3.28 1.99 5.85 1.99 2.58 0-.12 3.86-.12 3.86l-3.75 1.05 2.58 5.97s3.75.47 6.56.23c1.88-.16 8.08-1.05 8.08-1.05l-6.56 3.16-4.22 3.04s5.8-.65 6.5-.88c.7-.23 4.68-2.11 5.62-3.51s5.39-5.85 5.39-5.85l5.39-4.45s-4.45 6.79-3.98 7.73c.47.94 8.9-7.03 8.9-7.03l-4.92 8.2 5.62-5.15s-4.68 9.6-3.75 10.07c.94.47 6.32-6.09 6.32-6.09s-.47 7.96-5.85 11.48c-5.39 3.51-11.71 6.56-11.94 6.56-.23 0 4.45 5.62 4.45 5.62s-6.38-4.27-8.49-4.27c-2.11 0-4.45.7-4.45.7s3.34 3.1 2.4 4.74c-.94 1.64-1.17 3.28-1.17 3.28s2.11 4.45.7 5.39c-1.41.94-2.58 3.04-2.58 3.04s-2.81 6.56-5.62 8.67c-2.25 1.69-5.99 4.27-7.88 5.72.77 1.56 2.24 4.54 4.08 8.26.02-.05.04-.11.06-.16.23-.94.47-3.75.47-3.75s3.28-.47 3.28 3.04-.06 2.87 6.97.53c7.03-2.34 14.75-3.28 24.12-9.37 9.37-6.09 14.52-7.26 14.52-7.26s-1.41-1.17-2.34-3.75c-.4-1.1-3.22-7.56-3.22-7.56s7.96 3.04 9.6 6.56c1.64 3.51 1.82 4.75 1.82 4.75s7.26-1.87 12.18-1.64c4.92.23 12.41.23 15.93.94 3.51.7 5.15-.47 5.15-.47l-2.05-4.28s4.86-.87 6.97.3c2.11 1.17 5.62-.23 5.62-.23s-1.28-3.42-1.82-3.81c-4.51-3.21 2.28-1.1 2.28-1.1zM23.35 108.91c1.76 1.05 5.24 2.11 5.24 2.11s2.58-3.98 4.45-9.13c2.35-6.47.9-9.62 5.62-13.12 2.37-1.76 7.26-4.68 7.26-4.68s-12.88-.47-19.2 4.92c-6.32 5.39-8.08 8.14-7.14 12.35.93 4.22 2.12 6.56 3.77 7.55z"
        style={styles.st1}
      />
      <path
        d="M38.66 121.91c-1.64-2.58-3.28-3.98-5.39-3.04 0 0-1.52 1.41-2.46 3.98-.94 2.58-3.45 5.01-5.09 7.58-1.64 2.58-4.36 6.5-4.83 12.82-.47 6.32-.03 8.75-.03 8.75s2.74-4.24 4.68-10.07c1.72-5.17 5.55-6.16 8.55-9.6 2.31-2.64 6.21-7.84 4.57-10.42zM26.41 122.38l1.02-4.06-3.19-.15s-3.3 1.8-3.77 5.08c-.47 3.28-.44 7.4-.44 7.4s1.04-2.44 3.48-5.37c1.75-2.11 2.9-2.9 2.9-2.9zM66.94 181.34c-1.64-1.41 6.34 2.02 8.08 2.46 2.81.7 6.53-3.43 10.25-4.8 1.71-.63 12.94-6.5 15.28-8.61 2.34-2.11 2.75-4.16 1.93-7.2-.82-3.04-1.35-2.93-2.99-4.57-1.64-1.64-3.69-2.63-3.69-2.63s-1.46 3.22-5.21 6.73c-3.75 3.51-9.31 5.92-14.11 7.67-4.8 1.76-10.01 3.86-15.28 5.45-2.01.6-9.13 2.28-9.13 2.28s-1.82 1.23.18 5.09c1.99 3.86 3.1 5.33 5.45 6.85s2.81-.41 2.11-2.4 3.51 1.29 4.92 1.64c1.41.35 1.41-1.52.35-2.69-1.05-1.17-1.76-4.92-1.87-5.39-.12-.47 3.63 4.22 3.86 4.57.23.35 3.28.59 4.45-.12 1.16-.7-2.94-2.93-4.58-4.33zM75.43 162.14c4.68-1.64 10.89-4.16 12.3-5.8 2.81-3.28 3.22-3.92 3.34-7.55s-2.63-7.9-2.63-7.9-6.37 4.71-10.71 6.32c-5.04 1.87-16.27 6.21-26 7.73-7.9 1.23-12.65.35-12.65.35s-1.64 2.81.35 7.03 2.74 5.37 5.27 5.97c4.39 1.05 7.46 1.05 11.94.18 5.38-1.06 14.11-4.69 18.79-6.33zM53.65 138.66c-5.7 2.44-9.84 3.51-9.84 3.51L41 148.03s10.54-.35 15.46-1.41c4.92-1.05 11.83-3.57 15.69-5.15 3.13-1.28 9.51-5.14 12.76-7.44 3.98-2.81 7.44-3.63 6.85-9.14-.59-5.5-6.15-5.62-8.96-6.67-2.81-1.05-9.72-.88-9.72-.88s-4.22 4.92-7.73 11.71c-1.5 2.93-5.14 6.8-11.7 9.61z"
        style={styles.st1}
      />
      <path
        d="M222.45 157.8c1.52-.35 1.17-3.4 1.05-5.74-.12-2.34-3.86-8.31-5.39-9.6-1.52-1.29-7.73-.47-7.73-.47l2.22 2.22s-3.63-.12-5.27-.12c-3.63 0-11.01-1.99-11.01-1.99s4.45 3.51 6.91 5.39c2.46 1.87 5.5 6.67 5.5 6.67l-6.09-1.52 6.79 4.57c.02 0 11.5.94 13.02.59zM198.09 125.13l14.05.12s.35-2.81.23-3.75c-.12-.94-1.87-6.44-1.87-8.2 0-1.76-.23-3.75-.23-3.75l-8.67-.12 4.57 4.45s-2.11 0-3.4-.12-4.22.35-4.22.35 2.93 2.22 3.75 2.69c.82.47 5.85 3.98 5.85 3.98s-4.22 0-5.5-.12c-1.29-.12-11.48-.7-11.48-.7l6.92 5.17zM213.9 119.74s2.58-2.11 2.81-4.22c.23-2.11.47-6.09.47-6.09l-4.33.12 1.05 10.19z"
        style={styles.st2}
      />
      <path
        d="M207.29 104.46l6.14-6.15-2.1-.35 1.05-1.75-12.12.7-.18 2.28 5.1-.35-6.85 5.27zM225.03 109.38l-6.5.7-2.29 7.73zM212.03 132.74c-.88 1.23-7.2 3.16-7.2 3.16s6.15 1.58 7.55 1.58 7.38 1.93 7.38 1.93l4.04-5.09s-2.99.53-3.86.53-2.99-1.58-2.99-1.58 3.16-1.41 4.92-2.28 4.74-4.57 4.74-4.57l-10.19 1.05s-3.51 4.04-4.39 5.27zM221.51 144.16l2.28 3.34 6.32-6.32s-2.81.18-3.86.88c-1.05.69-4.74 2.1-4.74 2.1zM227.49 149.43c-.88.18-3.16.7-3.16.7l.18 3.86s5.8-1.05 8.08-2.28 4.39-3.16 4.39-3.16l-2.99-.7c-.01 0-5.63 1.4-6.5 1.58zM218.7 170.15s5.97-1.93 8.61-2.11 7.55-.35 7.55-.35l-6.85-3.16-9.66-.35.35 5.97zM219.76 174.54l4.56-.7-4.74-1.93z"
        style={styles.st3}
      />
      <path d="M95.46 246.27c4.11 1.98 13.22 2.16 17.92-3.51 4.69-5.67 3.36-14.81 0-19.85-3.36-5.04-9.1-5.56-11.77-5.45-3.36.14-6.32 1.58-6.32 1.58-4.13 2.11-6.15 5.21-7.2 9.13-1.05 3.92-.46 7.89 0 9.49.78 2.73 2.45 6.24 7.37 8.61zm7.07-23.47c2.83 0 5.15 1.59 6.25 3.34 1.64 2.6 1.98 5.39 1.13 9.32-.71 3.28-5.07 4.55-8.59 5.03-1.92.26-3.6-.95-4.42-1.69-1.88-1.7-3.1-4.24-3.02-6.33.14-4.05 3.46-8.64 6.82-9.44.62-.16 1.24-.23 1.83-.23z" />
      <path
        d="M85.8 208.68c-.14 4.47.53 8.61.53 8.61s3.06-3.51 7.2-5.27c7.03-2.99 10.19-2.28 10.19-2.28s-1.52-2.52-3.86-7.9c-2.34-5.39-7.9-18.27-7.9-18.27L80.6 188.1c.34.38 1.78 3.66 2.91 8.81 1.41 6.43 2.37 9.11 2.29 11.77zM80.53 188.13l.07-.03c-.05-.06-.08-.05-.07.03zM93.49 248.03c4.83 2.2 15.28 3.04 21.17-4.07 5.88-7.11 5.11-15.89.61-22.01-3.78-5.15-8.52-6.41-12.21-6.5-4.22-.1-7.73 1.67-7.73 1.67-5.01 2.28-7.47 5.09-8.78 10.01-1.32 4.92-1.14 8.26-.61 10.28.53 2.01 2.72 8.42 7.55 10.62zm-5.41-19.85c1.05-3.92 3.07-7.03 7.2-9.13 0 0 2.96-1.44 6.32-1.58 2.67-.11 8.41.4 11.77 5.45 3.36 5.04 4.69 14.18 0 19.85-4.69 5.67-13.8 5.5-17.92 3.51-4.92-2.37-6.59-5.88-7.38-8.61-.45-1.6-1.04-5.57.01-9.49z"
        style={styles.st0}
      />
    </svg>
  );
}
