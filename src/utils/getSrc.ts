export type Quality = '480p' | '720p' | '1080p' | '1520p' | '1080p60fps'

export const getPngSrc = ( name:string ) => {
   
    const path = `/assets/photos/${name}`
    return path
    
    // const modules = import.meta.glob('/src/assets/photos/*.png', { eager: true }) 
  
    // return (modules[path] as any).default
}

export const getLogoSrc = ( name:string ) => {
   
    const path = `/assets/logos/${name}`
    return path
    
    // const modules = import.meta.glob('/src/assets/logos/*.png', { eager: true }) 
  
    // return (modules[path] as any).default
}

export const getMP4Src = ( name:string, quality: Quality ) => {
    const path = `/assets/videos/${name}/${quality}.mp4`
    return path
    
    // const modules = import.meta.glob(`/src/assets/videos/**/*.mp4`, { eager: true }) 
  
    // return (modules[path] as any)?.default
}

export const getThumbnailPngSrc = ( name:string ) => {
   
    const path = `/assets/videos/${name}/th.png`
    
    // const modules = import.meta.glob(`/src/assets/videos/**/*.png`, { eager: true }) 
  
    // return (modules[path] as any).default
    return path
}