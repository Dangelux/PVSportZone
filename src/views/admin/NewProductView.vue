<script setup>
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import Link from '@/components/Link.vue';
    import useImage from '../../composables/useImage'
    import { useProductsStore } from '../../stores/products'

    // Composable
    const { url, onFileChange, isImageUploaded } = useImage()

    // Store
    const products = useProductsStore()

    //
    const router = useRouter()

    // Estado
    const formData = reactive({
        name: '',
        category: '',
        price: '',
        availability: '',
        image: ''
    })

    // Funciones
    const submitHandler = async data => { // Pasa en automático lo que haya ingresado en el formulario
        const { image, ...values } = data

        try {
            await products.createProduct({
            ...values, 
            image: url.value
        })
            router.push({name:'products'})
        }catch(error){

        }

    }

</script>

<template>
    
    <div>

        <Link
            to="products"
        >
            Volver
        </Link>

        <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>

        <div class="flex justify-center bg-white shadow">
            <div class="mt-10 p-10 w-full 2xl:w-2/4">


                <FormKit
                    type="form"
                    submit-label="Agregar Producto"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="submitHandler"
                    :value="formData"
                >

                    <FormKit 
                        type="text"
                        label="Nombre"
                        name="name"
                        placeholder="Nombre de Producto"
                        validation="required"
                        :validation-messages="{required: 'El nombre del producto es obligatorio'}"
                        v-model.trim="formData.name"
                    />

                    <FormKit 
                        type="file"
                        label="Imagen Producto"
                        name="image"
                        validation="required"
                        :validation-messages="{required: 'La imagen del producto es obligatoria'}"
                        accept=".jpg"
                        @change="onFileChange"
                        v-model.trim="formData.image"
                    />

                    <div v-if="isImageUploaded">
                        <p class="font-black">Imagen Producto:</p>
                        <img 
                            :src="url"
                            alt="Nueva imagen producto"
                            class="w-32"
                        >
                    </div>

                    <FormKit 
                        type="select"
                        label="Categoría"
                        name="category"
                        validation="required"
                        :validation-messages="{required: 'La categoría es obligatoria'}"
                        :options="products.categoryOptions"
                        v-model.number="formData.category"
                    />

                    <FormKit 
                        type="number"
                        label="Precio"
                        name="price"
                        placeholder="Precio del Producto"
                        validation="required"
                        :validation-messages="{required: 'El Precio es obligatorio'}"
                        min="1"
                        v-model.number="formData.price"
                    />

                    <FormKit 
                        type="number"
                        label="Disponibles"
                        name="availability"
                        placeholder="Cantidad disponible"
                        validation="required"
                        :validation-messages="{required: 'La cantidad es obligatoria'}"
                        min="1"
                        v-model.number="formData.availability"
                    />

                </FormKit>


            </div>
        </div>

    </div>

</template>
