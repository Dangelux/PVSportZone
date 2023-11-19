import { ref, computed } from 'vue'
import { uid } from 'uid'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'


export default function useImage(){

    const url = ref('')
    const storage = useFirebaseStorage()

    const onFileChange = e => {
        const file = e.target.files[0] // Obtener archivo
        const filename = uid() + '.jpg' // Generar nombre único
        // Generar la referencia que toma el identificador del storage, después se le pasa el nombre de la carpeta y el nombre del archivo
        const sRef = storageRef(storage, '/products/' + filename) 

        // Sube el archivo
        const uploadTask = uploadBytesResumable(sRef, file) // referencia del almacenamiento y archivo que se desea subir
        uploadTask.on('state_changed',
            // La imagen se está subiendo...
            () => {},
            // Si sucede un error
            (error) => console.log(error),
            () => {
                // La imagen ya se subió
                getDownloadURL(uploadTask.snapshot.ref)
                    .then( (downloadURL) =>{
                        url.value = downloadURL
                    } )
            }
        )
    }

    const isImageUploaded = computed( () =>{
        return url.value ? url.value : null
    } )

    return {
        url,
        onFileChange,
        isImageUploaded
    }
}