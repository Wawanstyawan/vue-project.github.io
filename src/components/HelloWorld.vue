<template>
  <div>
    <input type="file" @change="uploadImage" />
    <img :src="imageUrl" alt="Uploaded Image" v-if="imageUrl" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
    };
  },
  methods: {
    async uploadImage(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await this.$axios.post(
          'https://api.imgbb.com/1/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            params: {
              key: '5047c8ac1da95712d2cf5983581a7d00', // Gantilah dengan API key Anda
            },
          }
        );

        // Set imageUrl to the uploaded image URL
        this.imageUrl = response.data.data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    },
  },
};
</script>
