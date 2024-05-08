import { useState } from 'react'
import 'src/assets/styles/App.css'

const WorkspacePage = () => {
  const [count, setCount] = useState(0);
  const [droppedImageSrc, setDroppedImageSrc] = useState(null);

  const handleImageDrop = (src) => {
    setDroppedImageSrc(src);
  };

  return (
    <div>
    </div>
  )
}

export default WorkspacePage
