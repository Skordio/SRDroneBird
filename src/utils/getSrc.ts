export const getPngSrc = ( name:string ) => {
   
    const path = `/src/assets/photos/${name}`
    
    const modules = import.meta.glob('/src/assets/photos/*.png', { eager: true }) 
  
    return (modules[path] as any).default
}

export const getLogoSrc = ( name:string ) => {
   
    const path = `/src/assets/logos/${name}`
    
    const modules = import.meta.glob('/src/assets/logos/*.png', { eager: true }) 
  
    return (modules[path] as any).default
}

export const getMP4Src = ( name:string ) => {
    const path = `/src/assets/videos/${name}/vid.mp4`
    
    const modules = import.meta.glob(`/src/assets/videos/**/*.mp4`, { eager: true }) 
  
    return (modules[path] as any).default
}

export const getThumbnailPngSrc = ( name:string ) => {
   
    const path = `/src/assets/videos/${name}/th.png`
    
    const modules = import.meta.glob(`/src/assets/videos/**/*.png`, { eager: true }) 
  
    return (modules[path] as any).default
}