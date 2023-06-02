export const WIDTH = 256
export const HEIGHT = 240
let animationframeID
let framebuffer_u8 =null, framebuffer_u32 = null
let canvas_ctx = null
let test=0

/**
 * 获取每帧数据，由于返回数据为24位(R,G,B,分别各自8位)，
 * 因此需要将其转换为32位(R,G,B,A,分别各自8位)。将A通道
 * 置为为ff
 */
export const onFrame = (framebuffer_24) => {
  let i = 0
  for (let y = 0; y < HEIGHT; ++y) {
    for (let x = 0; x < WIDTH; ++x) {
      i = (y * 256) + x
      framebuffer_u32[i] = 0xff000000 | framebuffer_24[i] // Full alpha
    }
  }
}

/**
 * 定义帧动画回调
 */
export const animationFram = (cvs) => {
  canvas_ctx = cvs.getContext('2d') 

  canvas_ctx.fillStyle = 'red'
  canvas_ctx.fillRect(0, 0, WIDTH, HEIGHT)
  const image = canvas_ctx.getImageData(0, 0, WIDTH, HEIGHT)
  const buffer = new ArrayBuffer(image.data.length)
  // 初始化8位无符号数组引用至buffer
  framebuffer_u8 = new Uint8ClampedArray(buffer)
  // 初始化32位无符号数组引用至buffer，因此改动32位变量即可改动8位变量
  framebuffer_u32 = new Uint32Array(buffer)

  // 定义帧动画
  animationframeID = requestAnimationFrame(onAnimationFrame)

  function onAnimationFrame() {
    requestAnimationFrame(onAnimationFrame)
     image.data.set(framebuffer_u8)
    // 将图像显示到canvas中
    canvas_ctx.putImageData(image, 0, 0,0,0,WIDTH,HEIGHT)
  }
}

/**
 * canvas适配父容器函数
 */
export const fitInParent = (cvs) => {
  const parent = cvs.parentNode
  const parentWidth = parent.clientWidth
  const parentHeight = parent.clientHeight
  const parentRatio = parentWidth / parentHeight
  const desiredRatio = WIDTH / HEIGHT
  if (desiredRatio < parentRatio) {
    cvs.style.height = `${parentHeight}px`
    cvs.style.width = `${Math.round(parentHeight + desiredRatio)}px`
  }
  else {
    cvs.style.width = `${parentWidth}px`
    cvs.style.height = `${Math.round(parentWidth / desiredRatio)}px`
  }
}

/**
 * 停止动画
 */
export const animationStop = () => {
  cancelAnimationFrame(animationframeID)
}

export const cut = (cvs) => {
  const image = new Image()
  image.src = cvs.toDataURL('image/png')
  return image
}

export const add=()=>{
  return {
    framebuffer_u8:framebuffer_u8,
    canvas_ctx:canvas_ctx
  };
}
export const getTest=()=>{
  return test;
}